import { View, Text, StyleSheet } from 'react-native';

import getBallColor from '../utils/getBallColor';

interface LottoBallProps {
  number: number;
}

export default function LottoBall({ number }: LottoBallProps) {
  const ballColor = getBallColor(number);

  return (
    <View style={[styles.ball, { backgroundColor: ballColor }]}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  numberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
