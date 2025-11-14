import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import generateLottoNumbers from '../../src/utils/generateLotto';
import LottoBall from '@/src/components/LottoBall';

export default function CreateLotto() {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const newNumbers = generateLottoNumbers();
    setGeneratedNumbers(newNumbers);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>로또 번호 만들기</Text>
      <Button title="생성하기" onPress={handleGenerate} />
      <View style={styles.lottos}>
        {generatedNumbers.map((number, index) => (
          <LottoBall key={index} number={number} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 100,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  lottos: {
    flexDirection: 'row',
    gap: 10,
  },
  lotto: {
    color: '#fff',
  },
});
