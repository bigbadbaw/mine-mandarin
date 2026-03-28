# Mine Mandarin ⛏️

A Minecraft-themed Mandarin Chinese vocabulary app for the CVUSD
DLI program at Hidden Trails Elementary.

## For Teachers / Parents

1. Open the app URL in Safari on iPad
2. Enter the password (provided separately)
3. Tap Share → Add to Home Screen
4. App works fully offline after first load

## Requirements

- iPad with iOS 16+
- Safari browser
- Chinese (Simplified) voice installed:
  Settings → Accessibility → Spoken Content → Voices → Chinese (Simplified)
- Microphone permission required for speaking modules

## Modules

- 📖 **Enchantment Table** — Browse and study all words with stroke order practice
- ⚔️ **Read & Say** — See Chinese characters, speak the pronunciation
- 🏆 **Say It In Chinese** — Hear English, speak the Chinese
- 🪨 **Mine The Word** — Hear the word, write the characters

## Vocabulary

Step Up 4, Units 3 and 5 (52 words)
Level Learning curriculum — CVUSD Mandarin DLI

## How to Deploy to GitHub Pages

1. Go to github.com → Sign in or create free account
2. Click "+" → New repository
3. Name it: `mine-mandarin`
4. Set to **PUBLIC** (required for free GitHub Pages)
5. Click "Create repository"
6. On the next screen, click "uploading an existing file"
7. Drag ALL project files into the upload area
8. **Before uploading:** open `app.js` in a text editor and
   replace `PLACEHOLDER_PASSWORD` with your chosen password
9. Click "Commit changes"
10. Go to Settings → Pages
11. Under "Source" select: Deploy from branch → main → / (root)
12. Click Save
13. Wait 2-3 minutes
14. Your URL will be: `https://[your-github-username].github.io/mine-mandarin`

## Sharing With Teachers

- Send them the URL + password separately
- Recommend they use Safari on iPad
- They add to home screen for the full app experience
- Works offline after first load

## To Update the App Later

- Go to your repo on github.com
- Click on the file you want to update
- Click the pencil icon to edit
- Or drag new files into the repo to replace them

## Local Development (Optional)

```bash
cd mine-mandarin
python3 -m http.server 8080
```

Open `http://localhost:8080` in browser.

For HTTPS (needed for mic on non-localhost):
```bash
python3 serve.py
```
