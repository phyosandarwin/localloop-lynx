(an all-nighter spontaneous work submitted late by a min)
## Inspiration
TikTok is known for making challenges (dance or any other growth activity) go viral. But some of these challenges or trends come and go, and many people may feel left out of this digital world if they happen to not participate or know about it. So, to extend the original idea of challenges, allowing TikTok to develop into a platform of creating collaborative spaces for diverse individuals who seek for genuine connection with communities of similar interests, LocalLoop is therefore here to cultivate this concept.

## What it does

## Design
Using a single-page scroll layout, users can easily create their challenges and add relevant activity tags to their challenge videos. AI is used to polish the challenge descriptions, and more importantly, to address security risks of TikTok content consumption/exposure, AI would flag out safety concerns and potential harms for any applicable challenge activities that users plan to create and upload. 

## Challenges we ran into
Due to limited documentation on LynxJS framework and tight timelines, the prototype here is unable to display the challenge videos in the form of video format, so text cards were used to simplify the idea illustration. But you can imagine that in the future, user should be able to upload their videos in addition to the challenge name, description and activity tags. 

As for existing implementation, I was stuck for a while on rendering input element because there was no built-in elements in the library, in the end, after consulting lynxjs discord community and clearly inspecting the documentation codebases, I found the trick.

## What's next for LocalLoop
With more time and availability of more built-in features within LynxJS, there would be another section titled "Find Challenges" similar to a FYP page but dedicated specifically to challenge videos (so as to incentivise user action instead of random content consumption). In this section, user would be able to search challenge videos and  see a scrollable video feed of challenges where they could join and/or save for future participation. This feature was also omitted for now, since there is insignificant application of AI and would be considered as lower priority for this hackathon objective.

---------------------------
## Rspeedy project

This is a ReactLynx project bootstrapped with `create-rspeedy`.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Scan the QRCode in the terminal with your LynxExplorer App to see the result.

You can start editing the page by modifying `src/App.tsx`. The page auto-updates as you edit the file.
```
localloop-techjam2025
├─ backend
│  ├─ geminiService.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  └─ challenges.ts
│  └─ tsconfig.json
├─ biome.json
├─ eslint.config.mjs
├─ lynx.config.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ arrow.png
│  │  ├─ lynx-logo.png
│  │  └─ react-logo.png
│  ├─ components
│  │  ├─ MyChallenges.css
│  │  └─ MyChallenges.tsx
│  ├─ config
│  ├─ index.tsx
│  ├─ intrinsic-element.d.ts
│  ├─ models
│  │  └─ user.ts
│  ├─ rspeedy-env.d.ts
│  ├─ types.ts
│  └─ __tests__
│     └─ index.test.tsx
├─ tsconfig.json
└─ vitest.config.ts

```
