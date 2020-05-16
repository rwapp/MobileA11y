---
title: "Accessibility Review: Daily Dictionary - Screen changes"
description: "Daily Dictionary provides a new word every day with definitions and real-world uses. Some VoiceOver users might struggle to determine when screens on the app change."
date: 2020-05-16T07:30:56Z
tags:
- Accessibility Review
---
The [Accessibility Review series](/tags/accessibility-review/) uses real world apps to provide examples of common accessibility issues and provide tips on how to fix them. Each of the developers has kindly volunteered their app to be tested.

[Daily Dictionary](https://apps.apple.com/us/app/daily-dictionary/id1421185864) is an app from [Benjamin Mayo](https://9to5mac.com/author/benjaminmayo/) providing a new word every day with definitions and real-world uses designed to help increase your vocabulary.

Assessing the app, I noticed Benjamin has made a design decision around presenting the app’s settings. Settings are slid down from the top of the screen, similar to a card UI that you might find in the Apple Maps app. Except with Daily Dictionary, the card is presented from the top of the screen. The card slides down or up in response to the user activating the settings button on the navigation bar.

![Daily Dictionary settings closed](/images/DictionaryClosed.PNG)

The above image shows the main Daily Dictionary screen with the settings closed. In this state, the title of the settings button is “Open settings”.

![Daily Dictionary settings open](/images/DictionaryOpen.PNG)

This image shows Daily Dictionary after a VoiceOver user has toggled the “Open Settings” button. The title changes to “Close settings”, this title is read by VoiceOver immediately after animating the settings onto the screen.

This interaction is different from the standard iOS method to present a modal dialog of any kind and is a pleasing visual change, but the difficulty here for some VoiceOver users will be knowing what has changed. On toggling the settings, there is no indication to VoiceOver that anything has changed, other than the title change of the button. Swiping right from the current location, the natural next step to navigate the screen reaches no elements and results in a ‘dunk’ sound. Swiping left will take the user to the app’s title, suggesting there is no further content in this direction. This will be a confusing experience for anyone with very little, or no, vision, who can’t tell this new dialog has animated on to the screen from the top, above the navigation bar.

There are a few possible ways to fix this issue, but as this interaction strays from the standard iOS patterns, the ultimate answer really would have to be found by testing these options with VoiceOver users, to determine which option has the least friction.

## Announcement

VoiceOver can announce to your customer if something on the screen has changed, this is a great way to ape Android’s [live region](http://localhost:1313/blog/android-live-regions/) feature for TalkBack. In this situation, the best way to do this is to tell VoiceOver the screen has changed, and provide it with a string to announce.

```
UIAccessibility.post(notification: .layoutChanged, argument: "Settings available above.")
```

By informing VoiceOver the screen has changed, VoiceOver will re-draw it’s model of the screen, ensuring what is presented to your VoiceOver customer is current with what is displayed. Once it has done this, VoiceOver will read the string passed informing our customer they can navigate backwards to access the settings that have just appeared. However, as the title of the button that is currently highlighted by VoiceOver also changes, VoiceOver will want to read this new title too, and your announcement may be lost to the new button’s title.

## Focus Change

An alternative option is to tell VoiceOver to move focus to the first new item, in this case, the ‘Notifications’ row in the settings table. We can do this by posting the same notification as above, but instead of passing a string, we pass a reference to the notifications cell.

```
UIAccessibility.post(notification: .layoutChanged, argument: notificationCell)
```

VoiceOver again will update its model of the screen, and once this is complete will move VoiceOver’s focus to the notification cell, and read its accessibility label. Moving the customer’s focus in this way is not always advisable, as it can be disorienting and interrupt your customer’s mental model of your screen’s layout. In this situation as the customer is expecting the screen to change as a result of tapping the settings button this would probably not be disruptive. One potential downside to this option however, is that the VoiceOver users would usually expect to navigate up to the navigation bar to find a ‘back’ or ‘close’ button. In this situation the button is now at the bottom of the screen, after the app’s title, this again could be a confusing navigation order.

## Test

As a non-VoiceOver user, its difficult to fully appreciate how VoiceOver users experience your app, and to make assumptions here can be patronising and result in a worse experience. The best way to find a solution to this is to test with real VoiceOver users and listen to their feedback.