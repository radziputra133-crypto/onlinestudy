# STUDYVERSE — Version 1

A responsive student learning dashboard built with plain HTML, CSS and JavaScript. It runs locally in a modern browser and does not require installing Node.js or a framework.

## Run it

1. Extract `STUDYVERSE.zip`.
2. Open the `studyverse` folder.
3. Double-click `index.html` to open the website in Chrome, Safari or Firefox.

Optional: for a local development server, open Terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included features

- Premium responsive dashboard and sidebar navigation
- Subject catalogue with search and category filters
- Create, save, search and delete study notes
- Interactive multiple-choice quizzes with instant feedback and explanations
- Study planner with add-task and completion controls
- Local browser storage (`localStorage`) for notes, tasks, quiz progress and dark mode
- Mobile layout and dark appearance toggle

## Notes

- This is a front-end prototype. Data is saved in the current browser on the current device; there is no user account, cloud sync or shared database yet.
- Course cards are sample catalogue entries. The quiz centre contains working sample quizzes for Science, Technology, Languages and Business.
- Google Fonts are loaded online. If internet access is unavailable, the site falls back to system fonts.

## Next development stage

Add a backend (for example, Python Flask), user authentication, a database, real course content, and an AI tutor connected to a properly configured API. Never put private API keys directly in browser JavaScript.
