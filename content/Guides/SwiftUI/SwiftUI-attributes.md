---
title: "SwiftUI Accessibility: Attributes"
description: "Accessibility traits are incredibly powerful. They’re a group of attributes that tell assistive technology how to treat your UI. Get them wrong and you’ll make your interface frustrating"
date: 2019-10-18T07:30:56Z
tags:
- iOS
- SwiftUI
- Mobile
- Guide
---

When a customer enables an assistive technology to navigate your app the interface that technology navigates isn't exactly the same as the one visible on the screen. They're navigating a modified version that iOS creates especially for assistive technology. This is known as the [accessibility tree or accessible user interface](https://rwapp.co.uk/2019/10/09/SwiftUI-AUI/).

iOS does an incredible job at creating the AUI for you from your SwiftUI code. We can help iOS in creating this by tweaking some element's accessibility attributes. Setting some accessibility attributes through modifiers is a simple way to add a little more meaning and context for your assistive technology users.

### Label

An element's Accessibility Label is the first string read by VoiceOver when landing on an accessible element. It's also the string used to activate a control in Voice Control. You should think of this as the name of the element. Set an accessibility label on your SwiftUI element using the modifier `.accessibility(label: Text("Send"))`.

In general, the accessibility label is the same as your control's label or text value. So that's what iOS uses by default. This means for most of your elements, you won't ever need to set an accessibility label. There are a few times when you do need to set one: For example, if you haven't given your control a text representation. Although the better option here might be to set the [text value](https://rwapp.co.uk/2019/09/26/SwiftUI-Controls/). If your text value is longer than a couple of words you might want to use a shorter version, this helps with Voice Control. Or if the label might be ambiguous without a little more context.

```
Button(action: {}, label: { Text("➡️✉️") })
            .accessibility(label: Text("Send"))
```

A label should allow a VoiceOver user to quickly identify what that element is or does. Not what the content of that element is. Ideally, labels should convey meaning in one word, such as "_Play_" or "_Like_" for example. [Apple advises](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/iPhoneAccessibility/Making_Application_Accessible/Making_Application_Accessible.html#//apple_ref/doc/uid/TP40008785-CH102-SW6) you should capitalise your accessibility label and don't end it with a full stop. Don't include the type of element as this is redundant and will add noise.

### Value

This should be the text representation of the value or content of a control. The current numerical value of a slider, or the current status of a switch for example. Typically your accessibility value is defined for you by your control. For example, a slider will always set the accessibility value to its current numerical value.

There are times when you will need to set this value yourself. If you group subviews together into a semantic view, you will need to choose which of your subviews' values you need to report. You can set a value using the modifier `.accessibility(value: Text("10 out of 10"))`.

At times it may be suitable to set the accessibility value to something different from the value displayed in your visual user interface. Imagine your UI features a slider to adjust, say, the rating of a good dog out of 10. The accessibility value generated for you by the slider will be "_100 percent_". It will give your user more meaning if you adjust your sliders accessibility value to read "_10 out of 10_".

```
Slider(value: $sliderValue, in: minimumValue…maximumvalue)
    .accessibility(value: Text("\(Int(sliderValue)) out of 10"))
```

Don't get in your customer's way by adding redundant information. Remember, VoiceOver is not the only medium that uses this label, braille keyboards, for example, will display this value. If you feel you need to add further context for a customer to understand a control, the accessibility label or accessibility hint may be the more suitable attribute to set.

Buttons don't have an accessibility value by default. But if your text is long, you may be better to set a short accessibility label and the rest of the text as a value. this will help Voice Control users. Imagine a Twitter client that allows users to select a tweet for more options. We would set the text of the tweet as the value, and set the accessibility label to "_tweet from [@RobRWAPP](https://twitter.com/RobRWAPP)._"

### Hint

VoiceOver reads an element's accessibility hint last after a short pause. Use the hint to give extra information on what the result of performing this element's action will be. But only if this consequence is not immediately obvious from the element's accessibility label. Many VoiceOver users disable or skip over hints and only use them if they find an element confusing at first. Because of this, you should use a hint to provide extra context, and not be a required part of your interface.

The hint attribute is optional, and not set for you by iOS. Set an accessibility hint on an element using the modifier `.accessibility(hint: Text("Sends your message."))`.

In their guidance on writing good accessibility hints, Apple suggests imagining describing the controls action to a friend. You might tell your friend "tapping the send button sends your message". But assuming you set up your accessibility traits and label correctly, repeating the information that this element is a button and that it's called "_send_" is redundant. So, your hint would be "_Sends your message._" Avoid "_Send your message._" as this sounds like an instruction, rather than guidance. Hints should begin with a capital letter and end with a full stop.

```
Button(action: {}, label: { Text("➡️✉️") })
    .accessibility(hint: Text("Sends your message."))
```

### Identifier

The connection to accessibility here is a little tenuous. The identifier is not presented to your customer in any way. It is a string you can use to identify your view to UI tests or internally in your app's code. Set it with the modifier `.accessibility(identifier: "My unique identifier")`. Where the other attributes take a SwiftUI `Text()` value, this is not user facing, so takes a Swift `String`.

```
Button(action: {}, label: { Text("➡️✉️") })
    .accessibility(identifier: "sendMessageButton")
```


***

Thanks for reading. This story is part of a series on SwiftUI Accessibility. Check out my other guides in this series:

[SwiftUI Accessibility](https://mobilea11y.com/guides/swiftui/swiftui-accessibility/)<br/>
[SwiftUI Accessibility: Named Controls](https://mobilea11y.com/guides/swiftui/swiftui-controls/)<br/>
[SwiftUI Accessibility: Images](https://mobilea11y.com/guides/swiftui/swiftui-images/)<br/>
[SwiftUI Accessibility: Dynamic Type](https://mobilea11y.com/guides/swiftui/swiftui-dynamic-type/)<br/>
[SwiftUI Accessibility: Accessible User Interface](https://mobilea11y.com/guides/swiftui/swiftui-aui/)<br/>
[SwiftUI Accessibility: Sort Priority](https://mobilea11y.com/guides/swiftui/swiftui-sort-priority/)<br/>
[SwiftUI Accessibility: Attributes](https://mobilea11y.com/guides/swiftui/swiftui-attributes/)<br/>
[SwiftUI Accessibility: Traits](https://mobilea11y.com/guides/swiftui/swiftui-traits/)<br/>
[SwiftUI Accessibility: User Settings](https://mobilea11y.com/guides/swiftui/swiftui-settings/)<br/>
[SwiftUI Accessibility: Semantic Views](https://mobilea11y.com/guides/swiftui/swiftui-semantic-views/)