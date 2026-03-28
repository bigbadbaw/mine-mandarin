// Generates minimal creeper face PNG icons without dependencies
// Uses raw PNG construction

const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, pixelData) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const typeB = Buffer.from(type);
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const combined = Buffer.concat([typeB, data]);
    const crc = crc32(combined);
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc >>> 0);
    return Buffer.concat([len, combined, crcB]);
  }

  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data (filter byte 0 + RGB for each row)
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 3);
    row[0] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      row[1 + x * 3] = pixelData[idx];
      row[1 + x * 3 + 1] = pixelData[idx + 1];
      row[1 + x * 3 + 2] = pixelData[idx + 2];
    }
    rawRows.push(row);
  }
  const raw = Buffer.concat(rawRows);
  const compressed = zlib.deflateSync(raw);

  // IEND
  const iend = Buffer.alloc(0);

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', iend)
  ]);
}

function drawCreeperIcon(size) {
  const pixels = new Uint8Array(size * size * 3);
  const u = size / 16;

  function fillRect(x, y, w, h, r, g, b) {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        const px = Math.floor(x + dx);
        const py = Math.floor(y + dy);
        if (px >= 0 && px < size && py >= 0 && py < size) {
          const idx = (py * size + px) * 3;
          pixels[idx] = r;
          pixels[idx + 1] = g;
          pixels[idx + 2] = b;
        }
      }
    }
  }

  // Background - obsidian
  fillRect(0, 0, size, size, 0x1A, 0x1A, 0x2E);

  // Creeper face background - green
  fillRect(u * 2, u * 2, u * 12, u * 12, 0x4C, 0xAF, 0x50);

  // Darker green border
  fillRect(u * 2, u * 2, u * 12, u, 0x3a, 0x8a, 0x3a);
  fillRect(u * 2, u * 2, u, u * 12, 0x3a, 0x8a, 0x3a);
  fillRect(u * 2, u * 13, u * 12, u, 0x3a, 0x8a, 0x3a);
  fillRect(u * 13, u * 2, u, u * 12, 0x3a, 0x8a, 0x3a);

  // Eyes
  fillRect(u * 4, u * 5, u * 3, u * 3, 0x1a, 0x1a, 0x1a);
  fillRect(u * 9, u * 5, u * 3, u * 3, 0x1a, 0x1a, 0x1a);

  // Mouth - T shape
  fillRect(u * 7, u * 8, u * 2, u * 4, 0x1a, 0x1a, 0x1a);
  fillRect(u * 5, u * 8, u * 6, u * 2, 0x1a, 0x1a, 0x1a);

  return pixels;
}

[192, 512].forEach(size => {
  const pixels = drawCreeperIcon(size);
  const png = createPNG(size, size, pixels);
  fs.writeFileSync(`icon-${size}.png`, png);
  console.log(`Generated icon-${size}.png (${png.length} bytes)`);
});
