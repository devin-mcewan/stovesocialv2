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
