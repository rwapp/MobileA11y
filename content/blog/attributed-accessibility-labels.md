---
title: "iOS Attributed Accessibility Labels"
description: "Creating a next-level experience for your assistive technology customers with attributed accessibility labels"
date: 2020-05-03T10:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
---

Attributed accessibility labels are an incredible tool for making some next-level accessible experiences. They let you tell VoiceOver not just what to speak, but how to say it too.

Using the `accessibilityAttributedLabel` property you can provide an `NSAttributedString` to VoiceOver, much the same way you would provide an `NSAttributedString` to a label's `attributedText` property to display a string with an underline or character colour for example. The difference here is that all of our attributes are instructions for VoiceOver.

In the below example, we're adding a pitch change to the word 'best' where in displayed text we might add a bold attribute to add emphasis. This means that your VoiceOver users will get a comparable experience to sighted users rather than a cut down one. This is the ultimate aim of digital accessibility. Create a comparable, inclusive interaction with your users, regardless of their abilities. Always ensure your text is localised and perform proper range calculations in your code, rather than hard coding everything as I am in this example.

```
let attributedString = NSMutableAttributedString(string: "This
is the best app on the App Store!")


let range = NSRange(location: 12, length: 4) 
attributedString.addAttributes([. accessibilitySpeechPitch: 1.5], range: range)
appDescription?.accessibilityAttributedLabel = attributedString
```

Much like visual `NSAttributedString`s, there are several attributes to pick from to get the effect you're aiming for.

## Language

This attribute allows you to be explicit about the language VoiceOver uses to read a string. This is useful if you have multiple languages in your app. The attribute takes an argument representing the language you want VoiceOver to use in the [BCP47 format](http://www.rfc-editor.org/rfc/bcp/bcp47.txt) such as this example for Latin American Spanish `[.accessibilitySpeechLanguage: "es-419"]`.

## Spell Out

Spelling out the text is the ideal solution to the reference number problem we discussed in the [previous post](/blog/writing-great-labels/#not-just-for-voiceover). This attribute lets you keep a neat visual string of '1234', but when marked with `[.accessibilitySpeechSpellOut: true]` this is read by VoiceOver as '1 2 3 4'.

## Phonetic Notation

You can use phonetic Notation to give VoiceOver exact instructions about how it should pronounce a word. VoiceOver's pronunciation is not always perfect, and while this is usually still understandable by your customer, there are instances where you might want to be more prescriptive. Your brand name is a great example of this, as VoiceOver may not read this exactly as your brand expects.

Words you use commonly in your app that have a specific domain meaning are another great use. For example, VoiceOver can't pronounce the word 'expiry' correctly. In the UK this word is used on credit cards as 'expiration' would be in the US. Meaning any app in the UK handling credit card data should probably use this technique to ensure customers understand what data they need to enter in a form.

Homonyms are another good example. In the [BBC Sounds](https://apps.apple.com/gb/app/bbc-sounds/id1380676511) app, users are offered the opportunity to listen to 'live radio'. unfortunately, VoiceOver appears to be instructing the user to 'liv radio'. This can be fixed using the `.accessibilitySpeechIPANotation` attribute and providing an IPA string, such as this example:

```
liveRadio.accessibilityAttributedLabel = NSMutableAttributedString(string: "[līv] radio", attributes: [.accessibilitySpeechIPANotation: true])
```

## Punctuation

This attribute allows us to tell VoiceOver to read all punctuation. This can be useful if your app features code or some other technical notation. Be sure to apply `[.accessibilitySpeechPunctuation: true]` only to the range that contains your code, otherwise listening to the result will take a while.

## Sources

* [Daniel Devesa](https://twitter.com/dadederk) [Developing Accessible iOS Apps: Support VoiceOver, Dynamic Type, and More](https://amzn.to/2WkLNkt)
* [Rob Whitaker](https://twitter.com/RobRWAPP) [Developing Inclusive Mobile Apps: Building Accessible Apps for iOS and Android](https://amzn.to/2KSDmaz)

## Next up

This is the last article in the series of posts about iOS' accessibility labels, so the next step is to go ahead and make some incredible accessible apps!

* [iOS Accessibility Labels](/blog/ios-accessibility-labels/)
* [When to use Accessibility Labels](/blog/when-to-use-accessibility-labels/)
* [Writing Great iOS Accessibility Labels](/blog/writing-great-labels/)
* [iOS Attributed Accessibility Labels](/blog/attributed-accessibility-labels/)