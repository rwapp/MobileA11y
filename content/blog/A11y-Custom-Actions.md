---
title: "iOS Custom Accessibility Actions"
summary: Learn when and how to use iOS custom accessibility actions to reduce navigation noise for VoiceOver, Switch Control, and keyboard users — without hiding functionality.
date: 2021-08-01T07:30:56Z
lastmod: 2026-04-21T12:41:50Z
tags:
- iOS
- SwiftUI
- Blog
- custom actions
- accessibilityAction
---

When testing your app with an assistive technology such as VoiceOver or Switch Control, it is essential to check that you can focus on every interactive element on screen. If these assistive technologies can't focus all of your buttons how will your customers be able to interact fully with your app? Except there are specific instances when hiding buttons from your assistive technology users could be a better choice.

Consider an app with a list that has many repeating interactive elements - this could be a social media app where buttons for "like", "share", and "reply" are repeated for each post. Or perhaps an e-commerce app with "wishlist", "buy now", and "add to basket" are repeated for each item. Visually these buttons won't interrupt your users skimming the list of content, but for VoiceOver, Switch Control, or Keyboard Access users, they would have to visit each one for every item on the screen.

This has several downsides; firstly it means navigating your app takes a lot of effort, this is magnified for assistive technology users. Additionally it could make navigation confusing: If each item in the list has a "favorite" button as the last item in its navigation, it can be unclear for VoiceOver users if that will favorite the previous item or the next item.

To improve this, we can actually choose to hide these buttons from our assistive technology users, and in doing so make a better experience for them by turning them into an accessibility custom action. 

As an example, in the Reddit app, each post in a subreddit has multiple buttons in addition to the main action of opening the post. At time of writing, there are 9 buttons in total, including upvote and downvote, awards, and share. If we had to navigate each of these for every post, that's a lot of navigation.

![Reddit, VoiceOver is focused on a post](/images/reddit-list.PNG)

Instead, each post is a single element, and on activating that element we are taken to the post detail screen. But that doesn't mean the other actions are unavailable to assistive technology users. All other actions are added as custom accessibility actions.

Custom accessibility actions are available to VoiceOver with a vertical swipe. From Full Keyboard Access with Tab + Z, Voice Control by saying 'Show actions for {item}' and Switch Control on selecting an item.

## When to use Custom Accessibility Actions

Great, let's hide everything behind a single element then, right?

Before learning how to apply them we should take a moment to consider when we should apply this technique. Custom Accessibility Actions are powerful, but as noted, they are not easy to discover, and not all users will know this feature exists. Treat them as you would any other power-user shortcut: a faster path to actions that are reachable by another means.

Custom actions should rarely be the *only* way for a user to access an action. In the example of items in a list, such as Reddit, the multiple actions available as custom actions in the list should be available as individually focusable buttons on the detail screen.

A close analogy is that of swipe actions on a row in a list.

![Row actions in a list revealed by swiping.](/images/row-actions.png)

These actions are available by other means, but this gesture reveals a quick, hidden, way to achieve something in a clean way. In fact, *any* action in your app that is available via a swipe gesture should be added as a custom action.

## How to add Custom Accessibility Actions

Buttons are accessible by default, so the first step is to hide our button from assistive technology.

```Swift
Button("Favourite") {
    isFavorite.toggle()
}
.accessibilityHidden(true)
```

Next, we need to add our custom accessibility action. For each action, add an `accessibilityAction` modifier to the focusable view that will host the actions, most likely this will be the stack that contains the content of your list item. As with most SwiftUI modifiers, there are many options available that have specific uses. For the use case we're covering here you want `accessibilityAction(action: , label: )` - I'll cover why shortly.

For the action closure this should call the same code as the button it is replacing. While this may seem obvious, it is important to state, as diverging code paths can easily become out of date.

In the label closure add a `Text` with the same localised label as the button it is replacing, additionally include a single colour icon to represent your action - an SF Symbol is ideal. More on this below.

```Swift
HStack {
    // List row contents
}
.accessibilityAction {
    isFavorite.toggle()
} label: {
    Text("Favourite")
    Image(systemName: "heart")
}
```

### Why add an icon?

The reason we should pick the `accessibilityAction(action: , label: )` modifier that provides us with a view builder closure for the label is because this allows us to add an icon.

Icons are presented in the Switch Control menu when an item is activated. This provides a visual aid to help the user find the action. In the example below from Mail, you can see the 'Delete' action has been given a trash can icon an "More" has been given an ellipsis. "Mark As Unread", "Flag", and "Read Later" have no icons, so Switch Control is showing the first initial only. This gets confusing when more than one action has the same first initial.

![Switch Control presenting custom actions with icons.](/images/action-icon.png)

SF Symbols has thousands of user interface icons available, so adding an appropriate one of these to each of your custom actions should always be the default, falling back to the text label only if you can't find an icon that fits.

---

Custom Accessibility Actions can meaningfully reduce the effort required to use your app with VoiceOver, Switch Control, Full Keyboard Access, or Voice Control. A little extra work here goes a long way toward making your app feel like it was built for assistive technology users, not just made compatible with them. But use them thoughtfully. Hiding everything will have the opposite effect, making your interface confusing and frustrating.