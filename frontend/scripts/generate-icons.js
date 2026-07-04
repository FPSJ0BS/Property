#!/usr/bin/env node

/**
 * Generates placeholder app icons for PWA manifest.
 * Replace these with your actual brand icons before production.
 *
 * For production, use a tool like:
 *   - https://www.pwabuilder.com/imageGenerator
 *   - https://realfavicongenerator.net/
 */

const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, "..", "public", "icons");

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate simple SVG-based placeholder icons
sizes.forEach((size) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5"/>
      <stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <text x="50%" y="38%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.18}" font-weight="800">99</text>
  <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.12}" font-weight="600">tolet</text>
</svg>`;

  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.svg`), svg);
  console.log(`✓ Generated icon-${size}x${size}.svg`);
});

// Also create a favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5"/>
      <stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#bg)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui" font-size="12" font-weight="800">99</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.svg"), faviconSvg);
console.log("✓ Generated favicon.svg");
console.log("\n⚠️  These are SVG placeholders. Convert to PNG for production:");
console.log("   Use https://www.pwabuilder.com/imageGenerator");
