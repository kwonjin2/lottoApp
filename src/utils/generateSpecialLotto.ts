interface UserInfo {
  name: string;
  date: string;
  smileCount: number;
  immersionCount: number;
  woowahanActivity: number;
  myScore: number;
}

const LOTTO_MAX = 45;
const LOTTO_COUNT = 6;

/**
 * 6가지 지표(이름, 생년월일 + 4가지 활동 지표)를 기반으로 특별 로또 번호 6개를 생성합니다.
 *
 * 규칙:
 * 1. Personal Influence Factor (PIF)를 이름과 생년월일로 계산합니다.
 * 2. ActivityScore = 4가지 활동 지표 합산
 * 3. FinalScore = floor(ActivityScore * PIF)
 * 4. FinalScore < 20:
 * - N1 = FinalScore.
 * - 나머지 5개 번호는 N1보다 커야 합니다.
 * 5. FinalScore >= 20:
 * - N1 = floor(FinalScore / 2).
 * - 나머지 5개 번호는 1~45 사이에서 무작위로 생성됩니다.
 */
export default function generateSpecialLotto(userInfo: UserInfo): number[] {
  // 1. 이름과 생년월일을 기반으로 Personal Influence Factor (PIF) 계산

  // 이름 해시 (0-9 사이 값)
  const nameHash = Array.from(userInfo.name).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );
  const nameFactor = (userInfo.name.length * 3 + nameHash) % 10;

  // 생년월일 파싱 및 점수화 (날짜 문자열에서 숫자만 추출)
  const cleanDate = userInfo.date.replace(/[^0-9]/g, '');
  let dateFactor = 0;
  if (cleanDate.length === 8) {
    const year = parseInt(cleanDate.substring(0, 4));
    const month = parseInt(cleanDate.substring(4, 6));
    const day = parseInt(cleanDate.substring(6, 8));
    dateFactor = (year + month + day) % 10; // 0-9
  }

  // PIF: 1.0 ~ 2.0 사이의 값이 되도록 조정
  const personalInfluenceFactor = 1.0 + (nameFactor + dateFactor) / 20;

  // 2. 활동 지표 합산 (ActivityScore)
  const activityScore =
    userInfo.smileCount +
    userInfo.immersionCount +
    userInfo.woowahanActivity +
    userInfo.myScore;

  // 3. 최종 점수 (FinalScore) 계산: 활동 점수에 개인 요소를 반영
  const finalScore = Math.floor(activityScore * personalInfluenceFactor);

  let firstLottoNumber: number;
  let minNextNumber: number = 1;

  // 4. 규칙에 따라 N1 및 최소 범위 설정 (FinalScore 사용)
  if (finalScore < 20) {
    // Case 1: FinalScore < 20
    // N1을 FinalScore로 설정 (최소 1, 최대 19)
    firstLottoNumber = Math.max(
      1,
      Math.min(finalScore, LOTTO_MAX - LOTTO_COUNT + 1)
    );

    // 나머지 번호는 N1보다 커야 함
    minNextNumber = firstLottoNumber + 1;
  } else {
    // Case 2: FinalScore >= 20
    // N1 = floor(FinalScore / 2)
    firstLottoNumber = Math.floor(finalScore / 2);

    // N1이 45를 초과하지 않도록 보장
    firstLottoNumber = Math.max(1, Math.min(LOTTO_MAX, firstLottoNumber));

    // 나머지 번호는 1부터 시작 가능 (표준 랜덤)
    minNextNumber = 1;
  }

  // 5. 6개 번호 생성
  const generatedNumbers: Set<number> = new Set();

  // N1 추가
  generatedNumbers.add(firstLottoNumber);

  // N1을 제외하고, minNextNumber보다 크거나 같은 숫자로 풀(Pool) 생성
  let availablePool = Array.from({ length: LOTTO_MAX }, (_, i) => i + 1).filter(
    (n) => n >= minNextNumber && n !== firstLottoNumber
  );

  // 나머지 5개의 숫자를 무작위로 뽑습니다.
  while (generatedNumbers.size < LOTTO_COUNT) {
    if (availablePool.length === 0) break;

    const randomIndex = Math.floor(Math.random() * availablePool.length);
    const selectedNumber = availablePool[randomIndex];

    generatedNumbers.add(selectedNumber);

    // 중복 방지를 위해 풀에서 제거
    availablePool.splice(randomIndex, 1);
  }

  // 최종적으로 오름차순 정렬하여 반환
  return Array.from(generatedNumbers).sort((a, b) => a - b);
}
