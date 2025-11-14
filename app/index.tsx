import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomePage() {
  const router = useRouter();

  const moveCreatePage = () => {
    router.push('/create');
  };

  const moveSpecialCreatePage = () => {
    router.push('/specialCreate');
  };

  const moveHistoryPage = () => {
    router.push('/history');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Lotto 살래?</Text>
      <View>
        <Text style={styles.text}>간단하게 랜덤 로또를 받아보세요</Text>
        <Button title="초간단 로또 번호 받기" onPress={moveCreatePage} />
      </View>
      <View>
        <Text style={styles.text}>
          나만의 특별한 숫자를 기반으로 로또를 받아보세요
        </Text>
        <Button title="특별 로또 번호 받기" onPress={moveSpecialCreatePage} />
      </View>
      <View>
        <Text style={styles.text}>생성한 로또 번호를 한 눈에 보세요</Text>
        <Button title="기록 보기" onPress={moveHistoryPage} />
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
  },
  titleText: {
    color: '#fff',
    fontSize: 30,
  },
  text: {
    color: '#fff',
  },
});
