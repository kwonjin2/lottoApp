import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import LottoBall from './LottoBall';
import useLottoData from '@/src/hooks/useLottoData';

export default function LottoInfo() {
  const { lottoData, isLoading, error } = useLottoData();
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  if (!lottoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>데이터 로드에 실패했습니다.</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 0.34, marginBottom: 10 }}>
      <Text style={styles.header}>🏆 로또 {lottoData.drwNo}회 당첨 정보</Text>
      <View style={styles.historyItem}>
        <Text style={styles.historyDate}>추첨일: {lottoData.drwNoDate}</Text>
        <View style={{ flexDirection: 'row', position: 'relative', left: -12 }}>
          <LottoBall number={lottoData.drwtNo1} />
          <LottoBall number={lottoData.drwtNo2} />
          <LottoBall number={lottoData.drwtNo3} />
          <LottoBall number={lottoData.drwtNo4} />
          <LottoBall number={lottoData.drwtNo5} />
          <LottoBall number={lottoData.drwtNo6} />
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            +
          </Text>
          <LottoBall number={lottoData.bnusNo} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  historyDate: {
    color: '#B0B0B0',
    fontSize: 12,
    marginBottom: 5,
  },
  historyItem: {
    backgroundColor: '#34383D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  errorText: { color: 'red' },
});
