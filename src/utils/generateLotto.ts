export const generateLottoNumbers = (): number[] => {
  const lottoNumbers = new Set<number>();
  const MAX_NUMBER = 45;
  const COUNT = 6;

  while (lottoNumbers.size < COUNT) {
    const random = Math.floor(Math.random() * MAX_NUMBER) + 1;

    lottoNumbers.add(random);
  }

  const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

  return sortedNumbers;
};
