import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Palette } from '../constants/palette';
import { useSchedule } from '../context/schedule';

export default function ScheduleScreen() {
  const { myCourses, removeCourse } = useSchedule();

  //walks through the array and builds up one value (accumulator)
  //here it starts at 0 and adds each courses credits to sum, so you get the total
  const totalCredits = myCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <View style={styles.screen}>
      <Text style={styles.summary}>
        {myCourses.length} courses · {totalCredits} credits
      </Text>

      <FlatList
        data={myCourses}
        keyExtractor={(c) => c.code}
        ListEmptyComponent={
          <Text style={styles.empty}>No courses yet. Add some from Find Courses.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.credits} credits · {item.days} · {item.time}
            </Text>
            <Pressable style={styles.removeButton} onPress={() => removeCourse(item.code)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Palette.light, padding: 20 },
  summary: { fontSize: 16, fontWeight: '700', color: Palette.dark, marginBottom: 16 },
  card: {
    backgroundColor: Palette.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  code: { fontSize: 14, fontWeight: '800', color: Palette.scarlet },
  title: { fontSize: 17, fontWeight: '700', color: Palette.dark, marginTop: 2 },
  meta: { fontSize: 13, color: Palette.gray, marginTop: 4 },
  empty: { textAlign: 'center', color: Palette.gray, marginTop: 40 },
  removeButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Palette.scarlet,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
  },
  removeText: { color: Palette.scarlet, fontWeight: '700' },
});