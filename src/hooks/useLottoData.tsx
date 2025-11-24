import { useEffect, useState } from 'react';
import {
  LottoDataType,
  fetchLottoData,
  findLatestDrawNo,
} from '../utils/fetchLottoData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_DRAW_NO_KEY = '@LastLottoDrawNo';
const INITIAL_BASE_DRAW_NO = 1198;

interface AllLottoHookResult {
  allLottoData: Record<number, LottoDataType>;
  latestLottoData: LottoDataType | null;
  isLoading: boolean;
  error: any;
}

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

      const currentLatestDrawNo = await findLatestDrawNo(baseDrawNo);

      if (!currentLatestDrawNo) {
        setError('최신 로또 회차 번호를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      const uniqueDrawNos = Array.from(
        new Set([...requiredDrawNos, currentLatestDrawNo])
      );

      const dataPromises = uniqueDrawNos.map((drwNo) => fetchLottoData(drwNo));
      const results = await Promise.all(dataPromises);

      const newAllData: Record<number, LottoDataType> = {};

      results.forEach((data) => {
        if (data) {
          newAllData[data.drwNo] = data;
        }
      });

      setAllLottoData(newAllData);
      setLatestDrawNo(currentLatestDrawNo);

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

    loadAllData();
  }, [requiredDrawNos]);

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
