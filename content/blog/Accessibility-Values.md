---
title: "iOS Accessibility Values"
description: "Representing a view's value to assistive technology."
date: 2022-06-19T10:30:56Z
tags:
- iOS
- Mobile A11y Blog
- Blog
---

For iOS, Accessibility values are one of the building blocks of how Accessibility works on the platform, along with [traits](/blog/traits/), [labels](https://mobilea11y.com/blog/ios-accessibility-labels/), hints, and showing/hiding elements. If you're familiar with WCAG or web accessibility, accessibility values are the *value* part of [WCAG 4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html).

## Values

Not every element in your view will have a value - in fact, most won't. Any element that 'contains' some data, data that is not included in the element's label requires an accessibility value to be set. If you're using standard controls provided by Apple, these values will be set for you. But if you make something custom you must add a value where necessary, and if you're extending a standard control, testing with VoiceOver is essential.

Examples of values include the text in a text field or the current value of a stepper or slider. For example, a slider that is used to represent progress through time-based media such as video. The label of the element might be 'progress', and the value would be the current percentage progress. The exact value will vary depending on the type of control and data, it could be an integer value, a value with a unit, or a string.

Adding a value to other elements where no other data is presented separate to the label would duplicate what you are presenting to your user. This would make your interface harder to navigate, and potentially more confusing. The correct answer here is to add a descriptive [accessibility label](/blog/ios-accessibility-labels/), and set nothing for an accessibility value.

## The API

The accessibility value is a string representation of the value of an element on screen, so this means the API doesn't need much complexity. In SwiftUI we have a single `accessibilityValue` modifier. This modifier can take the string value, a `Text` or a localised string key. 

```
.accessibilityValue("My value")
```

Using a `Text` value allows us to add accessibility attributes to the string to give VoiceOver more information on how to announce the utterance.

For UIKit our UIView subclass has a property of `accessibilityValue`. 

```
myView.accessibilityValue = "My Value"
```

Additionally in UIKit you can use [attributed accessibility strings](/blog/attributed-accessibility-labels/) to provide more information to VoiceOver about how it should announce the utterance.

```
myView.accessibilityAttributedValue = myAttributedValue
```

--

I highly recommend you check out my other blogs on the building blocks of iOS accessibility: [traits](/blog/traits/) and [labels](https://mobilea11y.com/blog/ios-accessibility-labels/).