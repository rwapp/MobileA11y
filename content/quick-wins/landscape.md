---
title: "Quick Win - Support Landscape"
description: "Landscape orientation is enabled by default when you start a new app, so don't take this accessibility feature away from your users."
date: 2021-01-28T07:30:56Z
tags:
- iOS
- Android
- Mobile
- Mobile A11y Blog
- Blog
- Quick Win
---
If you have a regulatory requirement to provide accessibility in your app (spoiler, you do) the chances are it will say you have a requirement to reach [WCAG AA](https://www.w3.org/TR/WCAG21/). While this is likely meaningless to anyone other an accessibility professionals, in short it means you are providing the minimum level of accessibility features required to make your app usable by the majority of people.

This post is about one such requirement, the jazzily titled [Success Criterion 1.3.4](https://www.w3.org/WAI/WCAG21/Understanding/orientation.html). 1.3.4 is often overlooked, I've see it forgotten by accessibility auditors, overlooked by testers, removed by engineers, and ignored by designers. Yet this feature is one that is already enabled by default in your app. One that you have to choose to disable. For both Android and iOS when you create a new app, the app supports landscape mode out of the box, and all you need to do to continue supporting it is to build robust interfaces, and not disable it. Yet often one of the first things developers do when creating a new app is to disable landscape modes.

I get it, most apps probably do work and look best in portrait, and the majority of your users probably will never want to use landscape. But accessibility is about providing the flexibility for your customers to use your software the way that is most comfortable for them, not the way you're forcing them to because it makes your development work easier.

Landscape allows more characters per line, ideal for larger text sizes. It makes on screen keyboards bigger meaning the keys are easier to see and easier to hit. Some users may have their device locked or secured in position, such as a wheelchair mount, or a stand for if the user can't easily hold or manually manipulate their device. All these categories of people will appreciate you leaving this default option available to them.

So next time you start an app, don't disable landscape. And if you have already disabled it, consider re-enabling landscape orientations by checking these settings.

In Android check your activities don't include the following property.
```
android:screenOrientation="portrait"
```

For iOS check your app target's general settings and ensure the landscape checkboxes are enabled.

![Xcode checkboxes for device orientation.](/images/LandscapeCheckbox.png)

If your app wasn't built with landscape in mind it's now worth checking your app's screens in a landscape orientation. If your interfaces were built in a robust manner using the correct constraints, stacks and layouts then your app should just work. But you might find some components that need a little updating so they know how to correctly display in this new orientation. Check for overlapping elements, or elements that haven't expanded as far as they should.