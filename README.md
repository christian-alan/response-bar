# Response Bar interaction

A reaction pill that springs open into a reply field, with the **+** button docking into its end as the send button. Tap the smiley for a scrolling emoji panel, tap the heart for an X-style like burst, and send a reply to watch it float up. A switch at the bottom moves between Classic and Liquid Glass.

<p align="center">
  <img src="docs/demo.webp" alt="Demo: the heart is liked with a burst, the emoji panel opens and scrolls and a reaction is sent, the bar springs open, a reply is typed and sent, then the Liquid Glass look is switched on and the like and reply are repeated" width="800">
</p>

<p align="center"><a href="docs/demo.mp4">Watch as a video</a></p>

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4
- CSS transitions with a spring curve in `linear()`, keyframes and the Web Animations API, no animation library
- Inline SVG

## Run

```bash
npm install
npm run dev
```
