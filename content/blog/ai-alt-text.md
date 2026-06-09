---
title: "Generating image description alt text with Foundation Models on iOS 27"
summary: "iOS 27 adds the ability to generate image descriptions on-device using Foundation Models. Here's how to use it as a fallback when alt text is missing."
date: 2026-06-09T07:30:56Z
tags:
- ai
- alt text
- Apple Intelligence
- Foundation Models
- iOS 27
---

> This blog is based on pre-release software, iOS 27 and Xcode 27 Beta 1. Be aware that the behaviour and APIs could change between now and release.

Following the release of iOS 26 I was left with one strong impression (leaving liquid glass aside): Apple Intelligence seems pretty powerful. I'd love to be able to feed it an image along with some context about the use of the image, and get Apple Intelligence to generate an appropriate description. As a developer, there are times when alt text is not available because the person who chose the image didn't add it, and this leaves VoiceOver users missing a ton of content. 

With the first Beta release of iOS 27 and Xcode 27, we can do just that.

## AI generated descriptions should be a fallback

First, a health warning. AI generated image descriptions can be a powerful addition to your app, they are likely better than no descriptions at all. But they're not a genuine replacement for meaningful descriptions written by a human.

This isn't an anti-AI stance. The person who chose an image knows why they chose that image and the meaning they wanted to convey, and the image description should reflect that. The further away from the person who chose the image, the more likely the description will be missing crucial information. An LLM may be great at picking out what is in an image, and you can provide some context in text, but it is an extra step removed, meaning an extra step away from the gold standard.

But relying on the person who chose the image to provide a description can unfortunately find itself at odds with reality. Many, if not most, apps are largely based around user-generated content such as social media, or a peer-to-peer shopping app like Vinted, or content provided by vendors such as Booking.com. Here we can encourage image descriptions, but all too often they are missed. Plus, can we really expect regular users to be experts in providing image descriptions?

Additionally, this has some significant restrictions - it's only available from iOS 27, only on a selection of devices, and not available in all regions and languages. Even then, your user also needs to have Apple Intelligence enabled and downloaded. I haven't included it in the code samples below, but be sure to check all of these before attempting to start a model session.

## Generating image descriptions

As with everything I've tried with Foundation models, generating an image description is surprisingly simple. The first part is perhaps the most complex: We need an image. While not directly part of generating the description, there is a little more to it than `Image(named: )`, so it's worth covering here.

As this is not UI we need a lower level image object to represent it, a `CGImage`, `CIImage`, or `CVPixelBuffer`. I chose to load an image directly from a `URL` (`imageURL`) as a `Data` which can then be easily turned into a `CGImage`. I can also turn that `Data` into a SwiftUI `Image` for use later in my UI.

```
guard let (data, _) = try? await URLSession.shared.data(from: imageURL),
    let source = CGImageSourceCreateWithData(data as CFData, nil),
    let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
else {
    // oops
    return
}
```

Next, we need to generate the description from our image, first, create a `LanguageModelSession()`. Then ask this session to respond to your image and short prompt on how to respond. Provide your image to the prompt as a `CGImage` (or whichever representation you choose) using the new `Attachment()` struct.

The most important part of this is likely the text prompt. For this example, I have gone with the simple and clear "Generate an alt text image description for an assistive technology user." I found this to generate valuable output. But if you need something specific, here's the place to make that clear. For example, if you're working on a hotel booking app you might want to let the model know the purpose of this image is to showcase a hotel and its features, and encourage a user to want to book. I found that adding these extra pieces of context helped to tweak the output, but I also found the model was very keen to editorialise and invent a story around the image that couldn't realistically be determined just by looking at the image. So you'll want to do a bunch of testing and tweaking here.

The full code to generate an image description is these 10 lines:

```
do {
    let session = LanguageModelSession()
    let response = try await session.respond {
        "Generate an alt text image description for an assistive technology user."
        Attachment(image)
    }
        print(response.content) // the `content` is our outputted description
} catch {
    // oops
}
```

And really, that's it. The rest is up to you to handle errors and UI.

In fact, I was able to create a full application that fetches an image from a URL, displays it, and generates an alt text description for the image in a little over 100 lines of Swift. So I thought I'd include the whole thing here:

```
import SwiftUI
import FoundationModels
import CoreGraphics

@main struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

// MARK: - View Model

@Observable
class ContentViewModel {
    var inputURLString = ""

    private(set) var imageURL: URL?
    private(set) var imageData: Data?
    private(set) var altText = ""
    private(set) var statusText = ""
    private(set) var isLoading = false
    private(set) var loadingText = ""

    func setURLAndGenerate() async {
        let trimmed = inputURLString.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let url = URL(string: trimmed) else {
            statusText = "Please enter a valid URL"
            return
        }

        imageURL = url
        await generateAltText()
    }

    private func generateAltText() async {
        statusText = ""
        guard let imageURL else { return }

        loadingText = "Loading image..."
        isLoading = true
        defer { isLoading = false }

        // Fetch the image
        guard let (data, _) = try? await URLSession.shared.data(from: imageURL),
              let source = CGImageSourceCreateWithData(data as CFData, nil),
              let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
        else {
            statusText = "Failed to load image"
            return
        }

        imageData = data
        loadingText = "Generating description..."
        altText = "Generating description..."

        // Generate a description
        do {
            let session = LanguageModelSession()
            let response = try await session.respond {
                // Tweak the prompt to match your app's functionality
                "Generate an alt text image description for an assistive technology user."
                Attachment(image)
            }
            altText = response.content
            statusText = response.content
        } catch {
            statusText = "Error: \(error.localizedDescription)"
            altText = "Failed to generate description"
        }
    }
}

// MARK: - View

struct ContentView: View {
    @State private var viewModel = ContentViewModel()
    @FocusState private var isFieldFocused: Bool

    var body: some View {
        VStack(spacing: 16) {
            VStack {
                TextField("Paste image URL", text: $viewModel.inputURLString)
                    .textFieldStyle(.roundedBorder)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .textContentType(.URL)
                    .focused($isFieldFocused)

                Button("Generate") {
                    isFieldFocused = false
                    Task { await viewModel.setURLAndGenerate() }
                }
                .buttonStyle(.bordered)
            }

            if let imageData = viewModel.imageData,
               let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFit()
                    .frame(maxHeight: 300)
                    .accessibilityLabel(viewModel.altText)
            }

            if !viewModel.statusText.isEmpty {
                Text(viewModel.statusText)
            } else if viewModel.isLoading {
                ProgressView(viewModel.loadingText)
            }

            Spacer()
        }
        .padding()
    }
}
```

Here's the app in action having generated an image description of a DIY circuit board synthesiser kit:

![An iPhone screen showing an image of a circuit board. Beneath it is a generated description: "This image shows a white circuit board with black knobs, blue resistors, and a black rectangular component. It has labeled connections and a red and black wire. The background is dark."](/images/AIImageDesc.PNG)

---

I'm excited for the possibilities this unlocks for apps where image descriptions are currently patchy. If you add this into your app, please let me know so I can try out the results!