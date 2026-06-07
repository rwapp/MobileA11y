---
title: "Should I add a dyslexia-friendly font to my app?"
summary: "Many high-quality indie apps support dyslexia-friendly fonts as a customisation. Should you follow their lead? Well... probably not."
date: 2026-06-07T07:30:56Z
tags:
- fonts
- typography
---
There is an accessibility trend amongst some of the highest quality indie iOS apps available at the moment, the excellent [The Art of Fauna](https://theartof.app/fauna/) has it, as does [Day One](https://dayoneapp.com). It's such a strong signal of a high-quality, lovingly-crafted app, that I can be pretty certain that if the app is well made, I can visit the settings screen and find this option. Exactly as I found recently with concert tracking app [Gigs](https://www.nowplaying.co/gigs).

The feature is providing support for dyslexia-friendly fonts such as [OpenDyslexic](https://opendyslexic.org), [Dyslexie](https://dyslexiefont.com), Comic Sans, and others.

As a result I am commonly asked by other indie devs if they should implement dyslexia-friendly fonts in their app. The answer is "probably not" - or more bluntly "There are much more impactful accessibility considerations you can spend your time on." Even if supporting users with dyslexia is important to you, there are still far more impactful choices you can make.

## Supporting users with dyslexia

Firstly, there is no evidence that "dyslexia-friendly" fonts are any better for dyslexic, or non-dyslexic, readers. [This long-running post](https://adrianroselli.com/2015/03/typefaces-for-dyslexia.html) from accessibility expert Adrian Roselli documents much of the (lack of) evidence for such typefaces. Indeed, there is some evidence that they perform [far worse](https://pimpmytype.com/dyslexia-fonts/). So if you're looking to support dyslexic users of your app, these fonts are not it.

So what can we do to provide a better experience for dyslexic users? Well, the same things you can do to make text easily readable by anyone, from [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation):

* Width is no more than 80 characters or glyphs.
* Text is not justified (aligned to both the left and the right margins).
* Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing.
* Text can be resized... in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.
* Foreground and background colors can be selected by the user.

Additionally:
* Text must have a contrast ratio of at least [4.5:1](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) against surrounding colours.
* Avoid [idioms, jargon](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words), and [abbreviations](https://www.w3.org/WAI/WCAG22/Understanding/abbreviations), or provide a way for users to learn what they mean.
* Aim to write copy to be understandable at a [lower secondary education level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level).

Picking a sans serif font, avoiding italics, and generous letter spacing are also often beneficial.

## Supporting font customisation

The authors of the above mentioned apps are providing value for users - a core tenet of accessibility is customisation, and allowing users to switch to a font that serves them better is a great option. Some users do report that they have a preference for "dyslexia-friendly" fonts and find it helps their reading, regardless of what the statistics say. But if you do support font switching, the real value is allowing users to swap to a font that is more familiar to them, has [looser spacing, open shapes, and distinct letters](https://pimpmytype.com/dyslexia-fonts/). [One study](https://www.youtube.com/watch?v=h8IOqUl1zII) which tested a range of fonts found that the default iOS font, SF Pro, was the best performing option, for both users with and without dyslexia. Closely followed by Microsoft's Segoe and Verdana, Android's default Roboto, and Atkinson Hyperlegible.

So the real value in font switching is when your app uses custom fonts. Such fonts might look great in your design, but they are almost guaranteed to be less legible for all of your users. Allowing users to switch these to the default system font is a must - and if you've built a flexible layout that supports text scaling well, this shouldn't cause you any issues. If you're building this feature, then why not drop in a few other options? [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible?preview.script=Latn) and [Roboto](https://fonts.google.com/specimen/Roboto) are both available under a licence that allows you to use them in this way without payment. And if you've done that, then why not throw in a "dyslexia-friendly" font for added customisation - but this should be your final consideration, not your first.

## "Dyslexia-friendly" fonts should be your last choice

Check your copy is easily understandable, your UI supports text scaling, and your contrast is high. All of these will have a much bigger impact for users with dyslexia than a specialist font, but also for users with other needs, or no specific needs.

If you've checked off all of those, then add an option to remove your custom fonts. Then spend your time checking your app with all the assistive technologies your platform supports, check your animations and videos don't trigger dizziness or epilepsy and are pausable, your audio can be controlled separately, and speech audio has captions. Ensure your app doesn't have time limits or requirements, nothing requires complex gestures, your design is consistent, and you're correctly identifying and preventing user error. Test your app with real assistive technology users and add the ability for users to provide accessibility feedback. Only once you have completed all of the above list should you then consider adding a "dyslexia-friendly" font.