import { Text, View } from 'react-native';
import { styled } from 'tailwindcss-react-native';

const Container = styled(View);
const Title = styled(Text);

export default function ProfileScreen() {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      <Title className="text-2xl font-semibold text-green-700">Profile screen</Title>
    </Container>
  );
}
