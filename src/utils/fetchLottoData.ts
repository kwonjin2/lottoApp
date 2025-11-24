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

const INITIAL_BASE_DRAW_NO = 1198;

export const findLatestDrawNo = async (baseDrawNo: number): Promise<number> => {
  let latestSuccessfulDrawNo = baseDrawNo;
  let nextDrawNoToTry = baseDrawNo + 1;
  let shouldContinue = true;

  const initialBaseResult = await fetchLottoData(baseDrawNo);
  if (!initialBaseResult) {
    latestSuccessfulDrawNo = INITIAL_BASE_DRAW_NO;
    nextDrawNoToTry = INITIAL_BASE_DRAW_NO + 1;
  } else {
    latestSuccessfulDrawNo = baseDrawNo;
  }

  while (shouldContinue) {
    const nextResult = await fetchLottoData(nextDrawNoToTry);

    if (nextResult) {
      latestSuccessfulDrawNo = nextDrawNoToTry;
      nextDrawNoToTry++;
    } else {
      shouldContinue = false;
    }
  }

  return latestSuccessfulDrawNo;
};
