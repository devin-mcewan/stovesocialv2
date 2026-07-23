# StoveSocial

StoveSocial is a React Native mobile app for recipes that allows users to sign in, create, and browse recipes...the foundation for a "stove-social" recipe sharing platform.

## Features

- User sign in with Google OAuth
- Unique Profile screen showing avatar, name, and email
- Create a recipe with:
  - Title
  - Description
  - Ingredients
  - Instructions
- Browse and open recipes
  - New recipes appear in a live-updating feed

## Tech Stack

- JavaScript
- React Native
- React Navigation
- Supabase:
  - Database
  - Auth provider
  - Backend
- Expo

## Why These Choices

**Why React Native:**
React Native was a more efficient option compared to learning and deploying separately for Android and iOS. I leveraged my previous React web knowledge to adapt to React Native. I wanted an app on a user's phone so the application could be seen rather than lost in the multiple sections of multiple web browsers.

**Why Supabase:**
Supabase packed in auth, database, and API all in one. My primary focus was building up the entire app, and Supabase let me focus on application logic instead of backend infrastructure. Row-level security policies live directly on the database tables and are enforced on every query, removing the hassle of hand-writing validation checks in every route.

**Why Expo:**
Expo simplified the process of running the app on an emulator, letting me skip the native setup of Xcode and Android Studio. Expo Go — the default shared preview app — couldn't register a custom URL scheme, which Google OAuth needs to redirect back to the app correctly. Switching to an EAS Dev Build solved this by giving me my own real, installed app with its own registered scheme for the OAuth redirect to find.

**Why React Navigation:**
Without a navigation library, moving between screens in React Native would mean manually managing state and conditionally rendering different components — essentially rebuilding routing by hand. React Navigation handles this natively, and lets you pass parameters along a route using `useRoute` — this is how `RecipeDetailScreen` knows which specific recipe to fetch and display. The app uses a bottom tab navigator for top-level switching between Home, Kitchens, Add Recipe, and Profile, and a stack navigator for drilling into a specific recipe's detail view and navigating back out.

---

_README in progress — Architecture/How It Works and setup instructions coming next._

## Architecture / How It Works

**Sign In:**
Users are prompted to sign in with Google. Using Google's OAuth API, Google handles authentication and hands back an authorized user token with the user's information. That information is passed to Supabase to store our own record of the user. This user is stored in context for later reference as `session.user`. After sign-in, the user lands on the Home screen: a global feed of recipes from every user, joined with author data (display name, avatar), sorted newest first.

**Creating a Recipe:**
A user enters a recipe title, then adds ingredient rows (name, amount, unit) and instruction rows (step number, description) using dynamic, repeatable form sections — each backed by an array of objects in state, which allows adding, editing, and removing individual rows. On submit, `postRecipe` runs: the title is validated (ingredients and instructions are not currently validated), then a new row is inserted into the `recipes` table with the title and `author_id` set to the signed-in user's ID. The newly created recipe's ID is captured from the response. The ingredient and instruction state arrays are each mapped into new arrays with that `recipe_id` attached, then inserted into their respective tables. On success, form state resets and the user is alerted.

**Viewing a Recipe's Detail:**
Tapping a recipe card navigates to `RecipeDetailScreen`, passing the recipe's ID via route params. The screen fetches the recipe, its ingredients, and its instructions using that ID, with loading and not-found states handled separately. Once loaded, the screen renders the recipe's information in a scroll view, mapping over the ingredients and instructions arrays to render each as a text row, keyed by each item's database ID.

---

_README in progress — setup instructions coming next._

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/devin-mcewan/stovesocialv2.git
   cd stovesocialv2
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the project root, copying the format from `.env.example`:

   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   These values are available in your Supabase project dashboard under Project Settings > API. This project uses Supabase for its database, authentication, and backend — you'll need your own Supabase project to run a working copy.

4. Google OAuth requires its own registered credentials in Google Cloud Console, tied to a redirect URI and package name. This step currently requires manual setup — reach out to the repo owner for guidance.

5. Run the app:
   ```
   npx expo start
   ```
   Scan the QR code with Expo Go (Android) or the Camera app (iOS) to run on a physical device, or press `a` to launch on an Android emulator via an EAS Dev Build.

---

_README complete — title, features, tech stack with rationale, architecture, and setup instructions._
