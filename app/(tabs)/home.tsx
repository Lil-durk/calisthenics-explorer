import { Text, View } from 'react-native';
import { styled } from 'tailwindcss-react-native';

const Container = styled(View);
const Title = styled(Text);

export default function HomeScreen() {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      <Title className="text-lg text-purple-600">Home screen</Title>
    </Container>
  );
}
