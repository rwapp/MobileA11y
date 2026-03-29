---
title: "SwiftUI Accessibility: Traits"
description: "Accessibility traits are incredibly powerful. They’re a group of attributes that tell assistive technology how to treat your UI. Get them wrong and you’ll make your interface frustrating"
date: 2019-10-18T07:30:56Z
lastmod: 2019-10-18T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
- Guide
---

Accessibility traits are a group of attributes on a SwiftUI element. They inform assistive technologies how to interact with the element or present it to your customer. Each element has a selection of default traits, but you might need to change these as you create your UI.

In SwiftUI there are two modifiers to use for traits, `.accessibility(addTraits: )` and `.accessibility(removeTraits: )` which add or remove traits respectively. Each modifier takes as its argument either a single accessibility trait or a set of traits.

```
Button(action: {}, label: { Text("Button") })
    .accessibility(addTraits: [.isSelected, .playsSound])
    .accessibility(removeTraits: .isButton)
```


### isButton
This element is a button that you customer can interact with. This causes VoiceOver to announce '_button_' after reading the items accessibility label. It also tells Switch Control and Voice Control that it's possible to interact with this control.

### isHeader

Any large text header element that divides content. For example a navigation bar title, or a table section header. This causes VoiceOver to read '_heading_' after reading the accessibility label.

By swiping vertically VoiceOver users can skip content and only read elements marked with this trait. This is an essential technique for VoiceOver users, as they can't visually skim a screen to find the content that's important to them right now.

### isSelected

An item that is currently selected, such as a tab, or an item on a segmented control. By reading '_selected_' after the accessibility label this helps VoiceOver users to augment themselves on the screen.

### isLink

An inline link such as in a webpage. This causes VoiceOver to announce '_link_' after reading the item. It also tells Voice Control and Switch Control this element is interactive. Using a rotor setting VoiceOver users can skip content and navigate only elements marked with this trait.

### isSearchField

A text field that allows your customer to enter a string to perform a search. This differentiates this field from a standard text field and hints to the user that entering text here should cause the UI to update elsewhere. VoiceOver announces '_search field_' after announcing the element's accessibility label.

### isImage

Any image or visual element that has no text and no actions. Image elements set this trait by default, but if you are drawing your own graphics, you may want to set this property. Consider whether it makes sense for this element to be accessible.

### playsSound

An element that will trigger sound once activated. This trait tells VoiceOver to stop announcing as soon as your customer activates this element. This avoids conflicting with the sound played.

### isKeyboardKey

An item that acts as a key on a keyboard if you're implementing a custom input control. With this trait on a button, VoiceOver no longer reads '_button_' after the accessibility label to allow for quick switching between keys.

### isStaticText

Text that does not change throughout the lifecycle of your view. This tells the accessible user interface it doesn't need to check if the value of this element has changed.

### isSummaryElement

A Summary Element trait characterises an area that provides a brief summary of the state of the current screen. The best example of this is Apple's built in Weather app. On opening a location, VoiceOver highlights the top area, marked as a Summary Element. VoiceOver then reads a quick overview of the current weather conditions in the selected location.

![Apple's Weather app with VoiceOver highlighting the top Summary Element.](/images/SwiftUI-summaryelement.png)

### updatesFrequently

This trait is for elements that update either their label or value frequently. In UIKit you cause use this to tell the accessible user interface to regularly poll this element for changes. Due to the changes in the way SwiftUI generates the AUI, I don't believe this is still the case. But I am unclear what the purpose of this trait is in SwiftUI.

### startsMediaSession

An element that will start playing or recording media when activated. Like playsSound, this trait tells VoiceOver to stop announcing as soon as the user activated the element. This avoids conflicting with the media.

### allowsDirectInteraction

Allows Direct Interaction tells VoiceOver there should be no deviation from the standard touch control for this view.

Imagine you have created a music app that provides a piano keyboard for the user to play. Using the VoiceOver paradigm of swiping to key and double tapping would not produce much of a tune. `allowsDirectInteraction` disables this control allowing your user to play the keyboard by directly tapping the keys. This means your user doesn't have to disable VoiceOver for the rest of the UI. A game might be a good use for this trait. Inappropriate use of this trait will create a worse experience for your VoiceOver users.

![Apple's Garage Band app displaying a piano keyboard](/images/SwiftUI-Keyboard.png)

### causesPageTurn

This trait indicates to Speak Screen or VoiceOver that this content represents one page out of a set of pages, such as an eBook.

This trait causes the assistive technology to call the closure in your `.accessibilityScrollAction()` modifier on your parent view immediately after completing reading the content. The assistive technology will then continue reading the new content. Reading will stop if the content does not change after calling this closure, or if you haven't implemented this modifier. Scroll views implicitly handle the `.accessibilityScrollAction()` for you. If you want to continue reading in another way, say by transitioning to another screen, or swiping on a carousel, you will need to use this modifier.

### isModal

This trait causes assistive technologies to ignore the contents of any other views on screen, allowing access only to the children of this view.


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