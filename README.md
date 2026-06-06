# Muztahidur Rahman Nihal Portfolio

A clean, static portfolio site for Muztahidur Rahman Nihal.

## Live portfolio

Target live URL: <https://muztahidur-rn.github.io/>

This URL becomes live after this folder is pushed to the current GitHub account repository named `Muztahidur-RN.github.io`.

## Files

- `index.html` - page content and profile links
- `styles.css` - responsive layout and visual system
- `script.js` - project filters, icons, stat counters, and contact settings

## Public profile links used

- Current GitHub: <https://github.com/Muztahidur-RN>
- Old GitHub: <https://github.com/muztahidur>
- LinkedIn: <https://www.linkedin.com/in/mr-nihal/>
- Codeforces: <https://codeforces.com/profile/mr-nihal>

## Contact setup

Open `script.js` and set:

```js
const CONTACT_EMAIL = "your-email@example.com";
const WHATSAPP_NUMBER = "8801XXXXXXXXX";
```

Use the WhatsApp number in international format with digits only, without `+`.

## Deploy

This is a static site. For the cleanest GitHub Pages URL, publish it to:

```bash
git remote add origin https://github.com/Muztahidur-RN/Muztahidur-RN.github.io.git
git branch -M main
git push -u origin main
```

GitHub Pages should then serve the portfolio at <https://muztahidur-rn.github.io/>.
