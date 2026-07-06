---
title: "10 Tips for Building iOS Apps That Handle Dynamic Type Well"
summary: "Supporting Dynamic Type isn't just about making text bigger. These 10 tips cover the layout, imagery, and edge cases your app needs to handle so text scaling actually works well in practice."
date: 2026-07-06T20:16:50Z
tags:
- ios
- dynamic type
---

This isn't a post about how to use the iOS-provided [text styles](https://developer.apple.com/documentation/swiftui/font/textstyle) or how to use a [custom font](https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-dynamic-type-with-a-custom-font) and support text scaling. This blog assumes you already have a text system in your app that scales.

Supporting dynamic type isn't just about your text getting bigger. To support it fully you need to scale other elements of your UI, allow the text room to grow, and think carefully about what should and should not get larger.

Allowing all of your text to get as big as it needs is a naive approach that would likely make your app experience worse. But so too is limiting text where scaling doesn't work well. Instead, it's worth spending a few minutes considering where it makes sense to scale as much as needed, and where we should allow an alternative.


## 1. All text content must be inside a scroll view

There's only one way to be certain that your text content will have enough space to grow without checking every combination of physical screen size, screen zoom, text scale, custom font, or text weight: Use scroll views.

Don't make your app scroll views all the way down — one per screen is usually the perfect number — but for each text element, somewhere above it in the view hierarchy there must be a scroll view. With one exception:


## 2. Don't scale text in fixed bars

Bars such as navigation bars and tab bars, and other fixed content such as buttons that are pinned to the bottom of the screen generally shouldn't scale, and therefore don't need to be inside a scroll view.
If these fixed bars did scale they would take a lot of space away from content.

For such text we should use the `.font(.custom("MyCustomFont", fixedSize: 14))` modifier to set an explicit size. Alternatively limt text scaling using `.dynamicTypeSize(.large)` to fix the size, or consider allowing the text to scale down by using a range `.dynamicTypeSize(.xSmall ... .large)` (`.large` is the default iOS text size). Restricting the dynamic type size has the benefit of limiting scaling of SFSymbols too - more on that later.

If we're fixing the text size then we need to provide an alternative. iOS's Dynamic Type system provides a feature called [Large Content Viewer](https://developer.apple.com/documentation/swiftui/view/accessibilityshowslargecontentviewer(_:)). If content in a fixed bar doesn't scale, long-pressing it at an accessibility text size shows the content in a centered overlay at the user's chosen text size. Buttons in a regular navigation or tab bar will usually support this already, but if you have created something custom apply the `.accessibilityShowsLargeContentViewer()` modifier to your restricted content.

Fixed, non-scrollable content, and text that is purely decorative, should be the only times text scaling is limited; it is not appropriate to fix text sizes at other times.

![Large Content Viewer](/images/LargeContentViewer.PNG)


## 3. Avoid fixed heights

All the times you've added `.frame(height:)` to your UI are really going to cause you a world of hurt when you implement Dynamic Type support.

Fixed height, pixel-perfect, designs might look great when they're created, but they don't survive contact with reality. Fixing heights will mean your text will be truncated, clipped, or overlap other content, and become unreadable. Allow the content to size itself. The only exceptions here should be interface elements that don't contain text content, and fixed bars as detailed above.


## 4. Switch from HStacks to VStacks at accessibility sizes

Content shown side-by-side might make logical sense at standard text sizes, but this quickly causes content to wrap and become difficult to follow at larger text sizes. Here's a  component I often add to projects that acts as an HStack at regular text sizes, but uses the [`dynamicTypeSize` environment property](https://developer.apple.com/documentation/swiftui/environmentvalues/dynamictypesize) to switch to a VStack at larger sizes.

```Swift
struct AdaptiveStack<Content: View>: View {
    @Environment(\.dynamicTypeSize) var dynamicTypeSize
    private let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        if dynamicTypeSize.isAccessibilitySize {
            VStack {
                content
            }
        } else {
            HStack {
                content
            }
        }
    }
}
```

I can then use that in my views the same way I would with a regular HStack:

```Swift
struct ContentView: View {
    var body: some View {
        AdaptiveStack {
            Text("Beans")
            Text("5")
        }
    }
}
```

The `dynamicTypeSize` environment property's `isAccessibilitySize` value acts as a breakpoint at which to switch up your design to one that offers a little more space.


## 5. Don't use .lineLimit() on detail screens

Applying the `.lineLimit()` modifier to text that appears on a detail screen means your users will lose out on content as it will become truncated.

On a detail screen users will expect to see the full detail. If you are cutting off some text entirely on these screens this is not an inconvenience, it makes your app entirely unusable.


## 6. Use .lineLimit() on list screens that push to detail

The proper use of the `.lineLimit()` modifier is on list or collection screens. Here the purpose of the content is to show just enough so your user has all the context they need to know if they would like to tap this item. If you're showing full content in a list, then your users are going to have to do a lot of scrolling to find the item they want. Your larger text users will thank you for truncating text on these screens.

See this example from the Notes app: Adding the full note content to the list would be over the top. Instead we get just enough to know which note to pick, and the full content is available on the note detail screen.

![A list screen with limited content that pushes to a detail screen with full content](/images/list-detail-scale.png)


## 7. Consider adjusting line limits up at accessibility sizes

A list view may use  `.lineLimit()` as detailed above to limit the amount of detail shown, but remember, the purpose of this cut down content is to provide your user with enough context to find the list item they are looking for. At larger text sizes, less of that content will be visible per line. So consider providing an extra line or two — the exact number will depend on your app and the content. Don't go wild or you'll suffer from the endless scrolling problem we're trying to avoid. Use `dynamicTypeSize.isAccessibilitySize` as in point 4 to judge when to make the switch.


## 8. Use SF Symbols where possible

SF Symbols will automatically adjust their size and weight in line with the proportions of the user's Dynamic Type setting. Using these as icons where possible will handle a whole lot of scaling out of the box, and will make your interface appear far more consistent.


## 9. Use scaled metric to scale custom images and layout

If you're using custom iconography, you can scale the size using the `@ScaledMetric` property wrapper.

The code below draws a red rectangle that is 50 x 50 at the standard text size, but by applying a `@ScaledMetric` value this rectangle will grow and shrink relative to the `subheadline` text style.

```Swift
struct ContentView: View {
    @ScaledMetric(relativeTo: .subheadline) var headlineIconSize = 50.0

    var body: some View {
        VStack {
            Rectangle()
                .fill(.red)
                .frame(
                    width: headlineIconSize,
                    height: headlineIconSize
                )
        }
    }
}
```

In addition to iconography, this technique can be applied to any UI that would benefit from scaling such as status indicators (as in the example above) and increasing padding at larger text sizes.


## 10. Don't forget about Bold Text and Display Zoom

Dynamic Type isn't the only thing that governs how much space your text occupies relative to screen size. In Settings > Appearance you'll find settings for Bold Text and Display Zoom. When you're testing, remember to enable these too.

For Display Zoom, following good responsive design principles — in addition to what we've covered above — is the best option

For Bold Text, provided your font has a bold-weight alternative, you'll get the bold behaviour for free. For icons and other content that would benefit from a bolder weight, listen to the [`.legibilityWeight` environment property](https://developer.apple.com/documentation/swiftui/environmentvalues/legibilityweight) and switch out UI or values based on that Boolean value.

```Swift
struct ContentView: View {
    @Environment(\.legibilityWeight) var legibilityWeight
    
    var body: some View {
        VStack {
            switch legibilityWeight {
            case .bold:
                Image("MyIcon-Bold")
            default:
                Image("MyIcon")
            }
        }
    }
}
```

---

For more detail on handling typography well in an iOS app, check out the [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) section of the Apple Human Interface Guidelines.