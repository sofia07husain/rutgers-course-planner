import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from '../constants/palette';

const TABS = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/search' },
  { label: 'Schedule', path: '/schedule' },
] as const;

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  //usePathName --> tells you which screen you are on 

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.brand}>RU Planner</Text>

      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const active = pathname === tab.path;
          return (
            <Pressable
              key={tab.path}
              onPress={() => router.replace(tab.path)} //swaps insteads of stacks
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.white,
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  brand: { fontSize: 18, fontWeight: '800', color: Palette.scarlet },
  tabs: { flexDirection: 'row', gap: 4 },
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  tabActive: { backgroundColor: Palette.scarlet },
  tabText: { fontSize: 15, fontWeight: '600', color: Palette.gray },
  tabTextActive: { color: Palette.white },
});