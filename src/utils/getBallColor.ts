const getBallColor = (number: number): string => {
  if (number <= 10) {
    return '#f2b720';
  } else if (number <= 20) {
    return '#4072ac';
  } else if (number <= 30) {
    return '#de4c0e';
  } else if (number <= 40) {
    return '#9195a4';
  } else {
    return '#13be4b';
  }
};

export default getBallColor;
