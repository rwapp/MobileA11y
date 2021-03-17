---
title: "SwiftUI Accessibility: Dynamic Type"
description: "SwiftUI makes some nice improvements on Dynamics Type- it’s supported by default. But we need to do a few things to support fully."
date: 2019-09-18T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
 - Guide
---

Like all accessibility features, Dynamic Type is about customisability. Many of your customers, and maybe even you, are using Dynamic Type without even considering it an accessibility feature. Dynamic type allows iOS users to set the text to a size that they find comfortable to read. This may mean making it a little larger so it’s easier to read for those of us who haven’t yet accepted we might need glasses. Or it could mean ramping it right up for people with low vision. Or taking the text size down for extra content and privacy.
Like many accessibility features on iOS, Dynamic Type support has been greatly improved in SwiftUI. There are a few things you should do (and not do) to make the most of it.

## Do

### Nothing

SwiftUI supports dynamic type by default and is multi-line by default. So if you add `Text("Some text")` to your view, you’re done.

### Text Styles

Text is body style by default, which makes it great for the majority of uses. But any app with a single text style is going to look pretty boring. Fortunately, Apple provides a selection of [11 type styles](https://developer.apple.com/documentation/uikit/uifonttextstyle) for you to use. Each of these styles supports dynamic type, and adjusts the [size, leading and trailing](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/) for you as needed. Using too many type styles can lead to your app looking messy and inconsistent. If you find these 11 aren’t enough, it might be worth taking another look at your designs.

![Dynamic text sizes](/images/DynamicTextSizes.png)

You can choose your required text style using the modifier `.font(.headline)` to set your text to the headline style. The full list of tyoe styles can be found in [Apple's developer documentation](https://developer.apple.com/documentation/uikit/uifonttextstyle).

 
### Custom Fonts

Apple’s built-in Dynamic Type text styles all use the default San Francisco font. SF is a great font for iOS, but to make your app stand out you need a custom font.
Some devs have told me they don’t support Dynamic Type in their app because it doesn’t support custom fonts. This isn’t the case, [Keith Harrison](https://twitter.com/kharrison) over at [Use Your Loaf](https://useyourloaf.com) has a [great post on using custom fonts with Dynamic Type](https://useyourloaf.com/blog/using-a-custom-font-with-dynamic-type/) in UIKit that I highly recommend. 
Unfortunately, these methods won’t work for us in SwiftUI. Custom font support for dynamic type in SwiftUI needs some improvement from the current version. There is however, a simple way we can leverage some of the built-in text style’s dynamic type support. By adding a helper method, we can get the current point size for our desired text style.

```
 func textSize(textStyle: UIFont.TextStyle) -> CGFloat {
    return UIFont.preferredFont(forTextStyle: textStyle).pointSize
 }
```

Then we can use the custom font modifier to apply this to our text.

```
 .font(.custom("MyCustomFont", size: textSize(textStyle: .headline)))
 ```
 
 ![Custom font](/images/CustomFont.png)

The downside of this approach is this fixes the text size until the screen is redrawn. So if your customer changes their dynamic type size your text won't change until this screen is recreated.

## Don't

### Line Limit

It’s possible to limit the number of lines your text wraps to using the modifier `.lineLimit(1)`. Meaning if your text requires more lines it will end in an ellipsis. This is a poor choice as your users with the largest text sizes are likely to lose the full meaning. As a rule, your UI should be able to accommodate whatever text content at whatever size its provided with. If you find your screen or control can’t handle this, it's worth taking another look at your design, or how you’ve built it.

![Truncated text](/images/SingleLine.png)

### Fixed sizes

There are two ways of fixing a font size. `.font(.system(size: 17))` or `.font(.custom("MyCustomFont", size: 17))`. please don’t be tempted to use these. If your customer has chosen to set their preferred text size, either for accessibility reasons, or because they like it that way, it’s pretty arrogant as an app developer to ignore this – at least, that’s how your customer will see it.

![Fixed text size](/images/FixedSize.png)

As with the line limit, if you find your screen or control doesn’t work with larger fonts re-visit the design or how you've built it. Sometimes it's not possible to support larger text sizes for certain controls. See iOS’ standard tab bar for example. In these situations, we can add a function that calls our dynamic size function above, and provides a maximum value. This allows your text to scale down, but limits how large it can become.

```
 func textSizeForThisOneSpecificUse() -> CGFloat {
    return fmin(textSize(textStyle: .body), 28.0)
 }
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