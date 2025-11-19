import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottoBall from '@/src/components/LottoBall';

interface LottoEntry {
  id: number;
  numbers: number[];
  date: string;
}

export default function HistoryPage() {
  const [data, setData] = useState<LottoEntry[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@lotto_purchase_history');
        if (jsonValue !== null) {
          setData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load', e);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>구매 기록</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data
          .slice()
          .reverse()
          .map((entry) => (
            <View key={entry.id} style={styles.historyItem}>
              <Text style={styles.historyDate}>{entry.date}</Text>
              <View style={styles.lotto}>
                <View style={styles.lottoBallContainer}>
                  {entry.numbers.map((num, idx) => (
                    <LottoBall key={`${entry.id}-${idx}`} number={num} />
                  ))}
                </View>
                <View
                  style={{
                    width: 30,
                    height: 20,
                    backgroundColor: '#fff',
                    marginLeft: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                  }}
                >
                  <Text>대기</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  scrollViewContent: {
    width: 360,
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: '#34383D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  lottoBallContainer: {
    flexDirection: 'row', // 가로 배열
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lotto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyDate: {
    color: '#B0B0B0',
    fontSize: 12,
    marginBottom: 5,
  },
  historyNumbers: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
