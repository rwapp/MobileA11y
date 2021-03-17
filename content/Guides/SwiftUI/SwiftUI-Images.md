---
title: "SwiftUI Accessibility: Images"
description: "There’s some important changes to image accessibility in SwiftUI, if you’re not expecting them you could be making a bad experience for your VoiceOver customers."
date: 2019-09-11T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
- Guide
---

Images in SwiftUI are accessible by default. This is the opposite of what we'd experience in UIKit, where images are not accessible unless you set `isAccessibilityElement` to true.

Sometimes making images not accessible to VoiceOver is the right decision. Like when using a glyph as a redundant way of conveying meaning alongside text. An example of this would be displaying a warning triangle next to the text ‘Error’ or a tick next to ‘success’. If these images were accessible your VoiceOver users would hear the word ‘error’ twice and have to swipe between each one. This makes navigation longer and frustrating for your customer.

![error message](/images/swiftui-error.png)

If images are a large part of your UI then making them not accessible can be confusing and frustrating to VoiceOver customers. Low vision users will often still be able to tell there is content on the screen, and will attempt to discover it by moving their finger over the area. If the image is not accessible to VoiceOver all your user will hear is an irritating ‘dunk’. This can lead VoiceOver users to assume your app is not accessible at all, and is a big turn-off.

Making images accessible by default helps to provide a more comparable experience for assistive technology users. But the main reason Apple have made this change is because of a new iOS 13 feature. VoiceOver in iOS 13 will now use CoreML to determine the content of your image and will describe the image to your VoiceOver user.

Because of this change, there are a couple of considerations you need to bear in mind when coding images in SwiftUI.

### Image names

Because your image is accessible, VoiceOver needs some content to announce. Most of the time the only readable content you provide is the file name of the image. 

```
Image("shuttle")
```

This is fine if you call your image image `Space shuttle`, but if your image is called `164234main_image_feature_713_ys_full` then what your customer hears is useless and frustrating. Image, like most SwiftUI elements, can take a Text value providing a friendlier string to read to your user.

```
Image("164234main_image_feature_713_ys_full", label: Text("Shuttle"))
```

### Decorative images

Sometimes it’s not appropriate for an image to be accessible. For example, providing an error icon next to the text ‘error’. If this image was accessible your VoiceOver user would hear ‘Error’ (swipe) ‘Error’. This duplication adds time and effort in navigation for VoiceOver users. In this instance it’s better to use the Image initializer decorative, this will display your image the same as above, but it is now hidden to VoiceOver.

```
Image(decorative: "Error")
```

![error message](/images/swiftui-error.png)


### System Images

System images are a great new feature in iOS 13, Apple provides a suite of common system glyphs such as info circles and share icons that you can use as icons in your app. You can browse the full collection by downloading the SF Symbols app from the Apple Developer website.
In my opinion, Apple has implemented the accessibility wrong for these images. Like all images in SwiftUI, these system glyphs are accessible by default. As these are system images they have names like ‘keyboard.chevron.compact.down’ and ‘questionmark.video.fill’. These are the names that VoiceOver will read and are meaningless to your customers. Apple should mark these images as not accessible by default, or at least have an initializer option to add a friendly name. Unless and until Apple makes a change like this, you will need to add the `.accessibility(hidden: true)` modifier to any system images you are using.

```
Image(systemName: "exclamationmark.triangle.fill")
   .accessibility(hidden: true)
   ```

***

Thanks for reading. This story is part of a series on SwiftUI Accessibility. Check out my other guides in this series:

[SwiftUI Accessibility](https://mobilea11y.com/guides/swiftui/swiftui-accessibility/)<br/>
[SwiftUI Accessibility: Named Controls](https://mobilea11y.com/guides/swiftui/swiftui-controls/)<br/>
[SwiftUI Accessibility: Images](https://mobilea11y.com/guides/swiftui/swiftui-images/)<br/>
[SwiftUI Accessibility: Dynamic Type](https://mobilea11y.com/guides/swiftui/swiftui-dynamic-type/)<br/>
[SwiftUI Accessibility: Accessible User Interface](https://mobilea11y.com/guides/swiftui/swiftui-aui/)<br/>
[SwiftUI Accessibility: Sort Priority](https://mobilea11y.com/guides/swiftui/swiftui-sort-priority/)<br/>
[SwiftUI Accessibility: Attributes](https://mobilea11y.com/guides/swiftui/swiftui-attributes/)<br/>
[SwiftUI Accessibility: Traits](https://mobilea11y.com/guides/swiftui/swiftui-traits/)<br/>
[SwiftUI Accessibility: User Settings](https://mobilea11y.com/guides/swiftui/swiftui-settings/)<br/>
[SwiftUI Accessibility: Semantic Views](https://mobilea11y.com/guides/swiftui/swiftui-semantic-views/)