---
title: "Test Your App's Accessibility with Evinced"
description: "Evinced releases a free accessibility scanner for your iOS apps."
date: 2021-03-24T07:30:56Z
tags:
- Mobile A11y Blog
- Blog
- Resources
---

> Disclosure: Evinced has paid for my time in writing this blog, and I have provided them feedback on the version of their tool reviewed and an early beta. I agreed to this because I believe in the product they are offering.

Testing your app for accessibility is an essential part of making an accessible app, as with any part of the software you build, if you don’t test it, how can you be sure it works? Because accessibility is human, there are no true shortcuts to this, a through manual test will always be the most productive form of accessibility testing possible. But with some carefully designed automated checks, you can detect common accessibility issues quicker and earlier. This makes fixing them easier, the chance of these errors reaching your customers is reduced, and it saves you valuable time for resolving more complex issues. It's not an easy problem to solve - I’ve tried with [A11yUITests](https://github.com/rwapp/A11yUITests), and Apple built their offering, [Accessibility Inspector](https://developer.apple.com/videos/play/wwdc2019/257/), right in to Xcode. Now a new tool has entered the arena from [Evinced](http://evinced.com), the iOS Accessibility Debugger.

![Evinced's iOS debugger highlighting a colour contrast failure](/images/evinced.png)

Evinced already produces an accessibility scanner tool for the [web](https://marcysutton.com/evinced-automated-accessibility-testing), and now they have decided to turn their expertise to mobile. Their initial offering for [iOS](https://www.evinced.com/products/flow-analyzer-mobile) is available for free for any developer to add to their workflow. So if you're looking to take a positive step towards making a more accessible app, this tool is a no-brainer.

## The Tool

[Installation](https://www.evinced.com/products/flow-analyzer-mobile/product-documentation/ios-connection) is through [cocoapods](https://cocoapods.org), and while there are a few steps, if you're familiar with including a cocoapod library the process should be straightforward. Once you've installed the library, build your app to a test device. Your app’s results are presented in a companion app for Mac or PC. Pairing your iOS app to the companion is achieved painlessly through scanning a QR code, and you’re ready to start checking your app’s accessibility.

![Evinced's iOS debugger's scan, clear and QR code pair buttons](/images/evinced-buttons.png)

In your iOS app, navigate to the screen you want to audit, and in the Evinced desktop app hit the "Scan" button. After a brief pause you'll see a screenshot of your app appear in the debugger with accessibility violations highlighted and labeled. The list of scan results provides a summary of the failure and a hint on how to fix it. Also included is a link to a more detailed [knowledge base](https://knowledge.evinced.com/mobile-validations/color-contrast) article covering what the violation is, who it may affect, and code samples to fix the issue. Followed by links to the relevant [WCAG](https://www.w3.org/TR/WCAG21/) guideline.

![Evinced iOS debugger highlighting a tappable area failure](/images/evinced-result.png)

Evinced’s tool can currently detect missing traits, missing accessibility labels, invalid accessibility labels, insufficient colour contrast for text against the background, small hit targets, and interactive elements that are not accessible to assistive technologies. Validations on Evinced’s roadmap include highlighting elements that are accessible to assistive tech but not visible on screen, focus order when this differs from visual order, and conflicting hit targets. Sharing reports is simple too. You can export each screen and it's failures, along with screenshots highlighting them, in a single HTML file, allowing you to easily spread the knowledge across your team.

## Fitting Evinced into Your Workflow

Knowing how to use a tool like Evinced is important. It can't, and shouldn't, replace manual accessibility testing with assistive technologies enabled. Neither should it replace user testing with a diverse group of participants. It's essential that you don't assume your app will be compliant, or indeed even usable, by virtue of running Evinced's scanner. Where Evinced can help is by catching potential issues earlier in the development cycle. Developers can run a scan on a screen quickly and simply to find potential issues in how a screen is built before progressing a ticket. QA engineers can use the results as a way of identifying common errors faster than with manual testing. But because accessibility is about humans, that human interaction with the software still needs to happen to be sure your app is accessible.

This is a promising contribution to the accessibility tool space for mobile. This is Evinced's initial release, but in my testing their tool is already comparable with Apple's own Accessibility Inspector, with Accessibility Inspector beating Evinced only on detecting Dynamic Type support. Evinced have received backing from some [big names](https://www.prnewswire.com/news-releases/evinced-raises-17m-announces-series-a-to-launch-enterprise-digital-accessibility-platform-for-software-development-teams-301220961.html), so future development is promising for where this tool can go. As well as making the tool free, Evinced have also [open sourced](https://github.com/GetEvinced/ios-sdk) the SDK under the MIT licence opening the door for community contributions to their rules engine.

To get started with [Evinced's](https://www.evinced.com) free [iOS Accessibility Debugger](https://www.evinced.com/products/flow-analyzer-mobile) register for an account at [Evinced.com](https://www.evinced.com/)