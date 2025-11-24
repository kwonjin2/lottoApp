import { useEffect, useState } from 'react';
import {
  LottoDataType,
  fetchLottoData,
  findLatestDrawNo,
} from '../utils/fetchLottoData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_DRAW_NO_KEY = '@LastLottoDrawNo';
const INITIAL_BASE_DRAW_NO = 1198;

// 1. 반환 인터페이스
interface AllLottoHookResult {
  allLottoData: Record<number, LottoDataType>;
  latestLottoData: LottoDataType | null;
  isLoading: boolean;
  error: any;
}

// 2. 훅의 인수를 추가 (HistoryPage에서 전달할 requiredDrawNos)
const useLottoData = (requiredDrawNos: number[]): AllLottoHookResult => {
  const [allLottoData, setAllLottoData] = useState<
    Record<number, LottoDataType>
  >({});
  const [latestDrawNo, setLatestDrawNo] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);

      // 1. AsyncStorage에서 마지막 성공 회차 번호를 가져오거나 기본값 설정
      let baseDrawNo = INITIAL_BASE_DRAW_NO;
      try {
        const storedValue = await AsyncStorage.getItem(LAST_DRAW_NO_KEY);
        if (storedValue) {
          baseDrawNo = parseInt(storedValue, 10);
        }
      } catch (e) {
        console.warn(
          'AsyncStorage에서 기본 회차 번호를 가져오지 못했습니다.',
          e
        );
      }

      // 2. 최신 회차 번호를 찾습니다.
      const currentLatestDrawNo = await findLatestDrawNo(baseDrawNo);

      if (!currentLatestDrawNo) {
        setError('최신 로또 회차 번호를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      // 3. 필요한 모든 회차 번호 목록 생성 (구매 기록 + 최신 회차)
      // requiredDrawNos가 비어 있어도 currentLatestDrawNo는 포함됨
      const uniqueDrawNos = Array.from(
        new Set([
          ...requiredDrawNos, // HistoryPage에서 전달받은 구매 기록 회차
          currentLatestDrawNo, // 현재 가장 최신 당첨 회차
        ])
      );

      // 4. 모든 회차 데이터 병렬 요청
      const dataPromises = uniqueDrawNos.map((drwNo) => fetchLottoData(drwNo));
      const results = await Promise.all(dataPromises);

      const newAllData: Record<number, LottoDataType> = {};

      results.forEach((data) => {
        if (data) {
          newAllData[data.drwNo] = data;
        }
      });

      // 5. 상태 업데이트
      setAllLottoData(newAllData);
      setLatestDrawNo(currentLatestDrawNo);

      // 6. AsyncStorage 업데이트
      try {
        await AsyncStorage.setItem(
          LAST_DRAW_NO_KEY,
          currentLatestDrawNo.toString()
        );
      } catch (e) {
        console.error('AsyncStorage 업데이트 실패:', e);
      }

      setIsLoading(false);
    };

    // 🎯 수정된 핵심: requiredDrawNos의 길이에 관계없이 무조건 loadAllData()를 호출합니다.
    loadAllData();

    // Note: 이전에 있던 'else' 블록 (requiredDrawNos.length > 0)은 제거되었습니다.
  }, [requiredDrawNos]);

  // 최종 반환 객체 구성
  const latestLottoData = latestDrawNo
    ? allLottoData[latestDrawNo] || null
    : null;

  return {
    allLottoData,
    latestLottoData,
    isLoading,
    error,
  };
};

export default useLottoData;
