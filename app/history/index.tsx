import { View, Text, StyleSheet } from 'react-native';

export default function HistoryPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>history 페이지</Text>
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
  text: {
    color: '#fff',
    fontSize: 30,
  },
});
