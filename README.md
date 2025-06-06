# 🏋️‍♂️ Calisthenics Explorer

A mobile app built with [**Expo Router**](https://expo.dev/router) and styled using [**Tailwind CSS for React Native**](https://github.com/jaredh159/tailwindcss-react-native). The app helps users explore calisthenics parks in the Netherlands, featuring a map with clustering, custom icons, and real-time park data from OpenStreetMap.

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- (Optional) Android Studio or Xcode for emulators

---

## 📱 Tech Stack

| Tech                  | Description                                           |
|-----------------------|-------------------------------------------------------|
| **Expo**              | Framework for universal React apps                   |
| **Expo Router**       | File-based routing for Expo                          |
| **React Native**      | Framework for building native apps with React        |
| **TypeScript**        | Strongly typed JavaScript for better tooling         |
| **Tailwind CSS RN**   | Utility-first styling for React Native components    |
| **react-native-maps** | Native maps for React Native                         |
| **react-native-svg**  | SVG support for React Native                         |

---

## 🧠 Folder Structure (Simplified)

```bash
calisthenics-explorer/
├── app/                    # Screens and routing
│   ├── _layout.tsx         # Root layout (TailwindProvider)
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── _layout.tsx     # Tabs layout
│   │   ├── index.tsx       # Map (Home)
│   │   ├── profile.tsx     # Profile tab
│   │   ├── favorites.tsx   # Favorites tab
│   │   └── settings.tsx    # Settings tab
│   ├── data/               # Static/sample data
│   ├── services/           # API services (e.g. Overpass API)
│   └── utils/              # Utility functions (e.g. clustering)
├── assets/                 # Fonts, images, icons
│   └── images/             # Marker and cluster icons (PNG/SVG)
├── tailwind.config.js      # Tailwind config
├── package.json
└── ...
```

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Run the App**

```bash
npx expo start
```

- Use the Expo Go app or an Android/iOS emulator to preview.

---

## 🔑 API Keys

- This app uses OpenStreetMap (Overpass API) for park data (no API key required).
- For Google Maps (if you want to use Google as the map provider), you may need to set up an API key in `app.json` or `app.config.js`. See [Expo Maps docs](https://docs.expo.dev/versions/latest/sdk/map-view/) for details.

---

## 🗺️ Main Features

- **Map with Calisthenics Parks**: Shows parks in the Netherlands using real-time data from OpenStreetMap (Overpass API).
- **Clustering**: Nearby parks are grouped into clusters with a custom icon and a number overlay. If there are more than 10 clusters, they are merged into super-clusters for performance and clarity.
- **Custom Icons**: Uses PNG icons for both individual parks and clusters (see `assets/images`).
- **Tab Navigation**: Four main tabs (Map, Profile, Favorites, Settings).
- **Responsive UI**: Styled with Tailwind CSS for React Native.

---

## 🧪 Tabs/Screens Included

| Tab         | Path                  | Description                         |
|-------------|-----------------------|-------------------------------------|
| **Map**     | `/`                   | Main map with parks and clusters    |
| **Profile** | `/profile`            | User profile (placeholder)          |
| **Workout** | `/workout`            | Workout list (placeholder)          |
| **Socials** | `/social`             | Community page to share experience  |

---

## ⚡ Data & Clustering

- **Real-time data**: Parks are fetched live from OpenStreetMap using the Overpass API, based on the current map region.
- **Clustering**: Custom clustering logic ensures the map remains performant and readable, even with many parks.
- **Custom icons**: Place your PNG icons in `assets/images` and reference them in the code with `require()`.

---

## 🛠️ Development Tips

- Restart Expo server after config changes:
  ```bash
  npx expo start --clear
  ```
- Tailwind classes update live with Fast Refresh.
- For custom icons, place PNGs in `assets/images` and import with `require()`.
- For SVG support, use `react-native-svg` and `react-native-svg-transformer` (if needed).

---

## 🐞 Known Issues / Limitations

- Some parks may be missing or incorrectly tagged in OpenStreetMap.
- Clustering is grid-based and may not always perfectly group parks visually.
- Large custom icons may be cropped due to React Native Maps marker limitations.
- No authentication or persistent user data (yet).

---

## 🤝 Support

- For questions, open an issue or contact Dirk van der Enden or Sil van Tiel.

---

## 🧑‍💻 Authors

Developed by [Dirk van der Enden & Sil van Tiel]  

---

## 📜 License

This project is not licensed under the MIT License.
