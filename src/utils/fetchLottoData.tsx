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
      console.warn(`데이터 로드 실패: ${data.returnValue}`);
      return null;
    }

    return data;
  } catch (e) {
    console.error('데이터 가져오는 중 오류 발생:', e);
    return null;
  }
};
