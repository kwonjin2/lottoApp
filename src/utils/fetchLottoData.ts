export interface LottoDataType {
  totSellamnt: number;
  returnValue: 'success' | 'fail';
  drwNoDate: string;
  firstWinamnt: number;
  drwtNo6: number;
  drwtNo4: number;
  firstPrzwnerCo: number;
  drwtNo5: number;
  bnusNo: number;
  firstAccumamnt: number;
  drwNo: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo1: number;
}

export const fetchLottoData = async (
  drwNo: number
): Promise<LottoDataType | null> => {
  const url = `https://dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status:${response.status}`);
    }

    const data = await response.json();

    if (data.returnValue !== 'success') {
      // 추첨 전이거나 데이터 없는 경우
      return null;
    }

    return data;
  } catch (e) {
    console.error(
      `[fetchLottoData] ${drwNo}회 데이터 가져오는 중 오류 발생:`,
      e
    );
    return null;
  }
};

const INITIAL_BASE_DRAW_NO = 1198; // 시작 탐색 회차

/**
 * API를 반복 호출하여 현재 시점의 가장 최신 당첨 회차 번호를 찾습니다.
 * @param baseDrawNo AsyncStorage에 저장된 마지막 성공 회차 번호
 * @returns 가장 최신 당첨이 확인된 회차 번호
 */
export const findLatestDrawNo = async (baseDrawNo: number): Promise<number> => {
  let latestSuccessfulDrawNo = baseDrawNo;
  let nextDrawNoToTry = baseDrawNo + 1;
  let shouldContinue = true;

  // 1. baseDrawNo가 유효한지 확인. 유효하지 않다면 INITIAL_BASE_DRAW_NO부터 다시 탐색 시작
  const initialBaseResult = await fetchLottoData(baseDrawNo);
  if (!initialBaseResult) {
    latestSuccessfulDrawNo = INITIAL_BASE_DRAW_NO;
    nextDrawNoToTry = INITIAL_BASE_DRAW_NO + 1;
  }
  // baseDrawNo가 유효하다면, 그 회차부터 탐색을 시작합니다.
  else {
    latestSuccessfulDrawNo = baseDrawNo;
  }

  // 2. 다음 회차 요청이 실패할 때까지 반복 탐색
  while (shouldContinue) {
    const nextResult = await fetchLottoData(nextDrawNoToTry);

    if (nextResult) {
      // 요청 성공: 최신 회차 번호 업데이트 및 다음 회차 시도
      latestSuccessfulDrawNo = nextDrawNoToTry;
      nextDrawNoToTry++;
    } else {
      // 요청 실패: 추첨이 아직 안 되었거나 (대부분의 경우) API 오류
      shouldContinue = false;
    }
  }

  return latestSuccessfulDrawNo;
};
