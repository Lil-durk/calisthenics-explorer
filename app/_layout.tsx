// app/_layout.tsx
import { Slot } from 'expo-router';
import { TailwindProvider } from 'tailwindcss-react-native';

export default function RootLayout() {
  return (
    <TailwindProvider>
      <Slot />
    </TailwindProvider>
  );
}
