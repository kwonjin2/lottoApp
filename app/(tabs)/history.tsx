import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottoBall from '@/src/components/LottoBall';
import LottoInfo from '@/src/components/LottoInfo';

interface LottoEntry {
  id: number;
  numbers: number[];
  date: string;
}

const STORAGE_KEY = '@lotto_purchase_history';

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<LottoEntry[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue !== null) {
          setHistoryData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load', e);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <LottoInfo />
      <Text style={styles.header}>구매 기록</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.fullWidthScroll}
      >
        {historyData
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
  fullWidthScroll: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
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
  lottoBallContainer: {
    flexDirection: 'row',
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
});
