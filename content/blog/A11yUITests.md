---
title: "A11yUITests: An XCUI Testing library for accessibility"
description: "A open source library of accessibility tests for XCUI Testing."
date: 2019-12-17T07:30:56Z
tags:
- Resources
- iOS
- Testing
- Mobile
---

[A11yUITests](https://github.com/rwapp/A11yUITests) is an extension to XCTestCase that adds tests for common accessibility issues that can be run as part of an XCUITest suite. I've written a detailed discussion of the [tests available](https://mobilea11y.com/guides/xcui/) if you're interested in changing/implementing these tests yourself. Alternatively, follow this quick start guide.

## Getting Started

### Adding A11yUITests

I'm assuming you're already familiar with cocoapods, if not, [cocoapods.org](https://cocoapods.org) has a good introduction. There is one minor difference here compared to most cocoapods, we're not including this pod in our app, but our app's test bundle. This means your podfile will look something like this.

```ruby
target 'MyAwesomeApp' do
    target 'MyAwesomeApp_Tests' do
        pod 'A11yUITests'
    end
end
```

### Starting a New Test Suite

#### Setting Up Testing

In Xcode, create a new suite of UI Tests from File > New > Target and choose UI Testing Bundle. On the next screen ensure the app you're looking to test is selected under 'Target to be Tested.' Xcode will generate an example XCTestCase subclass for you, we'll use this in the 'your first test' step.


#### Your First Test

Add `import A11yUITests` at the top of your XCTestCase subclass.

Write a new test function beginning with the word test

```
import A11yUITests
import XCTest

class AwesomeTests: XCTestCase {
    func testAccessibility() {   

    }
}
```

Place your cursor inside the braces and press the record button in the bottom left of Xcode's editor window. This will launch the app and record your interactions. Navigate to the screen where you want to check accessibility, and Xcode will write the steps into your test in code.

![Xcode's record button](/images/xcui-record.png)

After this generated code, add `a11yCheckAllOnScreen()`. This command will then run A11yUITests' full suite on your screen.

### Existing UI Test Suites

Add `import A11yUITests` into the XCTestCase subclass where you want to add accessibility checks.

Pepper `a11yCheckAllOnScreen()` calls around when you navigate to a new screen or make a major change to a screen.


## Customising Test Suites

For more detail, see the [A11yUITests Readme](https://github.com/rwapp/A11yUITests/blob/master/README.md). There are 4 provided test suites, but you can build your own if you find some tests don't quite work for you.

You can do this by creating an array of `A11yTests` enum values. Run your chosen suite by passing your array along with the elements you want to test to `a11y(tests: [A11yTests], on elements: [XCUIElement])`. You can get all elements on screen with the following.

 ```
 let elements = XCUIApplication().descendants(matching: .any).allElementsBoundByAccessibilityElement
 ```