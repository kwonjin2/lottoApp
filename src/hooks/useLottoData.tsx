import { useEffect, useState } from 'react';
import { LottoDataType, fetchLottoData } from '../utils/fetchLottoData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_DRAW_NO_KEY = '@LastLottoDrawNo';
const INITIAL_BASE_DRAW_NO = 1198;

interface LottoHookResult {
  lottoData: LottoDataType | null;
  isLoading: boolean;
  error: any;
}

const useLottoData = (): LottoHookResult => {
  const [lottoData, setLottoData] = useState<LottoDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadDataWithLoop = async () => {
      setIsLoading(true);
      setError(null);

      // 1. AsyncStorage에서 기본 회차 번호를 가져옵니다.
      let currentDrawNo = INITIAL_BASE_DRAW_NO;
      try {
        const storedValue = await AsyncStorage.getItem(LAST_DRAW_NO_KEY);
        if (storedValue) {
          currentDrawNo = parseInt(storedValue, 10);
        }
      } catch (e) {
        console.warn(
          'AsyncStorage에서 기본 회차 번호를 가져오지 못했습니다.',
          e
        );
      }

      let lastSuccessfulData: LottoDataType | null = null;
      let lastSuccessfulDrawNo: number = currentDrawNo;

      // 2. [핵심 로직] 마지막 성공 회차에서 +1 한 회차부터 시작
      let nextDrawNoToTry = currentDrawNo + 1;
      let shouldContinue = true;

      // 먼저 기준 회차의 데이터를 가져와서 lastSuccessfulData를 초기화합니다.
      // (AsyncStorage 값이 유효하지 않을 가능성에 대비)
      lastSuccessfulData = await fetchLottoData(currentDrawNo);

      // 만약 기준 회차마저 실패한다면, 에러 처리 후 종료
      if (!lastSuccessfulData) {
        setError(
          `시작 회차(${currentDrawNo}회) 데이터 로드 실패. API 문제일 수 있습니다.`
        );
        setIsLoading(false);
        return;
      }

      // 3. 다음 회차 요청이 실패할 때까지 무한 루프 시도
      while (shouldContinue) {
        const nextResult = await fetchLottoData(nextDrawNoToTry);

        if (nextResult) {
          // 4. 요청 성공: 이 회차가 최신 성공 회차임.
          lastSuccessfulData = nextResult;
          lastSuccessfulDrawNo = nextDrawNoToTry;
          nextDrawNoToTry++; // 다음 회차를 시도하기 위해 번호 증가
        } else {
          // 5. 요청 실패: 추첨이 아직 안 되었거나 (예: 1199회) API 오류
          shouldContinue = false; // 루프 종료
        }
      }

      // 6. 상태 업데이트 및 AsyncStorage 저장
      if (lastSuccessfulData) {
        setLottoData(lastSuccessfulData);

        try {
          // 마지막으로 성공한 회차 번호를 저장 (다음번 시작점으로 사용)
          await AsyncStorage.setItem(
            LAST_DRAW_NO_KEY,
            lastSuccessfulDrawNo.toString()
          );
        } catch (e) {
          console.error('AsyncStorage 업데이트 실패:', e);
        }
      } else {
        // 이미 위에서 초기화 실패를 처리했지만 혹시 모를 경우
        setError(
          `최신 로또 회차(${lastSuccessfulDrawNo}회) 데이터를 가져오는 데 실패했습니다.`
        );
      }

      setIsLoading(false);
    };

    loadDataWithLoop();
  }, []);

  return { lottoData, isLoading, error };
};

export default useLottoData;
