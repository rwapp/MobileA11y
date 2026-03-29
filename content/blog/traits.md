---
title: "iOS UIKit Accessibility traits"
description: "How does assistive technology know how to interact with your UIKit elements? Using accessibility traits."
date: 2021-08-13T07:30:56Z
lastmod: 2021-08-13T07:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
- Resources
---

Accessibility traits on iOS is the system by which assistive technologies know how to present your interface to your users. The exact experience will vary between assistive technologies, in some cases they may change the intonation of what VoiceOver reads, or add additional options for navigation, sometimes they will disable that assistive technology from accessing the element, or change how the assistive tech functions. They are the 'Role' part of the fundamental rule of making something accessible to screen readers - [WCAG's 4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html).

UIKit has sensible defaults set for standard controls so in many cases you won't need to make changes, but to make your app truly accessible you'll need to customise these. The key is knowing when to customise; as with most accessibility considerations, custom controls are a must, but also headings, elements that change their state, controls that play sound or other media, tabs, path-based interactions, and others need their traits customising to ensure your app is accessible and usable by assistive technology.

## Adding and Removing Traits

One of the most common accessibility mistakes I see is engineers assigning accessibility traits. Remember, UIKit components all have sensible accessibility traits added by default, for example, buttons all have the `button` trait. So if you do `myButton.accessibilityTraits = .selected` to indicate the option this button represents has been selected then your button will no longer be presented to your users as a button.

Traits are a [bitmask or option set](https://cocoacasts.com/how-to-work-with-bitmasks-in-swift/). A bitmask, or Option Set as Swift calls them, are a way of representing multiple unique values from a finite set. For the specific use case where this fits they are far more efficient than an array or a set, or any other collection. They are represented in memory in binary of constant size, and adding or removing elements is a mathematical operation, making this constant time. This means, instead of assigning them we need to append or remove.

```
myButton.accessibilityTraits.insert(.selected)
```

or to insert multiple traits:

```
myButton.accessibilityTraits.formUnion([.selected, .startsMediaSession])
```

To remove traits

```
myButton.accessibilityTraits.remove(.startsMediaSession)
```

Only if you are certain you want to remove all existing and potential future accessibility traits from a view should you assign traits.

```
myButton.accessibilityTraits = .selected
```

Most importantly, remember traits change as your UI changes any of these traits could be added or removed throughout the lifespan of your view, but specifically take note of 'not enabled' and 'selected'.

## Traits

Traits inform assistive technologies of the type or function of the element, assistive tech then uses this data to determine how to present the element to your user. This sometimes means providing extra actions, additional utterances, changing sounds, or other feedback or behavioral changes. Here is, to the best of my knowledge, the changes these traits make, and most importantly, when you should be using them.

### Button

VoiceOver announces 'button' after reading the element's label. For elements that are not generally interactive, such as labels or views, this trait will also cause the `accessibilityRespondsToUserInteraction` to be set to true allowing Switch Control and Voice Control to access this element. Use this for any element that performs an action, including a table cell that pushes to another screen and any view that you have added a tap gesture recognizer to.

![VoiceOver announcing a button](/images/button.jpeg)

### Link

An link similar to what would appear in a web page, often but not exclusively inline. This will generally navigate to a web page or make a phone call. Using a link to navigate within an app is acceptable, but the convention is to use the 'button' trait for this. A link should only navigate, not perform any actions such as submitting a form, if the control also performs an action, use 'button'. The behavior of this trait is the same as for Button, except VoiceOver reads 'link'.

![VoiceOver announcing an inline link](/images/link.jpeg)

### Search Field

A trait to be used on a text field that acts as a search field. VoiceOver announces this as a search field, allowing VoiceOver users to easily identify its purpose and hints that typing here will cause UI to be updated elsewhere.

![Apple Music's search field](/images/search.png)

### Image

Any image or other visual element such as a graphical element or animation that contains no text (aside from text hard coded in the image, although this is not recommended). Generally this should not be applied to an image button, but could be applied to an image that can be tapped to get a larger version. Only apply this trait to images that add to the experience, others should be hidden to accessibility. For more on adding image descriptions check out [When to use Accessibility Labels](https://mobilea11y.com/blog/when-to-use-accessibility-labels/) and [Writing Great iOS Accessibility Labels](https://mobilea11y.com/blog/writing-great-labels/). Adds the word 'Image' to the VoiceOver utterance and enables VoiceOvers image recognition features to create a ML description of the image, including identifying known people and text where possible.

![VoiceOver announcing an image](/images/image.jpeg)

### Selected

Indicates that the element has been selected, such as a radio button, checkbox, switch, tab, or segment. Causes VoiceOver to read 'selected' as part of the element's utterance.

![Apple Music's Lyrics button selected](/images/selected.png)

### Plays Sound

An element that triggers sound once activated. This tells VoiceOver that it does not need to play the regular sound used to provide feedback that this control has been activated. Use this if you provide your own auditory feedback when activating a button.

### Keyboard Key

Use this trait if you are implementing a custom keyboard. This changes the intonation VoiceOver uses to read the key's label, along with a phonetic hint added to the utterance. It also allows both regular VoiceOver swipe based navigation of keyboard keys and direct interaction with the keys, allowing VoiceOver users to type the way that suits.

### Static Text

This trait is added by default to labels. It informs assistive tech that this text shouldn't change, or will rarely change, throughout the lifespan of the current screen. This means the assistive tech doesn't have to poll for updates. If this element does change occasionally thats ok, but you should post `UIAccessibility.post(notification: .layoutChanged, argument: nil)` when it does. If your text changes often you should remove this trait and instead add...

### Updates Frequently

Apply this trait to any element where the accessibility label or value changes regularly throughout the lifespan of the view. This tells your users assistive technology to poll this element regularly for updates. An example of use could be a timer or a scoreboard. Failing to add this trait where its needed means your users won't get your up to date interface, using it where its not needed will reduce device performance and battery life.

### Summary Element

Use this trait to characterise an area of your UI that provides and overview of the content of the screen. The perfect example for this is Apple's weather app where the top section provides a summary of the current conditions before diving in to more detail below, this top section has the summary element trait.

This trait will cause VoiceOver to read this element to your customer once this screen appears regardless of the position of this element in the view hierarchy, focus order is not affected.

![Apple Weather with VoiceOver focusing on the summary](/images/weather.png)

![VoiceOver reading the second visual element marked with the Summary Element trait but focus remains on the first element](/images/summary.png)

### Not Enabled

This item is disabled and nothing will happen if it is activated. VoiceOver will add 'dimmed' to the element's utterance, Switch Control and Voice Control will ignore this element.

![Disabled Continue button](/images/disabled.png)

### Starts Media Session

Informs assistive tech that activating this element will start playing or recording media. This prevents VoiceOver from repeating the element's label once activated thus it does not interrupt the media.

### Adjustable

This indicates that the user can change between a range of values in elements such as sliders or pickers. VoiceOver informs your user they can swipe vertically on this element to change the value. So it is essential that if you apply this trait you also implement the `accessibilityIncrement()` and `accessibilityDecrement()` functions on your view's subclass to allow this. These functions also add extra options into the Switch Control menu for this element.

![Increment and Decrement buttons in the Switch Control menu](/images/increment.png)

![Apple Music's volume control](/images/adjustable.png)

### Allows Direct Interaction

This trait allows VoiceOver users to disable VoiceOver navigation for the element. You would use this in controls where direct path interaction is the only real way of control, for example a freehand drawing canvass. Apple use this trait in GarageBand in the virtual instruments. This means VoiceOver users can continue to use the path interaction without having to disable VoiceOver entirely.

![GarageBand displaying the VoiceOver rota control to enable direct touch for a musical keyboard interface](/images/garageband.png)

### Causes Page Turn

Use this trait to indicate the element represents a single page in a series of pages, for example a page in an e-book. This allows VoiceOver or the screen reader to read the content of this page, then automatically 'turn' the page and continue reading. Your element must listen and respond to the `accessibilityScroll()` method which assistive tech will call when it reaches the end of the current content. Return false when the end of the content has been reached and assistive tech will stop reading. If there is more content, change the screen and return true to continue reading.

### Header

Any visually distinct header text should have this trait applied. Headers can be visually distinct through visual positioning or different text styles - eg font weight, colour, or family. For visual users this allows them to skim content to find what is relevant. The header trait allows something similar for VoiceOver users. By swiping vertically on a screen we skip content and only read the next available header. 'Heading' is also added to the element's utterance.

Each screen in your app should have at least one header and a header should generally be the first element focussed by VoiceOver, allowing your users to orientate themselves. The number of headers your screen has will vary from app to app. Many will have a single header, news apps may have many. In general, try not too add too many as this adds to VoiceOver noise.

![VoiceOver announcing a heading](/images/heading.png)

### Tab Bar

Indicates that this view contains buttons that act as tabs. This view must return false for `isAccessibilityElement` but the child buttons must be accessible. This allows VoiceOver to add 'Tab, x of x' to the tab's utterances.

![Tab Bar with the second element selected](/images/tabbar.png)

---

Traits are a powerful part of iOS's accessibility system, they allow assistive technology to determine developer intent, something that is not generally possible to do through automation, so its essential we provide the correct information. If you want to know more about the traits available in SwiftUI, check out my guide to [SwiftUI Accessibility: Traits](https://mobilea11y.com/guides/swiftui/swiftui-traits/)