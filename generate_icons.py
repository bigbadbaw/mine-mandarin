from PIL import Image, ImageDraw
import os

def draw_creeper(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    u = size / 16  # 1 pixel unit in the 16x16 grid

    def px(x1, y1, x2, y2, color):
        d.rectangle([x1*u, y1*u, x2*u-1, y2*u-1], fill=color)

    # Background — dark green
    px(0,  0,  16, 16, '#1B4D1B')

    # Face — bright creeper green
    px(2,  1,  14, 15, '#4CAF50')

    # Highlight top-left edge
    px(2,  1,  14,  2,  '#6BCF6B')
    px(2,  1,   3, 15,  '#6BCF6B')

    # Shadow bottom-right edge
    px(2,  14, 14, 15, '#2E7D32')
    px(13,  1, 14, 15, '#2E7D32')

    # Left eye (dark)
    px(3,  4,  6,  7,  '#111111')
    # Right eye (dark)
    px(10, 4,  13, 7,  '#111111')

    # Mouth — classic creeper pattern
    # Top bar of mouth
    px(6,  8,  10, 9,  '#111111')
    # Left fang down
    px(5,  9,  7,  11, '#111111')
    # Right fang down
    px(9,  9,  11, 11, '#111111')
    # Bottom bar
    px(6,  11, 10, 12, '#111111')

    # Green gap in middle of mouth (between fangs)
    px(7,  9,  9,  11, '#4CAF50')
    # Green above bottom bar between fangs
    px(6,  9,  7,  11, '#4CAF50')  # left inner
    px(9,  9,  10, 11, '#4CAF50')  # right inner

    return img

def save_icon(size, filename):
    img = draw_creeper(size)
    img.save(filename, 'PNG')
    print(f'Saved {filename} ({size}x{size})')

# Generate all required sizes
save_icon(167, 'icon-167.png')
save_icon(180, 'icon-180.png')
save_icon(192, 'icon-192.png')
save_icon(512, 'icon-512.png')

print('All icons generated.')
