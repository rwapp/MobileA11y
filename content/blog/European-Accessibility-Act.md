---
title: What The European Accessibility Act (Might) Mean for Mobile Development
date: 2019-06-24T07:32:16Z
description: "European Accessibility Act is the first accessibility legislation that I’m aware of, anywhere, that explicitly covers mobile apps."
slug: "European Accessibility Act"
tags: ["Accessibility", "Regulation"]
---

The [European Accessibility Act](https://ec.europa.eu/social/main.jsp?catId=1202#navItem-1), or EAA is due to become law in Europe later this year, and it defines some specific requirements for mobile. In fact, its the first accessibility legislation that I’m aware of, anywhere, that explicitly covers mobile apps.

---

Since 2012 the European Union has been working on standardising accessibility legislation across Europe. The ultimate aim is to both improve the experience for those who need to use assistive technology, but also to simplify the rules business need to follow on accessibility. The years of discussions and consultations has lead to the European Accessibility Act, written in 2018, which covers a range of requirements for, amongst other channels, mobile.
While the EAA doesn’t blanket cover every category of app, the net is pretty broad. The act covers any apps sold or in use within the European Union that fall into these categories, so even if you’re not part of the Euro Zone if your app is available on an app store any country that is, the act applies to you. So, if you’re in the business of making mobile interactions, you’ll need to be prepared. Fortunately, both Apple and Android provide many of the tools required to conform to the law at a system level, meaning you’ll likely be a long way towards complying already.
As with any new law, until tested in the courts, it is somewhat open to interpretation. Also, I’m not a lawyer, I’m a mobile developer with a keen focus on accessibility, so this post makes up my personal thoughts about how I would try to comply with the law and will undoubtedly contain factual inaccuracies. I’ve not included everything but focussed on the areas I think are most useful to mobile developers. If you believe this new legislation may regulate your app, I’d highly recommend reading the act through yourself, and of course, you’ll need to get some legitimate legal advice.
## Apps Types Covered
The EAA specifically covers mobile apps in certain areas, while this doesn’t cover all apps, it’s safe to say these categories make up a significant section of mobile apps available.
### Transport
Any app related to publicly available transport including air, bus, rail and ‘waterborne’ transport. The act doesn’t specify taxis or ride sharing specifically, but arguably they could be included under the definition of ‘passenger transport services’
### Banking
Any app that provides banking services — the language for this category uses the phrase ‘banking services’ specifically, suggesting the EU would apply this rule not only to banks themselves but more broadly to apps that use open banking to access other accounts or other banking related services.
### e-commerce
Any app that allows for digitally purchasing either digital or physical goods or services. This clause will be the one that covers the majority of apps, and the requirements here are not as detailed as the more specific domains above.
## Requirements for All Apps & Websites
### Alternatives to Non-Text Content
If you present content in video form, make sure your video features subtitles or closed captioning, provide a transcript for any content presented in video or audio format. If you present text content in an image or as part of a video, add an accessibility label or subtitles that can be read by a screen reader.
# Make Content Available to Screen Readers
This requirement covers two points from the act. Firstly:
> Information content shall be available in text formats that can be used to generate alternative assistive formats to be presented in different ways by the users and via more than one sensory channel.

Also:

> consistently … [present content] in a way which facilitates interoperability with a variety of user agents and assistive technologies.

My understanding of these paragraphs is that any text-based content should be accessible to screen readers ([VoiceOver](https://www.apple.com/accessibility/iphone/vision/) and [TalkBack](https://support.google.com/accessibility/android/answer/6283677?hl=en)). Screen reader users make up by far the most significant constituency of assistive technology users. Also, both OSes also use the same techniques they use to support screen readers to allow support for other assistive technologies, so get screen readers right, and you’ll find other assistive technology will work well too.
For the most part, both Android & iOS built-in screen readers will do a great job of making the text available for the user, even making guesses at text included in images where needed. However, at times it can be easy to cause unexpected behaviour from screen readers — from elements being out of order to elements being missed entirely or read when not present on the screen. The best way to see if you need to make any changes here is to test with your devices screen reader enabled.
## Requirements for Transport & Banking Apps & Websites
### Flexible Magnification
It is unclear from the act whether magnification applies to simple screen magnification or to allowing magnification of text sizes. I suspect it would be relatively simple to argue that screen magnification fulfils this requirement if you’re looking to satisfy the minimum needed by the law. Screen magnification, however, isn’t a great experience for your customer, as it cuts context and reduces discoverability, so I’d highly recommend supporting dynamic text sizes regardless of the true meaning of the law.
Screen magnification is a system feature available on both platforms (Android, iOS) that requires no developer changes. Dynamic text sizes, however, need a little more consideration. It’s worth giving some UX thought to how a screen will look and function when the screen appears with the largest text, you will at times need to make decisions on compromises to design with accessibility text sizes.
iOS Developers will need to adopt the use of iOS’ built-in text styles and use the adjustsFontForContentSizeCategory property for each content label.
For Android, you should use SP sizes for text that scale from your standard size to match your customer’s device settings.
### Flexible Contrast
In regular use, your text to background contrast ratio should be [4.5:1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) for most text. With this setting enabled, you should look to have a contrast ratio of [7:1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html), so this might require some UX decisions as to what colours to use.
iOS provides an accessibility setting to [increase contrast](https://support.apple.com/en-gb/guide/iphone/iph3e2e1fb0/ios), as a developer, you can listen to `UIAccessibility.isDarkerSystemColorsEnabled` to see if you need to make UI changes based on this setting. I’d also highly recommend listening to `UIAccessibility.isReduceTransparencyEnabled` if you’re making use of transparency or blur in your app, and if the user has this setting enabled, be sure to provide an alternative. The alternative doesn’t have to be a solid colour, a reduced alpha or increased blur may be enough. A technique Apple make use of on SpringBoard is to use a solid colour that has a tint of the colour underneath.

![Springboard](/images/springboard.png)
iOS SpringBoard with standard settings

![Springboard](/images/springboardreduced.png)
iOS SpringBoard with reduced transparency enabled
Android does provide a High Contrast Text accessibility setting, but unfortunately provides no developer documentation regarding what this does, or how developers can leverage it, so this may require a setting within your app to increase contrast.
### Alternative Colour
Alternative colour is potentially the caveat that may need the most work to conform to; this probably needs someone more skilled than me in reading legislation to precisely know what this clause means.
It’s possible that the customer’s device’s built-in colour filters will fulfil this requirement, as inverting colours (Android, iOS), switching to greyscale, or adding a filter (Android, iOS) to the screen would have this effect. However, it could mean that you are expected to allow a setting for your customers to change your main body text colour. I’m not aware of a system framework on either platform to allow for simple switching of body text colours in this way, so may require some global skinning work for your app, and possibly some UX decisions.
The text says only ‘provide for an alternative colour to convey information,’ I’ll let you draw your own conclusion as to which option would allow your app to fulfil the requirement.
### Alternative to Fine Motor Control
Both iOS and Android support control by external switch devices, or by using the device’s screen or buttons as a switch. Providing your app works as expected with screen readers, you’ll probably find switch control works fine, but it’s worth testing with this enabled.
