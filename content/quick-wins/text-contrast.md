---
title: "Quick Win - Text Contrast"
description: "Is the text in your app clear enough for everyone to read it?"
date: 2021-01-19T07:30:56Z
lastmod: 2021-01-19T07:30:56Z
tags:
- iOS
- Android
- Mobile
- Mobile A11y Blog
- Blog
- Quick Win
---
How many shades of grey do you use in your app? OK, maybe thats a bit cruel towards designers, grey is a great colour, but the problem with grey is that it can be deceptively difficult to distinguish from a background. And this problem is not just limited to greys - lighter colours too can blend into the background. This effect can be heightened too for people who have blurred or obscured vision, or one of many forms of colour blindness.

The [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/) is the guide that details what works and what doesn't for digital accessibility. Written by a range of experts and users with various abilities and based on loads of user testing and research, its your go-to guide for making accessible experiences. More than that, WCAG is also the basis of accessibility laws and regulations in many jurisdictions.

The WCAG rule for text colour contrast is [4.5:1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html). There are some exceptions to this rule, but this means any contrast greater or equal to 4.5:1 should be easy to read for all of your users. In grey terms, this means nothing lighter than #767676 for text presented on white. But ideally aim for higher than 4.5:1 if you can.

To check your app's contrast take a look at your pallette and think about any combinations you use for text and backgrounds. The next step is to calculate the contrast between them, fortunately there are a ton of tools to do this for you. I suggest using the [Paciello Group's](https://www.paciellogroup.com) [Colour Contrast Analyser](https://developer.paciellogroup.com/resources/contrastanalyser/). Its a free cross-platform app that has a range of options for entering your colour combinations, including an eye-dropper tool if you don't have your pallette to hand. Always use the actual colour values if you can, its just more accurate.

![Colour Contrast Analyser showing passing contrast](/images/cca76.png)

The app will tell you exactly where your combination can and can't be used. The big one is the first icon you see - "1.46 Contrast (Minimum) (AA) - regular text". If this icon is red, you need to change your colours. If this is green and some others are red, you're kinda ok, but you might want to consider improvement.

![Colour Contrast Analyser showing failing contrast](/images/cca888.png)

The fix here you've probably already guessed. You need to change your background colour or the text colour - or both - to meet that 4.5:1 threshold. Making this change will not just help your customers with vision impairments, but will make your app easier to read at a glance for everyone.