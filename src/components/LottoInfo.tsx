import { View, Text, StyleSheet } from 'react-native';
import LottoBall from './LottoBall';

interface LottoInfoProps {
  drwNo: number;
  drwNoDate: string;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

export default function LottoInfo({
  drwNo,
  drwNoDate,
  drwtNo1,
  drwtNo2,
  drwtNo3,
  drwtNo4,
  drwtNo5,
  drwtNo6,
  bnusNo,
}: LottoInfoProps) {
  return (
    <View style={{ flex: 0.34, marginBottom: 10 }}>
      <Text style={styles.header}>🏆 로또 {drwNo}회 당첨 정보</Text>
      <View style={styles.historyItem}>
        <Text style={styles.historyDate}>추첨일: {drwNoDate}</Text>
        <View style={{ flexDirection: 'row', position: 'relative', left: -12 }}>
          <LottoBall number={drwtNo1} />
          <LottoBall number={drwtNo2} />
          <LottoBall number={drwtNo3} />
          <LottoBall number={drwtNo4} />
          <LottoBall number={drwtNo5} />
          <LottoBall number={drwtNo6} />
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
          <LottoBall number={bnusNo} />
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
