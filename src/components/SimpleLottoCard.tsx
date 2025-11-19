import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottoBall from './LottoBall';

interface SimpleLottoCardProps {
  generatedNumbers: number[];
  onGenerate: () => void;
}

export default function SimpleLottoCard({
  generatedNumbers,
  onGenerate,
}: SimpleLottoCardProps) {
  return (
    <View style={simpleLottoStyles.simpleLotto}>
      <Text style={simpleLottoStyles.simpleHeader}>⚡️초간단 로또</Text>
      <Text style={simpleLottoStyles.simpleText}>
        클릭 한 번으로 랜덤 번호를
      </Text>
      <Text style={simpleLottoStyles.simpleText}>즉시 생성해드려요</Text>
      <View style={simpleLottoStyles.lottoContainer}>
        <View style={simpleLottoStyles.generateLotto}>
          {generatedNumbers.length === 0 ? (
            <Text style={simpleLottoStyles.emptyText}>
              생성된 번호가 여기에 표시됩니다.
            </Text>
          ) : (
            <View style={simpleLottoStyles.lottos}>
              {generatedNumbers.map((number, index) => (
                <LottoBall key={index} number={number} />
              ))}
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={simpleLottoStyles.generateButton}
        onPress={onGenerate}
      >
        <Text style={simpleLottoStyles.generateButtonText}>번호 생성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const simpleLottoStyles = StyleSheet.create({
  simpleLotto: {
    width: 360,
    height: 300,
    backgroundColor: '#34383D',
    borderRadius: 20,
    position: 'relative',
    paddingBottom: 20,
  },
  simpleHeader: {
    marginLeft: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
  },
  simpleText: {
    marginLeft: 20,
    color: '#B0B0B0',
    fontSize: 18,
    marginBottom: 2,
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
