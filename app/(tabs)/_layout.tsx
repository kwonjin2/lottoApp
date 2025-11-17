import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <View style={styles.tabItem}>
            <MaterialCommunityIcons
              name="home-outline"
              size={28}
              color={pathname === '/' ? '#FFD700' : '#fff'}
            />
            <Text
              style={[styles.tabText, pathname === '/' && styles.activeTab]}
            >
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/create')}>
          <View style={styles.tabItem}>
            <MaterialCommunityIcons
              name="crystal-ball"
              size={24}
              color={pathname === '/create' ? '#FFD700' : '#fff'}
            />

            <Text
              style={[
                styles.tabText,
                pathname === '/create' && styles.activeTab,
              ]}
            >
              Lotto
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <View style={styles.tabItem}>
            <MaterialCommunityIcons
              name="history"
              size={28}
              color={pathname === '/history' ? '#FFD700' : '#fff'}
            />
            <Text
              style={[
                styles.tabText,
                pathname === '/history' && styles.activeTab,
              ]}
            >
              기록
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    // backgroundColor: '#25292e',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    color: '#FFD700',
  },
});
