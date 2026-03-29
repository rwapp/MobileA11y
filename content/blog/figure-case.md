---
title: "Accessibility Review: Figure Case - Button Labels"
description: "Figure Case helps organising a table-top miniature collection. Some VoiceOver users might might be struggle to know what actions some buttons perform."
date: 2020-06-21T07:30:56Z
lastmod: 2020-06-21T07:30:56Z
tags:
- Accessibility Review
---

The [Accessibility Review series](/tags/accessibility-review/) uses real world apps to provide examples of common accessibility issues and provide tips on how to fix them. Each of the developers has kindly volunteered their app to be tested.

[Figure Case](https://apps.apple.com/us/app/figure-case/id1487460834) is an app to help organise a tabletop miniature collection created by [Simon Nickel](https://twitter.com/simonnickel). The app helps to track miniatures you own, and what state they currently find themselves in - unassembled, assembled, or painted.

The basic flow of this process is straightforward, tap a + button to add a new unassembled model. Once it’s assembled tap the downward arrow to move into the assembled count. Repeat this once you’ve painted the model. Tapping each of these buttons adjusts the total numbers and graph bar as appropriate. Assessing the app I noticed that VoiceOver users may not be clear what will happen when they activate these buttons.

This happens because the buttons have no text value and are icons only. This means that for anyone who can’t see the layout of the screen and imply what this button means from the visual clues, they won’t know what this button does.

![Down button showing VoiceOver's caption 'chevron.down.circle.fill'](/images/figurecase-button.png)

This can be fixed with a single line of code by adding an accessibility label to each button, something like this:

```
button.accessibilityLabel = "Move 1 model to painted"
```

The fix may be simple, but for VoiceOver users, it instantly disambiguates the purpose of each button. It provides the information needed on what action each performs and sets an expectation that something on the screen will change.

To improve the experience further, consider adding accessibility hints or accessibility notifications. These tools could create a richer experience or might add noise. As with all accessibility improvements, I recommend you test changes where possible with real VoiceOver users to see what labels make the most sense here.