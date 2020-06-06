---
title: "Resources"
description: "A collection of online resources for improving mobile accessibility."
date: 2019-12-01T07:30:56Z
tags:
- Resources
---

This is a personally curated list of resources I have used and think others may find helpful too. I'm always looking for new high quality mobile accessibility and inclusion resources to add here. Please share any you find with me via [email](mailto:a11y@mobilea11y.com) or [Twitter](https://twitter.com/MobileA11y).

## Code

### Android

* **[Android Developers: Build more accessible apps](https://developer.android.com/guide/topics/ui/accessibility)**<br/>
Android's developer documentation for Accessibility, including design, building & testing. With videos, code samples, and documentation.

* **[Android: Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps)**<br/>
Google's guide to improving accessibility on Android

* **[Android Accessibility – The Missing Manual](http://www.last-child.com/android-a11y-missing-manual/)**<br/>
A detailed introduction to Android accessibility.

* **[Exposing hidden actions on Android](https://ataulm.com/2019/05/09/exposing-hidden-actions-on-android/)**<br>
A tutorial on adding accessibility actions to Android views.

* **[Android Accessibility Tutorial: Getting Started](https://www.raywenderlich.com/240-android-accessibility-tutorial-getting-started)**<br/>
A great tutorial for any android developer looking to start their journey towards making their app more accessible. Ray Wenderlich tutorials are always incredible quality, and this one from [Victoria Gonda](https://twitter.com/TTGonda) is no exception.


### iOS

* **[Adopting Voice Control](https://kristina.io/adopting-voice-control/)**<br/>
A great, concise, overview on how best to adopt iOS 13's Voice Control feature from [Kristina Fox](https://twitter.com/krstnfx)

* **[Apple Accessibility Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/iPhoneAccessibility/Introduction/Introduction.html)**<br/>
No longer updated, but the general principles are still valid.

* **[UIAccessibility Reference](https://developer.apple.com/documentation/uikit/accessibility/uiaccessibility)**<br>
Apple's developer documentation for the UIAccessibility protocol.

* **[Using A Custom Font With Dynamic Type](https://useyourloaf.com/blog/using-a-custom-font-with-dynamic-type/)**<br/>
[Keith Harrison](https://twitter.com/kharrison) from [Use Your Loaf](https://useyourloaf.com) has a great article on supporting dynamic type and how to do this with a custom font. Dynamic type is now an expected essential for any iOS app, and there's no excuse for not including it.

* **[Accessibility in SwiftUI](https://swiftwithmajid.com/2019/09/10/accessibility-in-swiftui/)**<br/>
[Majid Jabrayilov](https://twitter.com/mecid) has a great introduction to some of the changes that make SwiftUI a better choice for accessible apps. He's also covered [localisation](https://swiftwithmajid.com/2019/10/16/localization-in-swiftui/) and [dynamic type](https://swiftwithmajid.com/2019/10/09/dynamic-type-in-swiftui/) in SwiftUI.

* **[Realtime Video Closed Captioning in SwiftUI](https://medium.com/better-programming/realtime-video-closed-captioning-in-swiftui-4022ba85c803)**<br/>
I haven't actually tried this out, i'm always a little skeptical of real-time captions, as they're often not accurate. As someone who is hard of hearing I use captions to fill in the gaps, and when they're not right I loose all meaning. That said, this looks pretty magical.

* **[Grouping elements for better accessibility on iOS](https://thoughtbot.com/blog/grouping-elements-for-better-accessibility-on-ios?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B395)**<br/>
A quick tutorial on creating iOS semantic views.

* **[Deaf Can Code](https://apps.apple.com/gb/app/deaf-can-code/id1485133152)**<br/>
Video tutorials in American Sign Language for creating iOS apps.

* **[Audiograph](https://github.com/Tantalum73/Audiograph)**<br/>
Audiograph is an iOS library for adding audio representations to charts.

* **[iOS Accessibility: Getting Started](https://www.raywenderlich.com/6827616-ios-accessibility-getting-started)**<br/>
The always fantastic Ray Wenderlich team give us this detailed getting started guide on iOS accessibility.

* **[KeyboardKit](https://github.com/douglashill/KeyboardKit)**<br/>
[Douglas Hill](https://twitter.com/qdoug) built this library to add common keyboard commands, such as page down, arrow key navigation, and more, to iOS.

* **[iOS Large Content Viewer](https://www.fivestars.blog/code/large-content-viewer.html)**<br/>
Dynamic type is an essential for iOS apps, it allows your customers to scale the text to a size that suits them. But sometimes there can be elements that can only scale so far. In these situations, the Large Content Viewer is the tool for the job and here [Federico Zanetello](https://twitter.com/zntfdr) tells us how to use it. Just make sure you use this technique as a last resort, not as an excuse no to scale the text.

### Cross Platform

* **[React Native Accessibility Is Pretty Bad](http://www.takingnotes.co/blog/2018/11/09/react-native-accessibility/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B381)**<br/>
I have no experience with react native, so can't offer an opinion on if this is still the case. My instinct tells me that a UI designed for no particular idiom is likely not great on any platform.

* **[iOS vs. Android Accessibility](http://www.pauljadam.com/iosvsandroida11y/)**<br>
Now slightly out of date, [Paul J. Adam's](https://twitter.com/pauljadam) guide and comparison of iOS and Android accessibility features and how they work for developers is still a good reference.


## Tools

### iOS

* **[xiblint](https://github.com/lyft/xiblint)**<br/>
An iOS storyboard linting tool from Lyft. I haven't been able to try this myself, but shifting accessibility left seems like it would be more effective than waiting to catch UI issues in testing.


### Cross Platform

* **[Colour Contrast Analyser](https://developer.paciellogroup.com/resources/contrastanalyser/)**<br/>
A PC and Mac application from [The Paciello Group](https://www.paciellogroup.com) to determine the contract ratio between colours, and their conformance with [WCAG](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).

* **[Hemmingway App](http://www.hemingwayapp.com)**<br/>
Hemmingway is an online grammar checker that highlights difficult to understand sentences and provides a reading grade for your written content.

* **[Open Dyslexic](https://opendyslexic.org)**<br/>
A open-source, pay-what-you-like dyslexia friendly font


## Guides

### Android

* **[Android: Basic Android AccessibilityTutorial](https://codelabs.developers.google.com/codelabs/basic-android-accessibility/#0)**<br/>
A tutorial from Google with sample code that takes you through improving some common accessibility pitfalls.

* **[Building apps for everyone: discover why inclusivity and accessibility truly matter](https://medium.com/bbc-design-engineering/building-apps-for-everyone-discover-why-inclusivity-and-accessibility-truly-matter-328d2cef616c)**<br/>
A friend who works on the BBC Sounds app once challenged me to find accessibility issues with their iOS app. All I could find was one issue, so minor it could barely be called an irritation, and was probably a system issue rather than the app. This guide from a couple of the BBC Sounds and BBC iPlayer Android devs gives you the lowdown on how they achieved an excellent level of accessibility. One tip I think often gets overlooked - Listen to user feedback.


### iOS

* **[Apple Accessibility](https://www.apple.com/uk/accessibility/)**<br/>
Apple's customer-facing accessibility website with details on the system accessibility features on all of their platforms. Some of these you get for free, some you have to opt in to, and others you have to work with. Its worth taking a look through and familiarising yourself with the features available, and checking how they work with your app.

### Cross Platform

* **[Accessibility Dos and Don'ts](https://github.com/UKHomeOffice/posters/tree/master/accessibility/dos-donts)**<br/>
Posters produced by the UK Government with simple dos & don'ts for digital accessibility. Ironically in an inaccessible bitmap format, but still a great place to get started.

* **[Handling Gender in Software](https://twitter.com/aimeegamble/status/1193491265788223488)**<br/>
A twitter thread from [Aimee Gamble-Milner](https://twitter.com/aimeegamble) covering some good and bad examples of handling gender and sexuality in software.

* **[Mobile Accessibility at W3C](https://www.w3.org/WAI/standards-guidelines/mobile/)**<br/>
The mobile accessibility initiative at W3C.

* **[Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/)**<br/>
Wherever you are in the world, if you have some form of accessibility regulation governing what you build, the chances are its based around WCAG. WCAG are written for web, so need a little translation to make them work for mobile. They're also seemingly endless, and a dry read. But they are the backbone of everything we try to achieve in accessibility, so are worth a cursory glance at the least.

* **[Plain English Campaign Guides](http://www.plainenglish.co.uk/free-guides.html)**<br/>
The Plain English Campaign works to remove jargon from written language. They have a range of free guides on their website that provide tips on how to avoid jargon and unnecessary complexity while keeping your language engaging.

* **[BBC Mobile Accessibility Guidelines](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile)**<br/>
This guide covers [design](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/user-experience), [coding](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/developers), and [content](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/editors) for iOS, Android and mobile web. Including sections on testing.

* **[Orange Mobile Accessibility Guidelines](https://a11y-guidelines.orange.com/mobile_EN/index.html)**<br/>
A nice set of code examples for iOS and Android in Java, Kotlin, Objective-C and Swift. Guides on design & testing too.


## Design

### Android

* **[Material Design Accessibility](https://material.io/design/usability/accessibility.html)**<br/>
Google's guidelines for ensuring accessibility with Material Design projects.

### iOS

* **[Apple Human Interface Guidelines: Accessibility](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)**<br/>
Apple's set of best practices for creating accessible apps.


### Cross Platform

* **[inclusive Design Principles](https://inclusivedesignprinciples.org)**<br/>
The guiding principles of the inclusive design movement. A short introduction to creating designs that work better for everyone.

* **[Microsoft Inclusive Design 101](https://www.microsoft.com/design/inclusive/)**<br/>
Microsoft's design team are all in with supporting inclusive design. Their inclusive design page features a bunch of guides for different areas of inclusive design in software.


## Articles

* **[Why Shortcuts Matter for Accessibility](https://www.macstories.net/stories/why-shortcuts-matter-for-accessibility/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B375)**<br/>
How automation on iOS makes a huge difference for accessibility users.

* **[The business case for accessibility](https://www.deque.com/blog/the-business-case-for-accessibility/)**<br/>
Sometimes getting accessibility prioritized in a business can be difficult, this article should help you make the case for why it's important right now.

* **[Stammering Accessibility and Testing for Voice Assistants & Devices](https://moolya.com/deeptest/2020/04/26/stammering-accessibility-and-testing-for-voice-assistants-devices/)**<br/>
[Pradeep Soundararajan](https://twitter.com/testertested) uses his own experience to test Google Assistant with stammering. As app developers we don't have much control over how the device performs voice recognition, but that doesn't make this piece any less interesting. Pradeep suggests the use of non-vocal sounds for common commands, such as a single clap meaning confirm.

* **[Accessibility & Competing Priorities](https://www.fbeeper.com/accessibility/2020/05/25/Accessibility-Competing-Priorities/)**<br/>
[Ferran Poveda](https://twitter.com/fbeeper) has been blogging about his experience as a mobile developer looking to improve his accessibility knowledge and skills. This post especially is an honest account of feeling overwhelmed by the vastness of the topic, and deciding when and where to start. I'm sure there must be many engineers in a similar position to Ferran, its never too late to start.

### Anxiety & Mental Health

* **[Design Patterns for Mental Health](https://www.designpatternsformentalhealth.org)**<br/>
While we often see 'the end is nigh' headlines about how technology is affecting our mental health. Unfortunately there seems to be very little research an guidance on what we can actually do to improve digital experiences for those with mental health issues. This list, while incomplete, ia a great resource.

* **[A web of anxiety: accessibility for people with anxiety and panic disorders](https://developer.paciellogroup.com/blog/2018/08/a-web-of-anxiety-accessibility-for-people-with-anxiety-and-panic-disorders-part-1/)**<br/>
[David Swallow](https://twitter.com/davidofyork) gives us this in-depth, two part blog post on software patterns that can trigger anxiety disorders. unfortunately many of these will look very familiar. [Part 2](https://developer.paciellogroup.com/blog/2018/11/a-web-of-anxiety-accessibility-for-people-with-anxiety-and-panic-disorders-part-2/).


## Research

* **[UK Consumer Digital Index](https://www.lloydsbank.com/banking-with-us/whats-happening/consumer-digital-index.asp)**<br/>
Every year the UK Government and Lloyds Bank produce a survey of the UK's digital skills. The survey provides a huge range of statistics, covering age, gender, disability, digital disadvantage, and others.


## Testing

### Android

* **[Android Accessibility Scanner](https://support.google.com/accessibility/android/answer/6376570?hl=en#)**<br/>
Android's own accessibility testing app available free from the Play store.

### iOS

* **[New in iOS 13 Accessibility – Voice Control and More](https://www.deque.com/blog/new-in-ios-13-accessibility-voice-control-and-more/)**<br/>
This post from Deque is ostensibly about the new accessibility features in iOS 13. For me the most interesting part is the ways Voice Control can be leveraged for faster, comprehensive accessibility testing.

* **[Auditing your App with the Accessibility Inspector: Kilo Loco](https://www.youtube.com/watch?v=sqGSYGHJMVM)**<br/>
[Kilo](https://twitter.com/Kilo_Loco) introduces us to Xcode's Accessibility Inspector, or 'the little naked guy who wants to give you a hug.' How to run it on your app, and how to understand what its telling you.

* **[AppleVis App Directory](https://www.applevis.com/apps)**<br/>
AppleVis is a community of blind and vision impaired Apple users, their site is a wealth of information for both users and developers. One of the most useful resources is the AppleVis app directory. Users submit apps they have used and provide them a rating and a recommendation. If you're looking to find out how VoiceOver users really experience your app, this is a good starting point.

* **[AppleVis Bug Tracker](https://www.applevis.com/bugs)**<br/>
AppleVis also maintain their own bug tracker of Apple system software. Unfortunately, like many developer-facing Apple bugs, accessibility bugs can sometimes languish. This database provides a list of accessibility bugs that have been submitted as radars. Many including detailed reproduction steps.

* **[iOS Accessibility Testing for Devs using Voice Control](https://www.youtube.com/watch?v=72YySyRkRh4)**<br/>
A short video from [Deque](https://www.deque.com) on how to quickly use iOS 13's Voice Control feature to do accessibility testing.

* **[A11yUITests](https://github.com/rwapp/A11yUITests)**<br/>
An iOS library for XCUITests to add automated accessibility checks.

* **[UBKAccessibilityKit](https://github.com/NAB/UBKAccessibilityKit)**<br/>
An iOS library you can include in your testing apps to detect accessibility issues.

* **[AccessibilitySnapshot](https://github.com/cashapp/AccessibilitySnapshot)**<br/>
AccessibilitySnapshot is a third approach to automated accessibility testing on iOS. Accessibility elements are highlighted in screenshots, with their accessibility values listed in the order they appear to your users. This doesn't tell you when you have an issue, but lets you quickly visually tell if everything is as you expect, and know when something changes.


### Cross Platform

* **[The Paciello Group Mobile Testing Guide (PDF)](https://developer.paciellogroup.com/downloads/TPG_Mobile_Testing_Guide.pdf)**<br/>
Easy to follow guide on manual testing for accessibility tools on iOS and Android.

* **[Setting priorities for accessibility issues](https://blogs.intuit.com/blog/2020/05/19/setting-priorities-for-accessibility-issues/)**<br/>
A guide for ranking the priority for any accessibility defects found in your app. I commonly see accessibility defects raised simply as improvements. Remember that while they may not affect all of your customers, for those it does mean the difference between being able to use your app or not at all. Plus, with accessibility, there are legal factors involved too.


## Tweets

Short tips from Twitter

* **[The Language of accessibility](https://twitter.com/sebsilbermann/status/1183351930267078656)**<br/>

* **[Using unusual unicode characters](https://twitter.com/kentcdodds/status/1083073242330361856)**<br/>


## Books

* **[Developing Accessible iOS Apps](https://www.amazon.co.uk/gp/product/B082MCNRSK/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B082MCNRSK&linkCode=as2&tag=mobilea11y-21&linkId=d4d0f9a7280b432f30b43e2c27b24401)**<br/>
[Daniel Devesa](https://twitter.com/dadederk) has written this comprehensive guide to building accessible iOS apps.

* **[Developing Inclusive Mobile Apps: Building Accessible Apps for iOS and Android](https://www.apress.com/us/book/9781484258132)**<br/>
Full disclosure - this is my book. Its a guide to the accessibility tools available to developers on both iOS and Android, how to use them and how to test it.


## Podcasts

* **[36 Seconds That Changed Everything: How the iPhone Learned To Talk](https://www.36seconds.org)**<br/>
An incredible audio documentary from [Shelly Brisbin](https://twitter.com/shelly) covering the announcement of VoiceOver for the iPhone. For me the first 1/2 about the iPhone not being accessible is more telling than the result of Apple adding accessibility features.

* **[AppleVis Podcast](https://www.applevis.com/podcasts)**<br/>
An Apple-focussed tech podcast, much like any other, the only difference being the hosts have visual impairments

* **[Accessible Podcast](https://www.accessible.fm)**<br>
A podcast about accessibility in tech, focussing on Apple.

## Talks

### iOS

* **[Inclusive and Accessible App Development: Kaya Thomas](https://www.youtube.com/watch?v=M7GOoZMMrnY)**<br/>
[Kaya Thomas](https://twitter.com/kthomas901) covers iOS' UIAccessibility protocol and why accessibility is essential.

* **[WWDC Accessibility Videos](https://developer.apple.com/videos/frameworks/accessibility)**<br/>
Apple's WWDC sessions on accessibility are consistently great. Each year the standard accessibility talk gives a great overview of what you should be doing, and a few others going into more detail in some areas. You can watch all of them above, and there's also an extra talk on [localisation](https://developer.apple.com/videos/play/wwdc2019/403/).

* **[How to build an app for everyone: Novall Khan](https://vimeo.com/362163043)**<br/>
An overview of iOS' UIAccessibility protocol features from [Novall Khan](https://twitter.com/novallkhan). 

* **[Building Voice First Apps: Elaine Dias Batista](https://www.youtube.com/watch?v=H3EzG9vw1dw)**<br/>
[Elaine](https://twitter.com/elainedbatista) gives us an in depth look at making our iOS aps work with voice. Elaine covers both talking to our apps, and our apps talking to us.

* **[Writing Great Accessibility Labels](https://developer.apple.com/videos/play/wwdc2019/254/)**<br/>
This is my favorite talk from 2019's WWDC. Apple accessibility engineer [Jordyn Castor](https://twitter.com/jordyn2493) takes us through what makes a great accessibility label.

### Cross Platform

* **[Who's Design is it Anyway: Helen Joy](https://www.youtube.com/watch?v=Zi9ury3Setg)**<br/>
[Helen Joy](https://twitter.com/LittleHelli) is a UX consultant who works with UK government systems and has a great talk on remembering who you're creating software for.

* **[So you can Sleep at Night: Ethics in IT: Jonathan Rothwell & Steve Freeman](https://www.youtube.com/watch?v=xI5qEJ39KMc)**<br/>
An in-depth talk around ethics in software, contains no answers, just difficult questions.

* **[Empathy Reifies Disability Stigmas: Liz Jackson](https://vimeo.com/319388683)**<br/>
[Liz Jackson](https://twitter.com/elizejackson) gives us this passionate and thought-provoking talk about how empathy is often the wrong motivation for accessibility advocacy. 

* **[We're Better Than This: Paul hudson](https://www.youtube.com/watch?v=kxFGBpxVxMs)**<br/>
A eulogy for brogramming.


## Meetups

* **[Accessibility and Inclusive Design Meetup Groups](https://www.lireo.com/accessibility-inclusive-design-in-person-groups/)**<br/>
A big list of accessibility and inclusive design meetups throughout the world.

* **[London Accessibility Meetup](https://www.meetup.com/London-Accessibility-Meetup/)**<br/>
A monthly meetup in London covering all areas of accessibility. Usually includes a captioned livestream.

* **[Accessibility Nottingham](https://www.accessibilitynottingham.co.uk)**<br/>
A monthly meetup in Nottingham covering all areas of accessibility. Usually includes a captioned livestream.


## Twitter

* **[Mobile A11y Twitter](https://twitter.com/MobileA11y)**<br/>
The Mobile A11y Twitter account retweets mobile accessibility resources as well as updates from the site.

* **[Mobile A11y Following](https://twitter.com/mobilea11y/following)** <br/>
Check out the Mobile A11y Twitter account following for recommendations for good mobile accessibility tweeters.