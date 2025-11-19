import { View, Text, StyleSheet } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.circularLayout}>
        <Text style={styles.titleText}>놋또</Text>
        <View
          style={[styles.lotto, styles.ball1, { backgroundColor: '#FF6B6B' }]}
        >
          <Text style={styles.lottoNumber}>26</Text>
        </View>
        <View
          style={[styles.lotto, styles.ball2, { backgroundColor: '#4CAF50' }]}
        >
          <Text style={styles.lottoNumber}>33</Text>
        </View>
        <View
          style={[styles.lotto, styles.ball3, { backgroundColor: '#FFD700' }]}
        >
          <Text style={styles.lottoNumber}>39</Text>
        </View>
        <View
          style={[styles.lotto, styles.ball4, { backgroundColor: '#2196F3' }]}
        >
          <Text style={styles.lottoNumber}>41</Text>
        </View>
        <View
          style={[styles.lotto, styles.ball5, { backgroundColor: '#9C27B0' }]}
        >
          <Text style={styles.lottoNumber}>38</Text>
        </View>
        <View
          style={[styles.lotto, styles.ball6, { backgroundColor: '#FF5722' }]}
        >
          <Text style={styles.lottoNumber}>30</Text>
        </View>
      </View>

      <View>
        <Text>대시보드</Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {/* <Text>대시보드</Text> */}
          <View
            style={{
              backgroundColor: '#34383D',
              width: 160,
              height: 100,
              borderRadius: 20,
            }}
          >
            <Text>당첨률</Text>
            <Text>0%</Text>
            <Text>0 / 0 당첨</Text>
          </View>
          <View
            style={{
              backgroundColor: '#34383D',
              width: 160,
              height: 100,
              borderRadius: 20,
            }}
          >
            <Text>구매횟수</Text>
            <Text>0회</Text>
            <Text>총 0원 투자</Text>
          </View>
          <View></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 40,
  },
  circularLayout: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  lotto: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottoNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 30,
    zIndex: 1,
  },
  ball1: {
    backgroundColor: '#FF6B6B',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -22.5 }, { translateY: 22.5 }],
  },
  ball2: {
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 40,
    right: 0,
    transform: [{ translateX: -30 }, { translateY: 25 }],
  },
  ball3: {
    backgroundColor: '#bca10bff',
    position: 'absolute',
    bottom: 40,
    right: 0,
    transform: [{ translateX: -30 }, { translateY: -25 }],
  },
  ball4: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -22.5 }, { translateY: -25 }],
  },
  ball5: {
    backgroundColor: '#9C27B0',
    position: 'absolute',
    bottom: 40,
    left: 0,
    transform: [{ translateX: 30 }, { translateY: -25 }],
  },
  ball6: {
    backgroundColor: '#FF5722',
    position: 'absolute',
    top: 40,
    left: 0,
    transform: [{ translateX: 30 }, { translateY: 25 }],
  },
});
