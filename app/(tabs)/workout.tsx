import { Text, View } from 'react-native';
import { styled } from 'tailwindcss-react-native';

const Container = styled(View);
const Title = styled(Text);

export default function WorkoutScreen() {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      <Title className="text-2xl font-bold text-blue-600">Workout Page</Title>
    </Container>
  );
}
