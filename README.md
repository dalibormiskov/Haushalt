# Haushalt

A private household-finance app that runs in the browser (Mac, iPhone, any device) and keeps its data in **your own Google Drive**. It only opens for the Google accounts you allow. Everyone else sees a sign-in screen and can't get past it.

- Income, expenses, savings and trading in separate categories, grouped for the overview
- Filters by month, quarter, year or several years; group and person filters
- Trends, heatmap, year-over-year comparison, drill-down per category
- Works offline; changes sync when you're back online
- Can be added to the iPhone home screen like an app

## Where is my data?

- **On each device** (browser storage), so the app works offline.
- **In your Google Drive** as one file, `Haushalt-Daten.json`. The app only has access to files it created itself (`drive.file` permission), nothing else in your Drive.
- **Not in this repository.** This repository only contains the app's code. It holds no financial data and no personal names.

## Setup (one time)

1. **GitHub Pages:** Settings → Pages → Source: *Deploy from a branch*, then choose branch `main`, folder `/ (root)`. The app is then available at `https://<your-username>.github.io/haushalt/`.
2. **Google Cloud** (free), at <https://console.cloud.google.com>:
   1. Create a project called "Haushalt".
   2. *APIs & Services → Library:* enable the **Google Drive API**.
   3. *Google Auth Platform → Get started:* app name "Haushalt", your e-mail, audience **External**.
   4. *Data Access → Add or remove scopes:* add `https://www.googleapis.com/auth/drive.file`.
   5. *Audience:* keep the status at **Testing** and add, as **test users**, only the Google accounts that may use the app. Google refuses everyone else. In this mode Google asks you to re-approve access about once a week.
   6. *Clients → Create client:* type **Web application**, with authorized JavaScript origin `https://<your-username>.github.io`. Copy the **Client ID**.
3. Put the Client ID into `index.html` (the `GOOGLE_CLIENT_ID` line), or paste it once on the app's sign-in screen (only possible while it isn't built in).
4. Open the app and choose **Sign in with Google**. Do this once on each device.

The Client ID is not a secret. Without your Google sign-in it gives no access to anything.
