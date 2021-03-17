---
title: "Accessibility Review: Huh? - International languages"
description: "Huh? lets users look up words in dictionaries for various languages. Some additional hints for non-local languages would give a richer experience for VoiceOver users."
date: 2020-06-28T07:30:56Z
tags:
- Accessibility Review
---

The [Accessibility Review series](/tags/accessibility-review/) uses real world apps to provide examples of common accessibility issues and provide tips on how to fix them. Each of the developers has kindly volunteered their app to be tested.

[Huh?](https://apps.apple.com/app/id1330097506) is a dictionary and thesaurus app from [Peter Yaacoub](https://twitter.com/yaapete). Enter a word into the search bar then choose a dictionary service. Press search and the app will present your chosen service’s entry for the term you entered.

![Huh app](/images/huh-english.PNG)

What makes this app stand out is its ability to look up words in various languages. The app features services for Arabic, Spanish, Italian and several others. Change the app’s search language and to immerse you in the experience, the app’s buttons also change.

![Huh app in German](/images/huh-german.PNG)
![Huh app in Italian](/images/huh-italian.PNG)

We have a visual clue to the language for these buttons by the flag displayed. But VoiceOver cannot pick up on this clue. Instead, VoiceOver will attempt at the pronunciation of the word using the user's local language. This has mixed results.


## VoiceOver Attributes

A more immersive experience would be to use attributed strings to tell VoiceOver which language to use. This means VoiceOver will use the appropriate languages pronunciation rules and voice when it reaches the button.

The code below sets the ‘Language’ button to the equivalent Portuguese word and tells VoiceOver to always read it as Portuguese, rather than attempting it in the user’s local language.

```
let buttonTitle = NSAttributedString(string: "Idioma", attributes: [.accessibilitySpeechLanguage: "pt-PT"])
button.setAttributedTitle(buttonTitle, for: .normal)
```

This code change is all about giving an equivalent experience. Any VoiceOver users will likely understand what the app means when it makes a local attempt at the word, but we’d rather learn a language from a native speaker than a tourist with half-remembered highschool language lessons. While making no change here would still be accessible, it’s not inclusive.