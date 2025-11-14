const getBallColor = (number: number): string => {
  if (number <= 10) {
    return '#FBC400';
  } else if (number <= 20) {
    return '#69C8F2';
  } else if (number <= 30) {
    return '#FF7272';
  } else if (number <= 40) {
    return '#AAAAAA';
  } else {
    return '#B0D840';
  }
};

export default getBallColor;
