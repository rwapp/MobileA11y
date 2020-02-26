---
title: "Android Live Regions"
description: "A one line addition makes a massive difference to dynamic screens in Android."
date: 2020-02-11T07:30:56Z
tags:
- Android
- Blog
- Mobile A11y Blog
- Mobile
---

Live Regions are one of my favourite accessibility features on Android. They're a super simple solution to a common accessibility problem that people with visual impairments can stumble across.

Say you have a game app, really any type of game. Your user interacts with the play area, and as they do, their score increases or decreases depending on your customer's actions. In this example, the score display is separate to the element your customer is interacting with. For a blind or partially sighted user, how will they know their interaction has had a consequence against their score?

In steps Live Regions. A Live Region is an element of your interface that will automatically announce it's content through TalkBack whenever that content changes. This means you can up update your score and your TalkBack users will know without having to navigate to the scoreboard.

Take this really simple game I've made. The aim is to score 1,000 points. Handily there's a button that will award you 1,000 points. To activate this button, a TalkBack user must navigate to the button, activate it, then navigate to the score area to know if the score updated.

![TalkBack focused on a button with the label "Press this button for 1,000 points"](/images/live-region-button.png)

![TalkBack focused on a score of 1,000 points](/images/live-region-score.png)

If we make the score TextView element a Live Region, there's no need for this extra swipe. Once we update the score, TalkBack will read it right away.

![TalkBack focused on a button with the label "Press this button for 1,000 points." TalkBack is reading the score of 1,000 points](/images/live-region-region.png)

So how do we take advantage of this advanced technique? It must take a ton of coding to achieve this, right? Well, ready?

```XML
<TextView
	…
android:accessibilityLiveRegion="polite" />
```

Or if you're setting it dynamically in Kotlin:

```Kotlin
score.accessibilityLiveRegion = View.ACCESSIBILITY_LIVE_REGION_POLITE
```

That's it. Android and TalkBack do the rest for you.

## Use Live Regions Wisely

Live Regions are a powerful tool, but it's essential to know when and where to use them. Using them unnecessarily will add noise to your interface and make it confusing. More than one per screen seems unnecessary to me, and most screens shouldn't have any at all. Any area that updates a lot, such as a timer, really shouldn't be marked as a Live Region.

## Be Polite

You'll notice in the example code above, they include the word `polite`. As a rule, this is the option you'll use. This means TalkBack will wait to complete any current utterances before speaking the new Live Region value.

The alternative is `assertive`. Assertive will interrupt any current utterances. Use this only if absolutely necessary as interrupting content can be confusing and frustrating.

Live Regions are a potent tool when used in the right situations, and all it needs from you is one line of code. Consider where you can take your app's accessibility to the next level with this technique.