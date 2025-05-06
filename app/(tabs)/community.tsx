import { Text, View } from 'react-native';
import { styled } from 'tailwindcss-react-native';

const Container = styled(View);
const Title = styled(Text);

export default function CommunityScreen() {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      <Title className="text-base text-gray-800">Community screen</Title>
    </Container>
  );
}
