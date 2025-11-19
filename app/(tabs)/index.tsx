import { View, Text, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import generateLottoNumbers from '@/src/utils/generateLotto';
import generateSpecialLotto from '@/src/utils/generateSpecialLotto';
import LottoCard from '@/src/components/LottoCard';
import LottoModal from '@/src/components/LottoModal';

interface LottoEntry {
  id: number;
  numbers: number[];
  date: string;
}

const STORAGE_KEY = '@lotto_purchase_history';

export default function CreateLotto() {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [specialNumbers, setSpecialNumbers] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<LottoEntry[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue !== null) {
          setPurchaseHistory(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load purchase history:', e);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const saveHistory = async () => {
      try {
        const jsonValue = JSON.stringify(purchaseHistory);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        console.error('Failed to save purchase history:', e);
      }
    };
    saveHistory();
  }, [purchaseHistory]);

  const handleSimpleGenerate = () => {
    const newNumbers = generateLottoNumbers();
    setGeneratedNumbers(newNumbers);
    setSpecialNumbers([]);
  };

  const handleSpecialGenerate = () => {
    setIsModalVisible(true);
  };

  const handleModalGenerate = (userInfo: { name: string; date: string }) => {
    const newSpecialNumbers = generateSpecialLotto(userInfo);

    setGeneratedNumbers([]);
    setSpecialNumbers(newSpecialNumbers);
    setIsModalVisible(false);
  };

  const handlePurchase = () => {
    const numbersToPurchase =
      specialNumbers.length > 0 ? specialNumbers : generatedNumbers;

    const newEntry: LottoEntry = {
      id: Date.now(),
      numbers: [...numbersToPurchase],
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    alert('해당 로또 번호를 구매했습니다.\n 기록 페이지에서 확인해 보세요.');
    setPurchaseHistory((prev) => [...prev, newEntry]);

    setGeneratedNumbers([]);
    setSpecialNumbers([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LUCKY COMPASS</Text>
      <LottoCard
        header="⚡️초간단 로또"
        description={['클릭 한 번으로 랜덤 번호를', '즉시 생성해드려요']}
        generatedNumbers={generatedNumbers}
        onGenerate={handleSimpleGenerate}
        purchaseLotto={handlePurchase}
        buttonTitle="번호 생성하기"
        buttonColor="#FFD700"
        buttonTextColor="#25292e"
      />

      <LottoCard
        header="✨ 특별 로또"
        description={[
          '나만의 특별한 숫자를 기반으로',
          '맞춤형 로또를 생성해보세요',
        ]}
        generatedNumbers={specialNumbers}
        onGenerate={handleSpecialGenerate}
        purchaseLotto={handlePurchase}
        buttonTitle="특별 생성하기"
        buttonColor="#8BC34A"
        buttonTextColor="#fff"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <LottoModal
          onClose={() => setIsModalVisible(false)}
          onGenerate={handleModalGenerate}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 50,
    gap: 28,
    alignItems: 'center',
    marginTop: 21,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
