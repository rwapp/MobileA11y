---
title: "iOS 14: Custom Accessibility Content"
description: "A new accessibility feature for iOS 14 lets you provide all the information your customer could need while reducing noise."
date: 2020-06-29T07:30:56Z
tags:
- iOS
- Mobile
---

Each year at WWDC Xcode Santa brings us exciting new APIs to play with, and this year our accessibility present is [Customized Accessibility Content](https://developer.apple.com/documentation/accessibility/customized_accessibility_content). This API flew under the radar a little, I’m told this is because it's so new there wasn’t even time for inclusion at WWDC. But this new feature helps to solve a difficult question when designing a VoiceOver interface - where is the balance between too much and too little content.

## VoiceOver Noise

Customize Accessibility Content solves a common issue with presenting complex data to VoiceOver. Present too much and you’ll add noise and make your app hard to navigate. Present too little and you’re only giving your customers half the experience. Both extremes are a frustrating experience, and finding the happy middle state here is arguably impossible because different users will want different information when using your app.

Take the Files app as an example. Each entry has the file or folder name, a visual icon, the date it was last accessed, then either the size on disk or the number of items contained within. This is quite a lot of information crammed into a small area. Visually this works though, because the date and size have reduced prominence, and the icon provides a large amount of context. This means we can scan down the list to find the filename we’re looking for, then if we need more data we can look at the extra information to check we have the item we need.

![iOS Files app displaying a Keynote folder](/images/files-keynote.PNG)

With VoiceOver, however, everything has the same prominence. For the above folder, VoiceOver announces “Keynote. 16/04/2020. 1 item. Folder”. This gives all the same detail, but imagine navigating down a big list of these entries trying to find the file or folder you’re looking for - that's quite a task. And there’s a lot of superfluous information for that purpose. There are techniques for speeding this up. For example, setting the filename to have the `.header` accessibility trait will allow users to actively skip to the filenames only. But this is an active technique that your user has to opt in to, therefore it's not a comparable experience with visually navigating this list. Consider too if VoiceOver users would benefit from extra verbal detail that visual users wouldn't need, how would we present this?

Customize Accessibility Content takes the opposite approach, by hiding extra detail we can make our interfaces faster, simpler, and more enjoyable to navigate for VoiceOver users while progressively disclosing extra detail for those who want it. This not only allows smoother VoiceOver navigation but also means we can add even more detail for VoiceOver users than for visual users. Apple uses this technique in the iOS Photos app.

## Apple's Use

Apple has implemented this feature in Photos for iOS 14. and it provides a great case study for how Apple envisage we should use this feature. Navigate the collection of photos with VoiceOver enabled and you’ll hear the date each photo was taken. Take this example of me ecstatically meeting my hero, Eeyore.

![VoiceOver focusing on a photo](/images/customcontent-photonav.PNG)

But phots have a ton of metadata aside from the date alone that helps us discover if we have the image we’re looking for. This is where our custom content comes in. Using the VoiceOver rotor control I can switch to More Content.

![VoiceOver rotor showing More Content](/images/customcontent-rotor.jpeg)

When in this mode I can now perform a vertical swipe to read extra content. Firstly, the time the photo was taken, followed by the orientation of the photo.

![VoiceOver reading the time the photo was taken](/images/customcontent-time.PNG) ![VoiceOver reading the photo orientation](/images/customcontent-orientation.PNG)

Adding all this information at the top level for every photo would be too much information. But when we want more detail it's easy to access. As such, custom accessibility content is a powerful technique for making rich accessible experiences.

## Improving Your App's Experience

Let's take a look at how we might use this to improve the Files example from above.

To provide custom content your view class needs to implement the `AXCustomContentProvider` protocol. This protocol has a single requirement, that you provide an `accessibilityCustomContent` var with an array of `AXCustomContent` objects in the order you want VoiceOver to read them to your user.

`AXCustomContent` objects are a key-value pair of strings. In the above Photos example, ‘Landscape’ is the value, and ‘Orientation’ the key or label. Ideally, both labels and values should be single words and should both be capitalised with no period at the end. In Files we want to add the last modified date, so let's create an `AXCustomContent` as below.

```swift
let lastModified = AXCustomContent(label: "Modified", value: "16/04/2020")
```

Adding the extra information we need in Files, our implementation would look like this.

```swift
extension MyCustomView: AXCustomContentProvider {
    var accessibilityCustomContent: [AXCustomContent]! {
        get {
            let lastModified = AXCustomContent(label: "Modified", value: "16/04/2020")
            let items = AXCustomContent(label: "Items", value: "1")
            let type = AXCustomContent(label: "Type", value: "Folder")
            
            return [lastModified, items, type]
        }
        set(accessibilityCustomContent) {}
    }
}
```

One problem here though is that we might be hiding some information that is integral to navigating this screen. Personally, I think the item type is crucial to know if you have the right document. In this case, we can set the priority of the `type` content to be `.high`. Content with the `.high` priority is always read out when VoiceOver focuses on the element, without your user cycling through the additional content. Because of this, you should use it sparingly only when appropriate. I’d suggest adding no more than one `.high` value to each element, although there is no fast rule here. Because VoiceOver reads `.high` priority content by default, this should come at the start of the list. So our new code looks like this.

```swift
extension MyCustomView: AXCustomContentProvider {
    var accessibilityCustomContent: [AXCustomContent]! {
        get {
            let lastModified = AXCustomContent(label: "Modified", value: "16/04/2020")
            let items = AXCustomContent(label: "Items", value: "1")
            let type = AXCustomContent(label: "Type", value: "Folder")
            
            type.importance = .high
            
            return [type, lastModified, items]
        }
        set(accessibilityCustomContent) {}
    }
}
```

We can also use custom accessibility content to provide extra context to an item, and because our user is choosing to iterate through this, rather than it being read by default, there’s no worry about causing noise for our customer. As with Photos, we could even add more content for VoiceOver users than for visual users. For files we could add the creation date, enclosing items size for folders, or any tags for example.

Here I’ve given you two examples of usage for this new API: hiding extra content to VoiceOver such as my Files example and providing context for non-visual users in Apple’s own Photos example. You could also use this in your app to provide extra detail for graphs or other data visualisations, data tables, diagrams, illustrations or animations could be other candidates for improvement with this API.

Many thanks to [Aaron Stephenson](https://twitter.com/azzoor) for his assistance researching this new feature.