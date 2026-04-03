---
title: No, SwiftUI is not “Accessible by default”
date: 2026-04-03T12:41:50Z
summary: \"SwiftUI is accessible by default\" is one of the most repeated misconceptions in iOS development. Here's why that's wrong and what you actually need to watch out for.

tags:
- iOS
- SwiftUI
- Blog
---
When speaking to fellow iOS engineers, I often hear variations of the phrase “SwiftUI is accessible by default”. I’ve seen this written in accessibility reports, I’ve seen people who should know better make the claim in conference talks and blogs, and I’ve heard candidates firmly state this in job interviews. I’ve even had a job interview of my own derailed because the interviewer asked me “Why do you need to be an expert in accessibility now that we have SwiftUI? It’s just accessible!” I’m still unsure if that was a personal broadside or unbelievable ignorance.

The truth is, no UI paradigm is any more or less accessible than any other if you’re not holding it correctly. It’s just as easy to make inaccessible experiences in SwiftUI as in UIKit, or any other technology if you’re not following good coding practices.

It’s hard not to feel a little responsible for this meme. After all, I have said things like “[SwiftUI makes accessibility much better](https://www.youtube.com/watch?v=Cdl4Skg6xtA)” and can “[create more accessible experiences](https://mobilea11y.com/blog/swiftui-talk/)”. So I wanted to try and correct the record.

I stand by the claim that SwiftUI has some great accessible design decisions resolving some common UIKit issues, but things are more nuanced than saying that everything is now fixed. SwiftUI makes images accessible to VoiceOver by default, dropping the requirement to set this explicitly. This means that in poorly configured apps information that would have been lost in UIKit is now available, but the trade-off is adding extra noise - testing and judgement from the people who design and build the interface are still required to make a good experience. Because SwiftUI is stateful, the visual screen and the accessibility tree stay in sync automatically, removing a whole class of bugs that UIKit developers had to manage manually through accessibility notifications. And like HTML, SwiftUI has semantic elements for common controls like `Button` and `Slider`. These, combined with the hierarchical structure of SwiftUI code, encourage well-organised code, which will often result in an accessible interface that is well structured.

All of this gives you a good baseline. But to claim this makes it accessible is to forget some crucial elements: Accessibility is about human intention and reasoning, and code can’t help you with that. Plus, anywhere you add customisations to behaviour or appearance is somewhere you could lose that accessible baseline. Even in these improved areas, it’s easy to code an experience that is not accessible.

## Images

While images are now available to VoiceOver by default, that doesn’t mean they are accessible. To do that, you must give them an [accessible label](https://mobilea11y.com/guides/swiftui/swiftui-images/) with `.accessibilityLabel()`, or if the image doesn’t add any meaning to your UI, hide it with `.accessibilityHidden(true)`. For example, if using an SF Symbol, you get an accessible label by default, but often this doesn’t reflect your intended meaning, or might just add noise.

![VoiceOver focusing on an SF Symbol annoucing the default label of "lamp.desk.fill".](/images/sfsymbol-label.PNG)

## State

While SwiftUI’s stateful nature means changes in layout are automatically reflected, changes in status are not necessarily automatic. If you have a control in your app that changes state or value, you need to check that this is added to the `.accessibilityValue()` and announced correctly by VoiceOver. Possibly the most common instance of this I see is for custom selectable elements. The following code creates a button that visually changes between a selected and unselected state on activation.

```Swift
Button(action: {
    selected.toggle()
}) {
    HStack {
        Image(systemName: selected ? "circle.fill" : "circle")

        Text("Warp Speed")
    }
}
.buttonStyle(.plain)
```

SwiftUI knows the state has changed when we call `selected.toggle()` and so will redraw the button with the new state. Any changes to accessibility are reported by SwiftUI at the same time, but we aren’t adding any state information to this control for SwiftUI to report. We can fix that by conditionally adding the `.isSelected` accessibility trait to the button.

```Swift
Button(action: {
    selected.toggle()
}) {
    // …
}
.accessibilityAddTraits(selected ? .isSelected : [])
.buttonStyle(.plain)
```

Now a VoiceOver user can determine the current state when focusing on the element.

![A custom button with VoiceOver announcing a selected state.](/images/toggle-selected.PNG)

## Semantic Elements

To create the toggle button above we used a SwiftUI `Button` element, this is a very common pattern because SwiftUI buttons are so flexible. But we had to add the `.isSelected` trait to make this work. A closer semantic for this control would be a Toggle. By creating a custom `ToggleStyle` we can not only make our toggle style reusable, but inherit the correct `.isSelected` semantics for free, in addition to inheriting the `.isToggle` trait that we didn’t add above.

```Swift
struct MyCustomToggleStyle: ToggleStyle {
    func makeBody(configuration: Configuration) -> some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            HStack {
                Image(systemName: configuration.isOn ? "circle.fill" : "circle")
                configuration.label
            }
            .padding()
        }
        .buttonStyle(.plain)
    }
}
```

This custom toggle style then allows us to use a semantic toggle in our code.

```Swift
Toggle("Warp speed", isOn: $selected)
    .toggleStyle(MyCustomToggleStyle())
```

![A custom button with VoiceOver announcing it as an unselected switch.](/images/toggle-not-selected.PNG)

## Structure

A really common pattern in mobile apps is to display data with the corresponding label stacked vertically above it. For example, the following code shows two temperature readouts:

```Swift
HStack {
    VStack {
        Text("Core temperature")
        Text("1,000,000ºC")
    }

    VStack {
        Text("Outside Temperature")
        Text("-178ºC")
    }
}
```

Looking at this code, it’s easy to understand that the label ‘Outside Temperature’ corresponds to the value ‘-178ºC’. But when rendered on screen, VoiceOver will navigate elements in the visual reading order. This means it will navigate from ‘Core temperature’ to ‘Outside Temperature’, only reading out the values after both labels have been announced. This means your values lose the context of the label and essentially become meaningless.

In the above instance, I would recommend adding the `.accessibilityElement(children: )` modifier to each of the `VStack`s. This tells assistive technologies to treat this stack as an element that is relevant for accessibility. You can pass one of two arguments to the modifier depending on which behaviour works best for your UI. Passing `.contain` will cause all elements in the stack to continue to exist separately, but all will be navigated in full before moving on to the next element.

In the above example, a better option would likely be `.combine`. Combine removes all the elements inside the stack from accessibility, and makes the stack into an accessibility element in its own right, merging accessibility values from the children into the parent stack. This reduces the amount of navigation effort needed, and ensures the label and value are announced together as a single element, maximising the semantic meaning of both.

---

There are nearly as many ways to build inaccessible experiences in SwiftUI as there are ways to write SwiftUI. The above are just illustrative of areas where, although SwiftUI is a great improvement over UIKit, you still need to exercise caution when building SwiftUI interfaces to ensure they are accessible. Make sure you test your UI on a device with VoiceOver enabled to check your assistive technology users will be able to experience your app as you intend.