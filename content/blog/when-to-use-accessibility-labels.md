---
title: "When to use Accessibility Labels"
description: "When to, and when not to, set your own accessibility labels."
date: 2020-05-03T08:30:56Z
lastmod: 2020-05-03T08:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
---

There's a few circumstances when you'll want to set your own accessibility label, such as... 

1. An interactive element that you haven't given a `text` value to, such as an image button. 
2. An interactive element with a long visual label. 
3. An interactive element with a short visual label that takes context from your design. 
4. A control or view you have created yourself or built by combining elements.
5. Images of text.

### Elements Without a text value

Take the controls for a music player as an example. Below is a screenshot of the controls for [Spotify's](https://apps.apple.com/gb/app/spotify-new-music-and-podcasts/id324684580) music player, each icon is a button. They’re all visual, but not text. As they’re buttons they’re all available to assistive technology but without a text value, assistive technologies would not know how to present each button to your user. VoiceOver would likely read each as ‘button’ giving no indication what each button does. Voice Control users would have to refer to each button by a number based on the order it appears on the screen.

![Play controls for Spotify](/images/PlayerControls.jpeg)

Instead, Spotify add accessibility labels to each of these buttons, you can see these labels below. Each label is short and tells our user exactly what will happen if they activate it.

![Play controls for Spotify showing accessibility labels](/images/PlayerControlsLabels.jpeg)

### Elements with a long label

Sometimes your buttons, or other interactive elements, will have really long labels. Take this example from [Bear](https://apps.apple.com/gb/app/bear/id1016366447). This is a table cell which is fully tappable - see in this image VoiceOver highlights the whole cell.

![Bear's notes list](/images/CellButton.PNG)

The cell features the note’s title and a couple of lines of the note’s content. That’s a lot of content to listen to VoiceOver read or to say to Voice Control. So instead of using the whole text on the cell, Bear set the cell’s accessibility label to just the title of the note. Additionally, the cell features the time elapsed since this note was edited, this is the first piece of text visually, but it's not the most important. So Bear have moved this information to the end of the accessibility label.

![Bear's notes list showing accessibility labels](/images/CellLabel.PNG)


This makes navigation simpler and faster, importantly without losing context. Use this technique thoughtfully, removing content can lead to a worse experience, so to make sure you get the best result, test this with regular VoiceOver users.

### Elements requiring extra context

Take a shopping app as an example. Say the screen has a table of search results and each row has an ‘add to basket’ button. When swiping through the list, how would someone who can’t see the layout of the screen know what the ‘add to basket’ button applies to? It could be for the previous title VoiceOver read, or it could be for the next one. Setting the accessibility label of the ‘add to basket’ button to ‘add {item name} to basket’ clears up this confusion.

Here's an example from the [BBC Sounds](https://apps.apple.com/gb/app/bbc-sounds/id1380676511) app. Each row in this table has a play button after it.

![BBC Sounds Music Mixes list](/images/BBCSoundsMixes.PNG)

To disambiguate what each play button does, the accessibility labels don't just say 'play' but 'play {name of mix}'.

![BBC Sounds Music Mixes list showing accessibility labels](/images/BBCSoundsMixesLabels.PNG)

### Your Custom Views

If you’re combining views together to create a new control, iOS won’t know what part of that view is the important part to present to assistive technologies. So, in this case, you’ll need to add some code to the root view of your new control to pass that label to your customer in the form of an accessibility label.

### Images of Text

As a general rule, avoid images of text if you can. But if you have to use an image that includes text, ensure you add the same text as an accessibility label to the image, otherwise people with no, or low, vision won’t know what the text is.

## When Not to Use an Accessibility Label

Ensuring your on-screen elements have meaningful labels is an important step for improving accessibility, but just as important is knowing when not to add labels. Adding labels where they aren’t needed makes for a noisy experience, and can make navigating your app take longer, and be more confusing.

### Decorative Elements

Decorative elements can be icons that aren’t buttons, smaller images such as thumbnails, layout elements, and other elements that have no explicit meaning shouldn’t have an accessibility label applied, and should all be marked as hidden to accessibility. Larger images or photos should probably have a short descriptive label added. Otherwise, it can be confusing for those with low vision who can tell something is present on screen, but not what.

### If Your Label Does the Job

If your element already has a text label, that's great in most cases. Don’t change it just for the sake of doing something. You risk making the accessible experience worse.

## Next Up

The next blog in this series is [Writing Great iOS Accessibility Labels](/blog/writing-great-labels/)

* [iOS Accessibility Labels](/blog/ios-accessibility-labels/)
* [When to use Accessibility Labels](/blog/when-to-use-accessibility-labels/)
* [Writing Great iOS Accessibility Labels](/blog/writing-great-labels/)
* [iOS Attributed Accessibility Labels](/blog/attributed-accessibility-labels/)