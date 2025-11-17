import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import generateLottoNumbers from '@/src/utils/generateLotto';
import LottoBall from '@/src/components/LottoBall';

export default function CreateLotto() {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const router = useRouter();

  const handleGenerate = () => {
    const newNumbers = generateLottoNumbers();
    setGeneratedNumbers(newNumbers);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Button title="뒤로 가기" onPress={goBack} />
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
    paddingTop: 50,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  lottos: {
    flexDirection: 'row',
    gap: 10,
  },
});
