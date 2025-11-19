import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import generateLottoNumbers from '@/src/utils/generateLotto';
import SimpleLottoCard from '@/src/components/SimpleLottoCard';

export default function CreateLotto() {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const newNumbers = generateLottoNumbers();
    setGeneratedNumbers(newNumbers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LUCKY COMPASS</Text>
      <SimpleLottoCard
        generatedNumbers={generatedNumbers}
        onGenerate={handleGenerate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 50,
    gap: 40,
    alignItems: 'center',
    marginTop: 21,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
