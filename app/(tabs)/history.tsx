import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottoBall from '@/src/components/LottoBall';
import LottoInfo from '@/src/components/LottoInfo';
import useLottoData from '@/src/hooks/useLottoData';

interface LottoEntry {
  id: number;
  numbers: number[];
  date: string;
  drwNo: number;
}

const STORAGE_KEY = '@lotto_purchase_history';

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<LottoEntry[]>([]);
  const { lottoData, isLoading, error } = useLottoData();

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

  if (isLoading) {
    return <Text style={{ flex: 1 }}>로딩중...</Text>;
  }

  if (error || !lottoData) {
    return <Text style={{ flex: 1 }}>데이터를 불러올 수 없습니다.</Text>;
  }

  const currentWinNums: WinningNumbers = {
    drwtNo1: lottoData.drwtNo1,
    drwtNo2: lottoData.drwtNo2,
    drwtNo3: lottoData.drwtNo3,
    drwtNo4: lottoData.drwtNo4,
    drwtNo5: lottoData.drwtNo5,
    drwtNo6: lottoData.drwtNo6,
    bnusNo: lottoData.bnusNo,
  };

  return (
    <View style={styles.container}>
      <LottoInfo
        drwNo={lottoData.drwNo}
        drwNoDate={lottoData.drwNoDate}
        drwtNo1={lottoData.drwtNo1}
        drwtNo2={lottoData.drwtNo2}
        drwtNo3={lottoData.drwtNo3}
        drwtNo4={lottoData.drwtNo4}
        drwtNo5={lottoData.drwtNo5}
        drwtNo6={lottoData.drwtNo6}
        bnusNo={lottoData.bnusNo}
      />
      <Text style={styles.header}>구매 기록</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.fullWidthScroll}
      >
        {historyData
          .slice()
          .reverse()
          .map((entry) => {
            let statusText = '대기';
            let statusColor = '#fff';
            let statusBgColor = '#34383D';

            if (entry.drwNo < lottoData.drwNo) {
              const rank = calculateRank(entry.numbers, currentWinNums);
              statusText = rank;

              if (rank === '낙첨') {
                statusColor = '#FF6347';
              } else if (rank === '대기') {
                statusColor = '#fff';
              } else {
                statusColor = '#32CD32';
                statusBgColor = '#34383D';
              }
            } else if (entry.drwNo === lottoData.drwNo) {
              const rank = calculateRank(entry.numbers, currentWinNums);
              statusText = rank;

              if (rank === '낙첨') {
                statusColor = '#FF6347';
              } else {
                statusColor = '#32CD32';
              }
            } else {
              statusText = '대기';
              statusColor = '#B0B0B0';
            }

            return (
              <View key={entry.id} style={styles.historyItem}>
                <Text style={styles.historyDate}>
                  {entry.date} ({entry.drwNo}회)
                </Text>
                <View style={styles.lotto}>
                  <View style={styles.lottoBallContainer}>
                    {entry.numbers.map((num, idx) => (
                      <LottoBall key={`${entry.id}-${idx}`} number={num} />
                    ))}
                  </View>
                  <View
                    style={[
                      styles.statusBox,
                      {
                        backgroundColor: statusBgColor,
                        borderColor: statusColor,
                      },
                    ]}
                  >
                    <Text style={{ color: statusColor, fontWeight: 'bold' }}>
                      {statusText}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
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
  statusBox: {
    width: 45,
    height: 20,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
  },
});

interface WinningNumbers {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

const calculateRank = (
  purchasedNumbers: number[],
  winningNumbers: WinningNumbers
): string => {
  const winNums = [
    winningNumbers.drwtNo1,
    winningNumbers.drwtNo2,
    winningNumbers.drwtNo3,
    winningNumbers.drwtNo4,
    winningNumbers.drwtNo5,
    winningNumbers.drwtNo6,
  ];
  const bonusNum = winningNumbers.bnusNo;

  let matchCount = 0;
  for (const num of purchasedNumbers) {
    if (winNums.includes(num)) {
      matchCount++;
    }
  }

  const hasBonus = purchasedNumbers.includes(bonusNum);

  switch (matchCount) {
    case 6:
      return '1등';
    case 5:
      return hasBonus ? '2등' : '3등';
    case 4:
      return '4등';
    case 3:
      return '5등';
    default:
      return '낙첨';
  }
};
