/**
 * Renders the service offer icons (public/images/services/*.png) from inline SVG.
 * Run: node scripts/assets/service-icons.mjs
 * Style: 2.5px-equivalent line icons with the site's purple → teal gradient.
 */
import sharp from 'sharp';

const SIZE = 208;
const defs = `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b48cff"/>
      <stop offset="55%" stop-color="#915eff"/>
      <stop offset="100%" stop-color="#00cea8"/>
    </linearGradient>
  </defs>`;
const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${SIZE}" height="${SIZE}">${defs}
  <g fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;

const icons = {
  // Knowledge base search: stacked documents + magnifier + spark.
  'rag-assistants': wrap(`
    <path d="M14 10h20l10 10v18"/>
    <path d="M34 10v10h10"/>
    <path d="M14 10v40h18"/>
    <path d="M20 26h14M20 33h10M20 40h6"/>
    <circle cx="43" cy="44" r="8"/>
    <path d="M49 50l7 7"/>
    <path d="M52 8v6M49 11h6"/>`),
  // Conversational automation: chat bubble with a lightning bolt.
  'chat-automation': wrap(`
    <path d="M10 30c0-11 10-19 22-19s22 8 22 19-10 19-22 19c-3 0-6-.5-8.6-1.4L12 52l3.2-9.5C12 39.3 10 34.9 10 30z"/>
    <path d="M34 20l-8 12h8l-3 9 9-13h-8l2-8z" stroke-width="2.8"/>`),
  // Document capture: page with text lines inside scanner corner brackets.
  'document-ocr': wrap(`
    <path d="M8 18v-8h8M48 10h8v8M56 46v8h-8M16 54H8v-8"/>
    <path d="M22 16h14l7 7v25H22z"/>
    <path d="M36 16v7h7"/>
    <path d="M27 30h11M27 36h11M27 42h7"/>
    <path d="M4 32h56" stroke-width="2.2" stroke-dasharray="3 3" opacity=".7"/>`),
};

for (const [name, svg] of Object.entries(icons)) {
  await sharp(Buffer.from(svg)).png().toFile(`public/images/services/${name}.png`);
  console.log(`wrote public/images/services/${name}.png`);
}
