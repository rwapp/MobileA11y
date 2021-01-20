---
title: "Quick Win - Image Descriptions"
description: "If your images are missing descriptions those without vision won't be getting the full experience of your app."
date: 2021-01-19T07:30:56Z
tags:
- iOS
- Android
- Mobile
- Mobile A11y Blog
- Blog
- Quick Win
---
Images are a major part of our apps. They add meaning and interest, they give your app character and context. The adage is that a picture is worth a thousand words. But if you can't see the image clearly, how do you know what those words are?

If you aren't providing image descriptions in your app many of your users will be missing out on the experience you've crafted. The result can be an app thats missing that spark an character, or worse an app thats just meaningless and unusable. Fortunately adding image descriptions is simple.

## Choosing to add descriptions

There are a few rules around adding image descriptions. In short - keep them meaningful and brief. Don't use the words image or photo, just give a quick summary of what is in the image, or the meaning of the image. If the image is decorative, such as an icon, you don't need to add a description.
You'll find some more tips in my guide on [Writing Great iOS Accessibility Labels](https://mobilea11y.com/blog/writing-great-labels/)

## iOS

### UIKit

```
// myImageView is a reference to a UIImageView in your interface
myImageView.accessibilityLabel = "A tree"
```

### SwiftUI

```
Image("tree")
    .accessibility(label: "A tree")
```


## Android

### XML

```
<ImageView ...
android:contentDescription="@string/tree_content_description" />
```

### Kotlin
```
// myImageView is a reference to an ImageView in your interface
myImageView.contentDescription = getString(R.string.tree_content_description)
```

### Java
```
// myImageView is a reference to an ImageView in your interface
myImageView.setContentDescription(getResources().getString(R.string.tree_content_description));
```