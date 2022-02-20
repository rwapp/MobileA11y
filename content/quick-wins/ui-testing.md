---
title: "Quick Win - Start UI Testing"
description: "Any well written Espresso or XCUI test can be an accessibility test."
date: 2021-02-03T07:30:56Z
tags:
- iOS
- Android
- Mobile
- Mobile A11y Blog
- Blog
- Quick Win
---
I'll admit, adding UI testing to an app that currently doesn't have it included is probably stretching the definition of quick win, but the aim here isn't 100% coverage - not right away anyway. Start small and add to your test suite as you gain confidence. Even a small suite of crucial happy-path UI tests will help to ensure and persist accessibility in your app. And the more you get comfortable with UI tests the more accessible your apps will become, because an app that is easy to test is also great for accessibility.

## iOS

XCUI tests are great for accessibility because thats exactly what they're testing. The tests need something machine-readable to understand what is present on screen - something else that needs something machine-readable to understand the screen is assistive technologies. So XCUI reads the accessibility tree, the hierarchy of metadata and labels that represent to assistive technology what is on screen. This means the easier your app is to UI test, the more robust the accessibility experience is. In short - any XCUI test is an accessibility test.

[Paul Hudson](https://twitter.com/twostraws) provides this great tutorial on getting started with [testing your user interface](https://www.hackingwithswift.com/articles/83/how-to-test-your-user-interface-using-xcode) and a [cheat sheet](https://www.hackingwithswift.com/articles/148/xcode-ui-testing-cheat-sheet) for when you want to go a little further.
One caveat for ensuring your tests are checking accessibility - Referencing elements by index or identifier can make finding elements on screen easier, plus it means your tests can be robust when testing in different languages. But once you have found the element, be sure to check the label when you can, this ensures you are actually presenting the string you think you are.

If you want to turbo-charge your XCUI accessibility testing I have a library available to add [accessibility tests](https://github.com/rwapp/A11yUITests) and a detailed blog on [XCUITests for accessibility](https://mobilea11y.com/guides/xcui/).

## Android

Android's Espresso testing framework from Google has a Google provided extension to add [accessibility checks](https://developer.android.com/training/testing/espresso/accessibility-checking) to your existing UI tests. Once you have written an espresso test, import `androidx.test.espresso.accessibility.AccessibilityChecks` and call `AccessibilityChecks.enable()` at the start of your test. As your test runs espresso will automatically check the accessibility of your app and report what it finds with no extra work needed from you.

To get started writing espresso tests for your app [Victoria Gonda](https://twitter.com/ttgonda) has this awesome [getting started guide](https://www.raywenderlich.com/949489-espresso-testing-and-screen-robots-getting-started).
