import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>나만의 Lotto 생성기</Text>
      <View style={styles.button}>
        <Button title="번호 생성하기" />
        <Button title="기록 보기" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 100,
    // justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
});
