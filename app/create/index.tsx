import { View, Text, StyleSheet, Button } from 'react-native';

export default function CreateLotto() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>로또 번호 만들기</Text>
      <Button title="생성하기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 100,
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
