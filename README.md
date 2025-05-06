# 🏋️‍♂️ Calisthenics Explorer

A mobile app built with [**Expo Router**](https://expo.dev/router) and styled using [**Tailwind CSS for React Native**](https://github.com/jaredh159/tailwindcss-react-native). This app is designed with performance and scalability in mind and includes a simple 4-page tab navigation structure.

---

## 📱 Tech Stack

| Tech                  | Description                                           |
|-----------------------|-------------------------------------------------------|
| **Expo**              | Framework for universal React apps                   |
| **Expo Router**       | File-based routing for Expo                          |
| **React Native**      | Framework for building native apps with React        |
| **TypeScript**        | Strongly typed JavaScript for better tooling         |
| **Tailwind CSS RN**   | Utility-first styling for React Native components    |

---

## 🧠 Folder Structure (Simplified)

```bash
calisthenics-explorer/
├── app/                    # Screens and routing
│   ├── _layout.tsx         # Root layout (TailwindProvider)
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── _layout.tsx     # Tabs layout
│   │   ├── index.tsx       # Home
│   │   ├── about.tsx       # About
│   │   ├── contact.tsx     # Contact
│   │   └── settings.tsx    # Settings
│   └── +not-found.tsx      # 404 page
├── components/             # UI components
├── assets/                 # Fonts, images
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

### 2. **Install Tailwind CSS for React Native**

```bash
npm install tailwindcss-react-native
npx tailwindcss-react-native init
```

### 3. **Configure Tailwind**

In the root, create or update `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 4. **Run the App**

```bash
npx expo start
```

- Use the Expo Go app or an Android/iOS emulator to preview.

---

## 🧪 Screens Included

| Screen     | Path                 | Description                |
|------------|----------------------|----------------------------|
| **Home**   | `/`                  | Welcome screen             |
| **About**  | `/about`             | Info about the app         |
| **Contact**| `/contact`           | Contact information        |
| **Settings**| `/settings`         | App configuration/settings |

All styled using `className="..."` with Tailwind utility classes via `tailwindcss-react-native`.

---

## ✨ Example Styling

Example usage of Tailwind styling in a screen:

```tsx
import { View, Text } from 'react-native';
import { styled } from 'tailwindcss-react-native';

const Container = styled(View);
const Title = styled(Text);

export default function HomeScreen() {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      <Title className="text-2xl font-bold text-blue-600">Welcome</Title>
    </Container>
  );
}
```

---

## 🔄 Tips for Development

- Restart Expo server after Tailwind config changes:  
  ```bash
  npx expo start --clear
  ```

- Tailwind classes update live with Fast Refresh.

---

## 🛠️ Future Plans

- Add navigation icons
- Integrate async storage and user data
- Add custom fonts and themes
- Connect backend or Firebase
- Offline support

---

## 🧑‍💻 Authors

Developed by [Dirk van der Enden & Sil van Tiel]  
Feel free to fork and contribute!

---

## 📜 License

This project is not licensed under the MIT License.
