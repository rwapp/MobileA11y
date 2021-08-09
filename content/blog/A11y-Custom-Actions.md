---
title: "iOS Custom Accessibility Actions"
description: "Sometimes hiding interactive elements from your assistive technology users gives them a better experience. Here's how to do it wile keeping your app accessible."
date: 2021-08-01T07:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
- Resources
---

When testing your app with VoiceOver or Switch Control, a common test is to ensure you can reach every interactive element on screen. If these assistive technologies can't focus all of your buttons how will your customers be able to interact fully with your app? Except there are times when hiding buttons from your assistive technology users is the better choice. Consider an app with a table view that has many repeating interactive elements - this could be a social media app where 'like, share, reply' etc is repeated for each post. Or perhaps an e-commerce app with 'wishlist, buy now, add to basket' are repeated for each item. Visually these buttons won't interrupt your users skimming the list of content, but for VoiceOver or Switch Control users, they will have to visit each one for every item on the screen. This is going to make navigating your app long and tedious, an means your users are more likely to drop out.

To improve this, we can actually choose to hide these buttons from our assistive technology users, and in doing so make a better experience for them by turning them into an accessibility custom action. Buttons are accessible by default, so the first step is to hide our button from assistive technology.

```
wishlistButton.isAccessibilityElement = false
```

Next, we need to provide an alternate way for VoiceOver and Switch Control to present our actions to our assistive technology users. UIKit provides us an API to do this with `accessibilityCustomActions`. By adding our action as an Accessibility Custom Action VoiceOver will now announce 'Actions available' and allow users to swipe vertically to hear the options, then double tap to activate one. Switch Control users are presented a menu of all the available options, with an optional image provided by us, this menu is only shown if the Switch Control user decides they want to activate the item.

![Switch Control presenting custom actions](/images/customactions.png)

To create our custom action we create a new `UIAccessibilityCustomAction` providing a name and optional image, and a block or selector to handle the action. Typically this will be the same code as would be executed if your user tapped the visual button. Your code should return true to let the assistive technology know the action has completed successfully, otherwise false.

```
let wishlist = UIAccessibilityCustomAction(name: "Add to Wishlist",
                                           image: UIImage(systemName: "wand.and.stars")) { _ in
    self.actions?.action(.wishlist)
    return true
}
```

Once we have created all of our actions we need to add them to the view that will present the actions to our user using the `accessibilityCustomActions` property. In the case of a table view this will be your UITableViewCell, but whichever view you use, the view must be accessible and have an accessibility label defined either explicitly with `accessibilityLabel` or implicitly through setting a visual text value on a standard UIKit control.

```
accessibilityCustomActions = [wishlist, basket, buyNow]
```

You can find my sample code on [github](https://github.com/rwapp/cell-button-actions). In the first example I haven't used custom actions meaning each button is navigated in turn. On the second example the buttons are hidden with custom actions added meaning much less navigation is required for assistive technology users.