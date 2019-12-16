---
title: "XCUITests for accessibility"
description: "Checking your iOS app's accessibility with automated tests."
date: 2019-12-16T07:30:56Z
tags:
- iOS
- Testing
---

For a while now I’ve been looking at possibilities for automated accessibility testing on iOS. Unfortunately, I’ve not found any option so far that I’m happy with. I am a big fan of Apple’s XCUI Test framework. Although it has its limitations, I believe there’s scope for creating valid accessibility tests using this framework. Over the last few months I’ve been trying things out, and here’s what I’ve come up with.

These tests are all part of an open source library I created called A11yUITests, available on [GitHub](https://github.com/rwapp/A11yUITests). You can pull this library in using Cocoapods and use these tests in a friendly way. I document them here to help you change and adapt them for your own use. And to spark discussion on how valid these tests are, and how we can improve upon them.

In creating these tests I've followed [WCAG](https://www.w3.org/TR/WCAG21/) guidelines and [Apple's recommendations on accessibility](https://developer.apple.com/accessibility/). For inspiration, I've researched Deque's commercial iOS Accessibility testing tool [WorldSpace Attest](https://www.deque.com/tools/worldspace-attest-ios/) and Android's [Espresso accessibility checks](https://developer.android.com/training/testing/espresso/accessibility-checking) library.

## Any XCUITest is an Accessibility Test

XCUITests uses your app's accessibility tree, this means any well-written XCUITest is an accessibility test. Many XCUITest suites I've seen make one mistake though. When you're finding an element on screen, always use the element's label, not the accessibility identifier. The identifier is designed to help you with XCUITests, but it doesn't guarantee your content has been set to the element. By finding an element by its label, you're looking for exactly the same string that VoiceOver will read and Voice Control users will speak.

```swift
let button = XCUIApplication.buttons["My button"]
```

## Accessibility Tests

I've identified 12 accessibility issues I think it's possible to test for using XCUI. At the time of writing, 10 of these feature in [A11yUITests](http://mobilea11y.com/blog/a11yuitests/), but the others have branches and should be merged after some tweaks. There are a few other areas I'd really love to test for, like accessibility traits, but as of writing, XCUI can't check these.

### Minimum size

This test is not based on anything other than a rough guess that any accessible element smaller than 18px square is probably too small. I've seen some smaller text, like caption styles, fail for this, and I think you could argue either way whether that is a genuine failure or not.

```swift
XCTAssert(element.frame.size.height >= 18)
XCTAssert(element.frame.size.width >= 18)
```

## Valid Accessibility Label

I based this test on [WCAG 2.1 Guideline 1.1 Text Alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives). This test is valid for any accessible element, whether that's a control, image, or text. I chose to check the accessibility label had a minimum of 2 characters, as 1 is most likely meaningless. Checking if the string is empty might work better for your app.


```swift
XCTAssert(element.label.count > 2)
```

or

```swift
XCTAssertFalse(element.label.isEmpty)
```

### Redundant Element Type

Following [Apple's guidance for writing accessibility labels](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/iPhoneAccessibility/Making_Application_Accessible/Making_Application_Accessible.html#//apple_ref/doc/uid/TP40008785-CH102-SW6), elements shouldn't contain the type of control in their label. You should convey this information using accessibility traits. Unfortunately it's not possible to test for accessibility traits currently, but we can check the labels.

The test I have included in A11yUITests only checks for the presence of 'button' as this is the most common, but this test should ideally be expanded for other controls and other languages.

```swift
XCTAssertFalse(button.label.lowercased().contains("button"))
```

### Uppercase Button Labels

Following [Apple's guidance for writing accessibility labels](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/iPhoneAccessibility/Making_Application_Accessible/Making_Application_Accessible.html#//apple_ref/doc/uid/TP40008785-CH102-SW6), accessibility labels for any controls should begin with an uppercase letter. This affects the tone when read by VoiceOver, but also looks better when displayed by Switch Control or Voice Control.


```swift
XCTAssert(interactiveElement.label.first!.isUppercase)
```

### Button Labels Are Not Sentences

Apple recommends that button labels should not be written as full sentences and as such shouldn't finish with a period. It seems realistic to expect we could use buttons with exclamation or question marks, so I chose not to check for all punctuation here.


```swift
XCTAssert((interactiveElement.label.range(of: ".") == nil))
```

### Redundant Image Labels

[Apple recommends](https://developer.apple.com/videos/play/wwdc2019/254/) not including the word 'image' in accessibility labels for images, instead we should use the image accessibility trait. Using both is duplication and causes frustration for your user. We can't check that we've used the right accessibility, but we can check the label. Ideally, this test should be localised, and extended to check for words like 'icon', 'picture' etc.

```swift
XCTAssertFalse(image.label.lowercased().contains("image")
```

### Image File Names

It's easy to leave your images file name as the accessibility label, but this is meaningless when read by VoiceOver. We don't know at runtime what the image file name was, so we can't check this with 100% accuracy, but checking if there's an underscore is a good indicator. This test could be extended to check for file extensions. And potentially to check for long text with no spaces. This test should be localised.

```swift
XCTAssertFalse(image.label.contains("_"))
```

### Short Labels

Apple provides excellent guidance on writing meaningful accessibility labels in this [WWDC video](https://developer.apple.com/videos/play/wwdc2019/254/). In it, they suggest making accessibility labels meaningful without making them too long. Long labels can make your app a chore to navigate. In this test, I chose to check for labels longer than 40 characters, but this limit is arbitrary, and for most apps, 40 will probably be too long. This test doesn't apply to static text or text fields where we would expect text to commonly exceed 40 characters.

```swift
XCTAssertTrue(element.label.count <= 40)
```

### Tap Target Size

This test follows  [WCAG 2.1 Sucess Criteria 2.5.5 Target Size Level AAA](https://www.w3.org/TR/WCAG21/#target-size) in ensuring any interactive elements have a tap target of at least 44 pixels square. This is perhaps the simplest test in that if this doesn't produce failures, you know your app is compliant. However, many of Apple's own controls don't comply with this. Navigation bar buttons, tab bar buttons, sliders, switches and text fields are all smaller than 44px in one or more directions. This means to be fully compliant here you will have to subclass Apple's own controls and create your own view for presenting them. As soon as you stray from Apple's controls, you begin to introduce larger accessibility issues. So for now, sticking with Apple's standard controls is probably the best option. This test is valid for any element you user can interact with.


```swift
XCTAssert(element.frame.size.height >= 44)
XCTAssert(element.frame.size.width >= 44)
```

### Duplicated Labels

If your screen is a list of items for sale each with a 'Buy' button next to the listing, how will a VoiceOver user be sure what they are buying? You should aim to make the labels more meaningful by labelling them 'Buy {product}'. For this test, we need to get all the objects on screen and loop through them. I'd recommend excluding any elements you'd expect not to have a label here, otherwise, you'll receive a large number of failures for "".

```swift
let elements = XCUIApplication().descendants(matching: .any).allElementsBoundByAccessibilityElement

for element1 in elements {
    for element2 in elements {
        XCTAssertNotEqual(element1.label, element2.label)
    }
}
```

### Overlapping Elements

Any elements with an accessible label shouldn't overlap their bounds. When using VoiceOver the view's bounds are highlighted so anything that overlaps will cause confusing and messy navigation. You'll want to exclude any elements that don't have an accessibility label here as we'd expect non-accessible elements to intersect. 

```swift
let elements = XCUIApplication().descendants(matching: .any).allElementsBoundByAccessibilityElement

for element1 in elements {
    for element2 in elements {
        XCTAssertFalse(element1.frame.intersects(element2.frame)
    }
}
```

### Text Outside a Scroll View

Unfortunately, currently, it's not possible to detect whether text supports dynamic type. But there is a common related accessibility issue that we can detect. If you're presenting any text that isn't in a scroll view then you're not supporting dynamic type. If your text isn't in a scroll view you can't guarantee your text will have room to grow as needed. This we can test with XCUI.

```swift
let scrollViews = XCUIApplication().descendants(matching: .scrollView).allElementsBoundByAccessibilityElement

XCTAssertFalse(scrollViews.isEmpty)

let staticTexts = XCUIApplication().descendants(matching: .staticText).allElementsBoundByAccessibilityElement

var fail = true

for element in staticTexts {
    for scrollView in scrollViews {
        let descendants = scrollView.descendants(matching: .staticText).allElementsBoundByIndex
        for descendant in descendants {
            if descendant.label == element.label {
                fail = false
            }
        }
    }

    XCTAssertFalse(fail)
    fail = true
}
```

## Limitations


### Incomparable

An `XCUIElement` is not a concrete element, but more a query for an element on screen. This is because we'd expect an element to change throughout it's lifecycle. The elements label, size, or location could all reasonably be expected to change. Any test that took an immutable snapshot of the screen to perform tests on would not be all that realistic. This does have a couple of drawbacks when it comes to the type of testing we're trying to achieve here.

Firstly, we can't directly compare `XCUIElement`s. If we were to write `if element1 = element1 {` this would sometimes pass, and sometimes fail. If XCUI decides to take a snapshot of the element for the left hand side of this equation and not the right, we're good. If XCUI already has a snapshot when evaluating the LHS, but decides to refresh the snapshot when checking the RHS, this statement will return false.

For this reason in the scroll view test above I'm determining if elements are the same by comparing label strings. This is obviously not ideal or conclusive, but I believe this is the closest I can achieve right now. 

### Speed

Our second issue with `XCUIElement` significantly slows down our tests. That's because XCUI takes regular snapshots of each element when we request a property. These snapshots are time consuming, and we request a lot of properties.

I managed to speed up tests by creating a proxy object for `XCUIElement`s. This way I stored properties I knew I would need later, but only had to request each once resulting in a single snapshot for each element. I can also store a reference to the `XCUIElement` here so I can make further queries later if needed. Using this technique I was able to speed up a full suite test of the A11yUITests example app up from 1 minute to 10 seconds.

```swift
struct A11yElement {
    let label: String
    let frame: CGRect
    let type: XCUIElement.ElementType
    let underlyingElement: XCUIElement
}
```

I can then create one from each `XCUIElement` I use.

```swift

let button = XCUIApplication().buttons["My button"]

let a11yButton = A11yElement(label: button.label,
                             frame: button.frame,
                             type: button.elementType,
                             underlyingElement: button)

```

I feel this is acceptable in these tests as we're not interacting with any element so we're not expecting anything to change. But I would not recommend this approach for standard UI testing.


## Where To Go From Here

I have a few thoughts about how I'd like to develop these tests to get the most value from them.

### CI/CD

For a few years now I've been thinking about how to make accessibility part of a CI/CD pipeline. The purpose of any test as part of a CI/CD suite is as a source of truth, a guarantee that the code you're releasing at any given moment does what you expect. We would expect these tests to check our code functions as expected, our UI displays what we're looking for, and our app responds to interactions from the network and the user. So why wouldn't we expect accessibility to be a part of this? It's an integral component of any app we produce, and if it doesn't work right that's a functional issue with our app. Not all of our users will run into this issue, but it's still a defect. Having accessibility tests as part of a CI/CD suite guarantees a certain level of accessibility quality in our app.

There's a bigger reason I think accessibility tests in CI/CD are important. Insisting on a set level of accessibility before merging or releasing makes accessibility a normal part of the development process. Not a 'nice to have' or 'look at how great we are', just a normal, boring requirement of releasing software.

There's a problem with this approach, however. Accessibility isn't about checking boxes. Accessibility is about how people experience your app. And this will be different by app and by user. I've used a couple of commercial accessibility testing tools for iOS, and while they do find legitimate issues, they focus a little too much on compliance with [WCAG](https://www.w3.org/TR/WCAG21/) for my liking. This is understandable. Firstly to be able to test, you need a benchmark to test against. Secondly, these are tools for enterprise, and enterprise cares about not being sued. So recording regulatory conformance is important. This means tests return a large number of what could be considered false-positives because elements don't follow the letter of the law. Even though, in reality, they're practically fine. There's also a large amount of practical accessibility experience that automated tests just can't determine.

So there's an unanswered question here: How do we make an automated quality gate for accessibility while acknowledging tests are simultaneously over-prescriptive and incomplete?

I think there's a parallel here with static analysis tools like [SonarQube](https://www.sonarqube.org). Static analysis isn't blocking, but a general indication of code health. You can tell from one merge to the next if the health of the codebase has improved, or otherwise. I'd love to implement something that would mimic this for accessibility tests like these, but that's a project for another time.

### Linting

Automated accessibility testing is common on the web, but the downside on iOS is that we can't read the page's full code to validate it at the same time as running the app. I expect storyboard linting could work really well for catching accessibility issues in code before they're committed, but I haven't yet tried this. 

I anticipate that as SwiftUI becomes more prevalent, we could use a tool like SwiftLint to prevent common accessibility errors from ever making it into our code. I suspect this would be much faster and less painful than automated testing, and encourage better accessible coding.