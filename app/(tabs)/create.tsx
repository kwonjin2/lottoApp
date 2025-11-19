import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import generateLottoNumbers from '@/src/utils/generateLotto';
import LottoBall from '@/src/components/LottoBall';

export default function CreateLotto() {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const newNumbers = generateLottoNumbers();
    setGeneratedNumbers(newNumbers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LUCKY COMPASS</Text>
      <View style={styles.simpleLotto}>
        <Text style={styles.simpleHeader}>⚡️초간단 로또</Text>
        <Text style={styles.simpleText}>클릭 한 번으로 랜덤 번호를</Text>
        <Text style={styles.simpleText}>즉시 생성해드려요</Text>
        <View style={styles.lottoContainer}>
          <View style={styles.generateLotto}>
            {generatedNumbers.length === 0 ? (
              <Text style={styles.emptyText}>
                생성된 번호가 여기에 표시됩니다.
              </Text>
            ) : (
              <View style={styles.lottos}>
                {generatedNumbers.map((number, index) => (
                  <LottoBall key={index} number={number} />
                ))}
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
        >
          <Text style={styles.generateButtonText}>번호 생성하기</Text>
        </TouchableOpacity>
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
    gap: 40,
    alignItems: 'center',
    marginTop: 21,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  simpleLotto: {
    width: 360,
    height: 300,
    backgroundColor: '#34383D',
    borderRadius: 20,
  },
  simpleHeader: {
    marginLeft: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
  },
  simpleText: {
    marginLeft: 20,
    color: '#B0B0B0',
    fontSize: 18,
  },
  lottoContainer: {
    alignItems: 'center',
    marginTop: 17,
  },
  generateLotto: {
    width: 330,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#2A2D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6A6A6A',
  },
  lottos: {
    flexDirection: 'row',
    gap: 6,
  },
  generateButton: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    height: 45,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#25292e',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
