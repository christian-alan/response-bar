# Response Bar

A daily interaction study: a reaction pill that springs open into a reply field. The **+** button slides into the end of the pill and becomes the send button.

Built with React 18, Vite and Tailwind CSS.

## The interaction

| Trigger | What happens |
| --- | --- |
| Tap the speech bubble or **+** | The pill stretches right with a spring and the **+** docks inside it as a send button. The smiley and heart blur out as "Write a reply" blurs in. |
| Type and press **Enter**, or tap send | The paper plane flies off and the reply floats up in a bubble. The bar then closes. |
| Send with an empty field | The send button shakes. |
| Tap the smiley | A scrollable emoji panel springs up out of the smiley. Picking a reaction sends it up as a bubble. |
| Tap the heart | An X-style like: a disc swells into a ring, the heart pops in, and seven pairs of dots scatter. Unliking is instant. |
| **Esc** or tap outside | Everything closes. |

## Two looks

Switch between them with the control at the bottom of the screen. Your choice is remembered.

- **Classic**: the reference design. A white pill on light grey with a solid black button and an X-pink heart. It follows the system dark mode.
- **Liquid Glass**: an Apple-style take on a graphite background. Clear glass with specular rims, a white glass send button, presses that squish, and a white like burst.

## Run it

```bash
npm install
npm run dev
```

Build for production with `npm run build`, and preview the build with `npm run preview`.

## How it's put together

```
src/
  App.jsx                   Stage and the Classic / Liquid Glass switch
  index.css                 Variant tokens, glass material, the like-burst keyframes
  components/
    ResponseBar.jsx         State and geometry for the pill, input and send button
    EmojiPanel.jsx          Horizontally scrolling reactions
    HeartButton.jsx         Like toggle and burst
    icons.jsx               Stroke icons on a 32px grid
  lib/
    motion.js               One-shot effects (blur pulse, nudge, wink, flight) via the Web Animations API
    emojis.js               Reaction set
```

### Motion notes

- **The spring.** Resizing uses a sampled spring curve in CSS `linear()`, exposed in Tailwind as `ease-spring`. It overshoots slightly and settles in about 600 ms.
- **Geometry.** At rest the pill is 228 × 72 and the button is 105 × 68. Open, the pill is 378 × 72 and the button is 97 × 60. The button barely moves: the pill grows underneath it.
- **Motion blur.** During the transition the send button gets a quick blur pulse and the trailing edge of the pill smears.
- **Glass.** The material is `backdrop-filter` blur and saturation, inset rim highlights and a radial specular sheen. Real Liquid Glass also bends content at the edges like a lens. Browsers only partly support that, so a native iOS 26 build would get it from SwiftUI's glass effect.
- **Reduced motion.** All animation is turned off when `prefers-reduced-motion` is set.
