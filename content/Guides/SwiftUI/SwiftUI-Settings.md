---
title: "SwiftUI Accessibility: User Settings"
description: "SwiftUI allows us to read values that might affect how we want to present ­­our UI. Including our customer's accessibility choices."
date: 2019-10-27T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
---
SwiftUI allows us to read environmental values that might affect how we want to present ­­our UI. Things like size classes and locale for example. We also get the ability to read some of the user's chosen accessibility settings allowing us to make decisions that will best fit with your customer's preference.

## Why?

Before we cover what these options are and how to detect them I think it's important to briefly cover why we need to detect them. There's a few dos and don'ts worth consideration.

### Don't – Creep on accessibility customers

The percentage of your customers with one or more of these options selected is going to be small. This makes these settings an easy choice for fingerprinting. In fact, some accessibility experts argue we [shouldn't allow software to detect these settings at all](https://tink.uk/thoughts-on-screen-reader-detection/). While I'm not sold on that argument, you must respect your users as an individual.
I wince every time I see someone who uses a wheelchair referred to as a '_wheelchair_.' The person is not a wheelchair. The person is an individual who just happens to use a specific tool to help with their mobility. If you detect one of your customers is using VoiceOver and record this as personal information you're doing the digital equivalent. It's pretty hard to argue this kind of fingerprinting is not immoral, so please, don't even try.

### Do – keep anonymous stats

What is important is keeping anonymous stats. Record percentages for your customers who have different settings or assistive technologies enabled. This will help your design teams creating designs that work best for your customers. It will also help your business prioritise accessibility work.

### Don't – make a new interface

It can be tempting to make wholesale changes to an interface when you detect certain settings or assistive technologies. This is a somewhat paternalistic approach that can come across as patronising. More than this though, it's liable to create a ghettoisation of accessibility experiences. Your accessibility-specific experience is liable to have less testing and fewer updates. If you feel your interface would be significantly improved for accessibility users by nuking it, then you probably need to nuke it for everyone. Any changes you make as a result of your customer changing one of these setting should be nothing more than a tweak.

### Do – respect your customer's choices

If your customer has chosen to enable reduce motion, that's because they get a benefit from that setting. So if you're using animation in your app, you should consider whether you might be better to cut it out with this setting enabled. It might only be a small number of people who use this setting, but the feeling of being valued when a user notices you've listened to their choice is equal to the feeling that you don't care when your customer notices you haven't.

## SwiftUI Environment properties

There are two ways of detecting settings, which one you can use depends on what setting you're looking for. I'm unclear why some use the SwiftUI environment and others don't. My best guess is that Apple will migrate others to the SwiftUI environment in future versions.
Firstly, we can use the `@Environment` property wrapper, and provide the key path we want to observe. We then assign this to a var we can use in our view. For example, if we wanted to determine our users differentiate without colour setting, we'd ask SwiftUI to set this to a `differentiateWithoutColor` variable.

```swift
@Environment(\.accessibilityDifferentiateWithoutColor) var differentiateWithoutColor
```

In practical terms, we then would want to change the appearance of our UI based on our knowledge of our customer's setting. If we wanted to determine whether to use a transparent background, we can do something like this.

```swift
struct ContentView: View {
   @Environment(\.accessibilityReduceTransparency) var reduceTransparency
   var body: some View {
      Text("Some text")
         .padding()
         .background(Color(.sRGB, red: 255, green: 0, blue: 0, opacity: reduceTransparency ? 1.0 : 0.8))
    }
}
```

Here are some user settings you might want to listen to, and how you might want to adjust your SwiftUI views to accommodate them.

### sizeCategory

Returns a `ContentSizeCategory` enum value describing your customer's chosen text size. [Majid Jabrayilov](https://twitter.com/mecid) has a great post on how you might use this to [re-arrange your layout](https://mecid.github.io/2019/10/09/dynamic-type-in-swiftui/) based on this value.

### legibilityWeight

An enum returning `.bold` if your user has chosen bold text, `.regular` if not. There's no need to add a `.bold()` modifier to your text if the this returns `.bold`, SwiftUI does this for us.

### accessibilityDifferentiateWithoutColor

If your customer has this set to true you should consider using shapes and/or extra text labels if your UI conveys information in colour.

### accessibilityReduceTransparency

If this is true you should remove any transparency from backgrounds.

### accessibilityEnabled

A Boolean that tells your view if VoiceOver, Voice Control, or Switch Control is enabled, but not which one. To determine which assistive technology is enabled you can query the UIAccessibility API. `.isVoiceOverRunning` or `.isSwitchControlRunning` for VoiceOver and Switch Control respectively. There doesn't appear to be a nice way to check for Voice Control but `accessibilityEnabled == true && !UIAccessibility.isVoiceOverRunning && !UIAccessibility.isSwitchControlRunning` seems to work ok. Obvisouly though, this relies on this property not reporting for any other types of assistive tech.

### accessibilityInvertColors

A Boolean value to determine if invert colours is enabled. This appears to be somewhat unreliable at the moment, from my testing it appears to only report smart invert, not classic invert.

### accessibilityReduceMotion

A Boolean value that tells us if our user has asked for animation to be minimal. If this is true you should consider slowing, reducing, or removing any non-essential animation.

### colorSchemeContrast

An enum that returns `.increased` if your customer has Increase Contrast enabled. With this setting, you should check your text has around [7:1](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7) contrast ratio with your background.

### UIAccessibility properties

The second, less SwiftUI-like method is to query the UIAccessibility API. These values are set on the creation of your view and are not updated when your customer changes the setting or when the view is redrawn.
If we wanted to know if our user has on/off labels enabled for their switches, we'd use the following.

```swift
var onOffLabels = UIAccessibility.isOnOffSwitchLabelsEnabled
```

Alternatively, if you query UIAccessibility in place. This makes your code a little less clean, but the value returned will always be the current status at the time your view is (re)drawn, even if this changes while your view is visible.

```swift
Text("\(UIAccessibility.isVoiceOverRunning ? "Voice Over is running" : "Voice Over is not running")")
```

Unfortunately, we don't get an update when these settings change as we do with `@Environment` properties. But using combine it's possible to [set up publishers](https://medium.com/flawless-app-stories/problem-solving-with-combine-swift-4751885fda77) for [NotificationCentre events](https://developer.apple.com/documentation/uikit/accessibility/notification_names) for many of these settings.

### isVoiceOverRunning

A Boolean returning true if VoiceOver is currently enabled.

### isClosedCaptioningEnabled

A Boolean value that returns true if your user has requested captions on video content. With this setting enabled you should force captions on all video and audio content in your app.

### isGuidedAccessEnabled

[Guided access](https://support.apple.com/en-us/HT202612) allows users to disable some device functions or to lock the device to a single app. This is useful for people with more severe learning difficulties, motor issues, or cognitive impairments, who might leave an app unintentionally and become distressed by this. It's often also used in retail situations to lock down devices. If you have created your app for either of these markets it's worth listening to this setting so you can make it clear when guided access is not yet activated.

### isGrayscaleEnabled

This Boolean value returns true if your customer has grayscale enabled. You might want to change to higher contrast colours if your customer has chosen this setting. Although if you feel you need to do this perhaps your colours aren't high contrast enough already. You'll also probably want to make the same changes as with `accessibilityDifferentiateWithoutColor`.

### isVideoAutoplayEnabled

Auto-playing video can be an annoyance, but to many people with attention or anxiety disorders, they can make an app unusable. They can also get in the way for non-sighted or low vision people who don't know a video has started. If this returns false you should only trigger video as a direct result of user interaction.

### isSwitchControlRunning

Returns true if [switch control](https://support.apple.com/en-us/HT201370) is running.

### isSpeakSelectionEnabled

Returns true if speak selection is enabled. This doesn't mean speak selection has been triggered.

### isSpeakScreenEnabled

Returns true if speak screen is enabled. This doesn't mean speak screen has been triggered.

### isShakeToUndoEnabled

People with motor issues may struggle with the shake to undo gesture. Either because they trigger it unintentionally, or because they can't perform the motion required. If this returns true you should add or increase the prominence of undo controls where needed.

### isAssistiveTouchRunning

[Assistive touch](https://support.apple.com/en-us/HT202658) doesn't alter the navigation of your app, but there are a couple of considerations you might want to make if this property returns true. Firstly, this tool is designed for people with reduced motion, so if this option is enabled you might want to offer alternatives to any multi-finger gestures your app uses. Additionally, Assistive Touch adds a small overlay onto the screen. Your user can move this around the edge of the screen to avoid clashing with content and controls. But if your app makes use of regular gestures from the edge of the screen, remember this assistive touch control may obscure these.

### isOnOffSwitchLabelsEnabled

This property returns true if your customer has asked for switch controls to be labelled with I for on and O for off. For standard toggles, you don't need to do anything here. But if you have designed your own toggle appearance it's important to listen to this. This setting is a primitive version of `accessibilityDifferentiateWithoutColor`, but that doesn't mean you can ignore this option.


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