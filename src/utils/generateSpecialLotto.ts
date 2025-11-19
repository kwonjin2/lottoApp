interface UserInfo {
  name: string;
  date: string;
}

const LOTTO_MAX = 45;
const LOTTO_COUNT = 6;
const LCG_MULTIPLIER = 17;
const LCG_INCREMENT = 19;

/**
 * 1. 이름과 생년월일을 기반으로 복잡한 시드(Seed) 값을 생성합니다.
 * YYYY.MM.DD 또는 YYYYMMDD 형태를 처리합니다.
 */
function generateSeed(userInfo: UserInfo): number {
  // 🎯 수정된 부분: 날짜 문자열에서 마침표(.) 등 비숫자 문자를 제거하고 8자리 숫자로 만듭니다.
  const cleanDate = userInfo.date.replace(/[^0-9]/g, '');

  if (cleanDate.length !== 8) {
    // 날짜 형식이 올바르지 않으면 기본 시드를 반환 (오류 방지)
    return (Date.now() % LOTTO_MAX) + 1;
  }

  const birthYear = parseInt(cleanDate.substring(0, 4)) % 100;
  const birthMonth = parseInt(cleanDate.substring(4, 6));
  const birthDay = parseInt(cleanDate.substring(6, 8));

  // A: 이름 해시 (글자 수 + 유니코드 합산의 일부)
  const nameLength = userInfo.name.length;
  const unicodeSum = Array.from(userInfo.name).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );
  const A = (nameLength * 5 + unicodeSum) % LOTTO_MAX;

  // B: 생년월일 합
  const B = (birthMonth + birthDay + birthYear) % LOTTO_MAX;

  // C: 고유 시점 값
  const C = (Date.now() % 997) % LOTTO_MAX;

  // D: 특수 가중치
  const D = 7;

  // 최종 시드: 가중치를 적용한 복잡한 조합
  let finalSeed = Math.floor(A * 1 + B * 2 + C * 0.5 + D * 3);

  finalSeed = (finalSeed % LOTTO_MAX) + 1;

  return Math.min(finalSeed, LOTTO_MAX);
}

/**
 * 2. 생성된 시드를 기반으로 비선형(LCG 유사) 방식으로 로또 번호 6개를 생성합니다.
 */
export default function generateSpecialLotto(userInfo: UserInfo): number[] {
  const initialSeed = generateSeed(userInfo);
  const generatedNumbers: Set<number> = new Set();

  let currentNumber = initialSeed;

  for (let i = 0; i < LOTTO_COUNT; i++) {
    let nextNumber: number;

    if (i === 0) {
      nextNumber = initialSeed;
    } else {
      // LCG 유사 방식 적용: X(n+1) = (a * X(n) + c) mod m + 1
      nextNumber =
        ((LCG_MULTIPLIER * currentNumber + LCG_INCREMENT) % LOTTO_MAX) + 1;
    }

    // 중복 방지 로직
    let attemptCount = 0;
    while (generatedNumbers.has(nextNumber) && attemptCount < LOTTO_MAX) {
      currentNumber = nextNumber;
      nextNumber =
        ((LCG_MULTIPLIER * currentNumber + LCG_INCREMENT) % LOTTO_MAX) + 1;
      attemptCount++;
    }

    // 최종 대체: 중복을 피할 수 없다면 표준 랜덤 사용
    if (generatedNumbers.has(nextNumber)) {
      let randomFallback;
      do {
        randomFallback = Math.floor(Math.random() * LOTTO_MAX) + 1;
      } while (generatedNumbers.has(randomFallback));
      nextNumber = randomFallback;
    }

    generatedNumbers.add(nextNumber);
    currentNumber = nextNumber;
  }

  return Array.from(generatedNumbers).sort((a, b) => a - b);
}
