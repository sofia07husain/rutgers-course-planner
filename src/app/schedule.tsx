import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Palette } from '../constants/palette';
import { useSchedule } from '../context/schedule';
import { findConflicts } from '../utils/conflictChecker';

export default function ScheduleScreen() {
  const { myCourses, removeCourse } = useSchedule();

  const totalCredits = myCourses.reduce((sum, c) => sum + c.credits, 0);
  const conflictCount = myCourses.filter((c) => findConflicts(c, myCourses).length > 0).length;

  return (
    <View style={styles.screen}>
      <Text style={styles.summary}>
        {myCourses.length} courses · {totalCredits} credits
      </Text>

      {conflictCount > 0 && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            ⚠ Time conflict: {conflictCount} of your courses overlap. Remove one to fix it.
          </Text>
        </View>
      )}

      <FlatList
        data={myCourses}
        keyExtractor={(c) => c.code}
        ListEmptyComponent={
          <Text style={styles.empty}>No courses yet. Add some from Find Courses.</Text>
        }
        renderItem={({ item }) => {
          const conflicts = findConflicts(item, myCourses);
          return (
            <View style={[styles.card, conflicts.length > 0 && styles.cardConflict]}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.credits} credits · {item.days} · {item.time}
              </Text>
              {conflicts.length > 0 && (
                <Text style={styles.warning}>
                  ⚠ Conflicts with {conflicts.map((c) => c.code).join(', ')}
                </Text>
              )}
              <Pressable style={styles.removeButton} onPress={() => removeCourse(item.code)}>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Palette.light, padding: 20 },
  summary: { fontSize: 16, fontWeight: '700', color: Palette.dark, marginBottom: 16 },
  banner: {
    backgroundColor: '#FDECEF',
    borderWidth: 1,
    borderColor: Palette.scarlet,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  bannerText: { color: Palette.scarlet, fontWeight: '600' },
  card: {
    backgroundColor: Palette.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardConflict: { borderColor: Palette.scarlet, borderWidth: 2 },
  code: { fontSize: 14, fontWeight: '800', color: Palette.scarlet },
  title: { fontSize: 17, fontWeight: '700', color: Palette.dark, marginTop: 2 },
  meta: { fontSize: 13, color: Palette.gray, marginTop: 4 },
  warning: { fontSize: 13, fontWeight: '600', color: Palette.scarlet, marginTop: 8 },
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