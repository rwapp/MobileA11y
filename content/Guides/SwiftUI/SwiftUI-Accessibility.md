---
title: "SwiftUI Accessibility"
description: "Accessibility is important, but why is it important to think about it now when SwiftUI is so new? And what are the innovations that make SwiftUI such a great improvement?"
date: 2019-11-06T07:30:56Z
lastmod: 2019-11-06T07:30:56Z
tags:
- iOS
- SwiftUI
- Mobile
---

[Accessibility is important](https://medium.com/capital-one-tech/baking-digital-inclusion-accessibility-into-your-mobile-apps-f0f5d03d9f49). We can take that as a given. But as iOS devs we're not always sure how to make the most of the accessibility tools that Apple have provided us.

We're lucky as iOS developers that we work on such a forward-thinking accessibility platform. Many people consider Apple's focus on accessibility for iOS as the driver for other technology vendors to include accessibility features as standard. To the point that we now consider accessibility an expected part of any digital platform. This was not the case before 2009.

In [Shelly Brisbin's](https://twitter.com/shelly) fantastic audio documentary [36 Seconds that Changed Everything: How the iPhone Learned To Talk](https://www.36seconds.org) she outlines what it meant to blind and partially sighted people to be locked out of the early iPhones.

>I was sad because I felt, 'here's another time we're going to be left out'. Eventually, someone's going to make a special blindness-specific iDevice. It'll be three versions old. It'll cost four times as much, and we'll just keep buying it, cuz it's the only option that we have.
<div style="text-align: right">– Steve Sawczyn</div>

> For the first time in 20 years, Apple had built a product I couldn't use. I'm fairly sure I cried about that.
<div style="text-align: right">– Shelly Brisbin</div>

Being locked out is the reality for many of your customers if you don't consider accessibility right from the start. Accessibility in UIKit is indeed world-class, but it will only ever be an add-on.

This time around, with SwiftUI, Apple has taken the chance to re-think how some of their accessibility tools work for developers, and they've baked in accessibility right from the very beginning. Apple's accessibility teams have been an integral part of some of the decisions that have shaped SwiftUI. You can see this throughout your SwiftUI code. Like the way [images are now accessible by default](https://rwapp.co.uk/2019/09/11/SwiftUI-Images/). How [controls are now all linked to text names](https://rwapp.co.uk/2019/09/26/SwiftUI-Controls/). And how [dynamic type is now the default](https://rwapp.co.uk/2019/09/18/SwiftUI-dynamic-type/). This is exactly why I believe this guide to SwiftUI accessibility is important right now. Let's follow Apple's lead and make accessibility a first-class citizen in our apps.

The biggest change, that will make the most impact for your users requires no work from you at all aside from adopting SwiftUI. That is down to how SwiftUI generates its accessibility tree or [accessible user interface](https://rwapp.co.uk/2019/10/09/SwiftUI-AUI/). Meaning your assistive technology users will always get the experience you intended.

Tweaking your accessible experience is still possible in areas where your UI doesn't quite work for assistive technology users. Accessibility [attributes](https://rwapp.co.uk/2019/10/15/SwiftUI-attributes/) and [traits](https://rwapp.co.uk/2019/10/18/SwiftUI-Traits/) can still be set on every view in a way that should feel familiar from UIKit. But SwiftUI's improvements for setting the [accessibility sort priority](https://rwapp.co.uk/2019/10/02/SwiftUI-Sort-Priority/) and creating [semantic views](https://rwapp.co.uk/2019/10/29/SwiftUI-Semantic-Views/) make these techniques so simple there's really no reason not to use them.

Sometimes we make the mistake of thinking about accessibility as something for other people. But accessibility is all about customisation. We all like to make changes to our device to make it work better for us, like every developer's favourite: dark mode. So it's also essential to [listen to your customer's preferences](https://rwapp.co.uk/2019/10/27/SwiftUI-Settings/) for accessibility settings and decide how your app should respond. This will give all your customers the best possible experience.

I can't wait to start using your accessible SwiftUI apps. If you're unsure of the best way to improve accessibility for your app, feel free to [reach out](https://twitter.com/RobRWAPP).


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