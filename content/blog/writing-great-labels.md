---
title: "Writing Great iOS Accessibility Labels"
description: "Tips for writing the most effective accessibility labels."
date: 2020-05-03T09:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
---

A good accessibility label lets your customer know exactly what a control does in as few words as possible, without having to rely on implied context.

### Don't Add the Element Type

iOS already knows your button is a button and your image is an image, it does this using an accessibility trait. If you label your button as 'Play button' your VoiceOver customers will hear 'Play button. Button.'

### Keep it Succinct

Don't frustrate your customer by adding too much information to your labels. There's no need to describe photos in detail for example, just let people know what the subject of the photo is.
Take another look at the Spotify example from the [post on when to use accessibility labels](blog/when-to-use-accessibility-labels/). Here our customer knows they're on the player screen for Beyoncé's 'Pray You Catch Me', so none of the labels include the name of the track. The pause button doesn't say 'Pause Pray You Catch Me by Beyoncé', but simply 'pause'. Use a single word wherever you can.

![Play controls for Spotify showing accessibility labels](/images/PlayerControlsLabels.jpeg)

### Capitalise the First Character

This allows VoiceOver to read the label with the correct inflection.

### Don't End with a Period

Your control's label is a label, not a sentence, so there is no need to end it with a period. This rule excludes blocks of text.

### Localise it

Ideally, you'll localise your app into as many languages as practical. This will help you sell in different markets, but more than that, it allows your customers to use your app in the language they are most comfortable with. If you do localise your app, remember to localise your accessibility labels too.

### Keep it Current

Sometimes our on-screen elements will change their behaviours throughout the life of the screen. Perhaps you have a button that acts as a toggle, or a shopping cart's payment button might include the total value of the cart. It's important that if your element does change state such as this that you update the accessibility label at the same time. Otherwise, you'll be lying to your users.

## Not Just for VoiceOver

It can be a common trap to fall into, thinking that accessibility labels are just for VoiceOver, but they're also used for Voice Control and Braille displays too. This gives us a few other requirements.

### Voice Control

For anything your customer interacts with, the accessibility label should be short enough they can easily say it, repeatedly if needed. And intuitive enough they can figure out what to say without having to ask iOS to tell them by saying 'show names'.
But you can specify alternatives for Voice Control using the `accessibilityUserInputLabels` property. This property takes an array of localised strings that Voice Control will listen for to toggle this control. Your label, the one displayed by Voice Control should be first, followed by any alternatives. Unfortunately, this functionality is not currently available in SwiftUI.

```
// Giving alternative utterances for Voice Control to listen to for this button in UIKit.
buyButton.accessibilityUserInputLabels = ["Buy", "Pay", "Purchase"]
```

### Braille

For your users who have a Braille display, the accessibility label is the text that is presented to them. This can be a problem if you have forced your accessibility label into a format that means VoiceOver reads it better but will look weird if displayed. I've seen this as an issue for reference numbers for example.

Let's say you are building a shopping app, and when your customer makes an order, you present them with a reference number for that order. Your label displays '1234'. But VoiceOver reads 'one thousand two hundred and thirty-four'. This is a bad experience for your VoiceOver customers, so the quick fix here is to add a space between each digit. This is a really bad option for Braille customers, as this then takes up a huge amount of space on their display. In Braille each number begins with a numerical indicator character. So '1234' takes up 5 Braille characters. '1 2 3 4' however, takes up 12. Many Braille displays can render around 14 characters.

The best option to fix this would be to use an attributed accessibility label. We'll cover those in the next post.

## Sources

* Apple [Writing Great Accessibility Labels](https://developer.apple.com/videos/play/wwdc2019/254/)
* Apple [Accessibility Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/iPhoneAccessibility/Making_Application_Accessible/Making_Application_Accessible.html).
* [Kristina Fox](https://twitter.com/krstnfx) [Adopting Voice Control](https://kristina.io/adopting-voice-control/)

## Next Up

The next blog in this series is [iOS Attributed Accessibility Labels](/blog/attributed-accessibility-labels/)

* [iOS Accessibility Labels](/blog/ios-accessibility-labels/)
* [When to use Accessibility Labels](/blog/when-to-use-accessibility-labels/)
* [Writing Great iOS Accessibility Labels](/blog/writing-great-labels/)
* [iOS Attributed Accessibility Labels](/blog/attributed-accessibility-labels/)