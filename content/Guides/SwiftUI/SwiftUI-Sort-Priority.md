---
title: "SwiftUI Accessibility: Sort Priority"
description: "Sometimes VoiceOver's natural order is not the one that makes the most sense for your app. SwiftUI lets you change that."
date: 2019-10-02T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
- Guide
---
Assistive technology, such as VoiceOver, works in natural reading direction. In English, and most other languages, this means top left through to the bottom right. Mostly this is the right decision for assistive technology to make. This is the order anyone not using assistive technology would experience your app. Sometimes though, we make designs that don't read in this way.
By using the `.accessibility(sortPriority: )` modifier we can set the order in which assistive technology accesses elements. To achieve this, you must group elements in a stack (`HStack`, `VStack` or `ZStack`). Then use the `.accessibilityElement(children: .contain)` modifier. The higher the number we give to `.accessibility(sortPriority: )`, the earlier VoiceOver will focus on the item. This means an element with a priority of 2 comes before priority 1, and so on.

```
VStack {

   Text("Read this last")
      .accessibility(sortPriority: 0)
      
   Text("Read this first")
      .accessibility(sortPriority: 2)
      
   Text("Read this second")
      .accessibility(sortPriority: 1)
      
}
.accessibilityElement(children: .contain)
```

![](/images/SwiftUI-textorder.png)

One example of using this might be captioning a large image. In SwiftUI [images are accessible by default](https://rwapp.co.uk/2019/09/11/SwiftUI-Images/). This doesn't mean we should focus on the image as the first element - the title is usually more meaningful. Here, we'd set the sort priority of the image to 0 so it receives focus after VoiceOver has read the title and caption.

```
VStack {
   Image("shuttle")
      .accessibility(sortPriority: 0)
      
   Text("Shuttle")
      .font(.largeTitle)
      .accessibility(sortPriority: 2)
      
   Text("This is an image of a shuttle on the launch pad")
      .accessibility(sortPriority: 1)
      
}
.accessibilityElement(children: .contain)
```

![](/images/swiftui-largeshuttle.png)

Another use of this could be a custom stepper control. We'd want VoiceOver to focus on the value first to orientate your user and inform them which value they're starting with. Then VoiceOver should follow with the decrease and increase buttons. We'd achieve this like this:

```
HStack {

   Button(action: {
      self.value -= 1
   }) {
      Text("Decrease")
   }
   .accessibility(sortPriority: 1)
   
   Text(String(value))
      .accessibility(sortPriority: 2)
      
   Button(action: {
      self.value += 1
   }) {
      Text("Increase")
   }
   
}
.accessibilityElement(children: .contain)
```
![](/images/SwiftUI-stepper.png)

### .Contain
As of October 2019, the sort priority only works for elements inside a stack where the stack has the modifier of `.accessibilityElement(children: .contain)`. I don't believe this is intentional, hopefully, future releases of SwiftUI will drop this requirement.

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