from PIL import Image

# Leere transparente 32x32 PNG für Kaktus
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
img.save('cactus.png')

# Leere transparente 32x32 PNG für Vogel
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
img.save('bird.png')

print("Bilder erstellt!")
