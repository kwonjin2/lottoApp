import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function SpecialCreatePage() {
  const [text, setText] = useState('');

  const handleText = (inputText: string) => {
    setText(inputText);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>나만의 로또 만들기</Text>
      <TextInput
        onChangeText={handleText}
        value={text}
        placeholder="생년월일을 입력해 주세요"
      />
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
  titleText: {
    color: '#fff',
    fontSize: 30,
  },
  text: {
    color: '#fff',
  },
});
