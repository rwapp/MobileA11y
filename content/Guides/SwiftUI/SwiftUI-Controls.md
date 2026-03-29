---
title: SwiftUI Accessibility - Named Controls
description: "All controls in SwiftUI can take a Text element as part of their builder. This makes controlling your app with VoiceOver or VoiceControl way easier."
date: 2019-09-26T07:30:56Z
lastmod: 2019-09-26T07:30:56Z
tags:
- Mobile
- iOS
- SwiftUI
- Guide
---

One big accessibility improvement in SwiftUI comes in the form of named controls. Nearly all controls and some non-interactive views ([see Images](https://rwapp.co.uk/2019/09/11/SwiftUI-Images/)) can take a Text view as part of their view builder. The purpose of this is to tie the meaning to the control.

```
Toggle(isOn: $updates) {
    Text("Send me updates")
}
```

Imagine a UIKit layout with a UISwitch control. We'd most likely right align the switch, and provide a text label to the left. Something like this.

![Send me updates label left with a switch control right](/images/swiftui-toggle.png)

Visually this makes perfect sense. The control follows natural reading direction from the label so we know they're connected. This isn't clear when using some assistive technologies like VoiceOver, Braille keyboards, and Voice Control. For these technologies, there is no link between the separate elements. Remember, VoiceOver users are unlikely to have the benefit of inferring relation by following the visual layout of your UI.

For this UI, VoiceOver will read *'Send me updates.'* Your user will then swipe, and VoiceOver will read *'Toggle. Off.'* Your VoiceOver user cannot know you intend a connection. They also have no way of knowing what the consequence of toggling this switch would be. Consider the layout below.

![Vertically aligned labels & toggles. The first option is 'Charge me $1m', the second 'send me updates'](/images/swiftui-hzcontrols.png)

The VoiceOver interaction here is exactly the same as above. Because VoiceOver reads in natural direction, both labels will be read before the switches are reached. Your user will hear *'Send me updates.'* (swipe) *'Toggle. Off.'* Except if they switch the toggle, we'll charge them a bunch of money, and we won't send them the updates they wanted.

Named controls exclude this ambiguity. Because SwiftUI is explicit about the link between the control and the label it can present them as such to assistive technology. This not only provides a clear consequence for activating the control. Grouping also reduces the number of swipes required, making navigation quicker and easier.

These labels also double up as the friendly names used for Voice Control. Without a name for the control, a Voice Control user would have to ask iOS to overlay a grid and say *'tap 20'*. This means unnecessary commands spoken by your customer. Additionally, covering a large proportion of your screen covered with numbers is not a great experience.

![Toggle control overlayed by a numbered grid](/images/swiftui-grid.jpeg)

With a properly named control, the only Voice Control command required to activate the switch is *'tap Send me updates.'*

![Toggle control showing the Voice Control command to interact with it](/images/swiftui-voicectrl.PNG)

Some elements, [like Images](https://rwapp.co.uk/2019/09/11/SwiftUI-Images/), take a Text element as part of their view builder, but it is never displayed on screen. In some instances like Sliders only some platforms such as MacOS display the label. Or you can change the presentation style to include the label. Regardless of how SwiftUI presents your labels (or not), you should always provide a short descriptive label for every control you create. This ensures a better, frustration-free experience for your assistive technology users.

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