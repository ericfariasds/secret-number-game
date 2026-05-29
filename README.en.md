# Secret Number Game
An interactive guessing game built with pure HTML, CSS and JavaScript.

[🇧🇷 Versão em Português](README.md)

## How to play
1. The game picks a secret number between **1 and 10**
2. Type your guess in the input field
3. Click **Guess** (or press **Enter**)
4. You get hints whether the number is higher or lower
5. Try to find the secret number in as few attempts as possible!
6. Click **New game** to restart

## Features
- Random generation without number repetition
- Hints after each wrong guess
- Input validation (empty field, out of range)
- Attempt counter with correct grammar (1 attempt / 2 attempts)
- Keyboard shortcut with the **Enter** key
- Visual animation on correct guess
- Configurable attempt limit
- Responsive layout for mobile

## Technologies used
- HTML5
- CSS3 (Flexbox, animations, media queries)
- JavaScript (ES6+)

## How to run locally
```bash
# Clone the repository
git clone https://github.com/seu-usuario/jogo-numero-secreto.git
# Enter the folder
cd jogo-numero-secreto
# Open the file in the browser
open index.html
```
Or simply open the `index.html` file directly in your browser — no server needed!

## Project structure
```
jogo-numero-secreto/
├── index.html
├── style.css
├── app.js
├── img/
│   ├── ia.png
│   └── code.png
└── README.md
```

## What I learned in this project
- DOM manipulation with JavaScript
- Control flow logic and recursion
- Form validation without external libraries
- Code organization with configuration constants
- Responsive styling with pure CSS

---
Developed as a JavaScript learning project
