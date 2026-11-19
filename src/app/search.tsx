import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Palette } from '../constants/palette';
import { useSchedule } from '../context/schedule';
import { SECTIONS } from '../data/courses';
import { findConflicts } from '../utils/conflictChecker';
import { formatMeetings } from '../utils/format';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { mySections, addSection, removeSection, hasSection } = useSchedule();

  const results = SECTIONS.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.code.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.instructors.some((i) => i.toLowerCase().includes(q))
    );
  });

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Search by course, code, or instructor"
        placeholderTextColor={Palette.gray}
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.count}>{results.length} sections</Text>

      <FlatList
        data={results}
        keyExtractor={(s) => s.id}
        ListEmptyComponent={<Text style={styles.empty}>No sections found.</Text>}
        renderItem={({ item }) => {
          const added = hasSection(item.id);
          const conflicts = added ? [] : findConflicts(item, mySections);
          return (
            <View style={styles.card}>
              <Text style={styles.code}>
                {item.code} · Section {item.section}
              </Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.credits} credits · {item.open ? 'Open' : 'Closed'}
              </Text>
              <Text style={styles.meta}>{formatMeetings(item)}</Text>
              <Text style={styles.meta}>{item.instructors.join('; ') || 'Staff'}</Text>
              {conflicts.length > 0 && (
                <Text style={styles.warning}>
                  ⚠ Conflicts with {conflicts.map((c) => c.code).join(', ')}
                </Text>
              )}
              <Pressable
                style={[styles.button, added && styles.buttonAdded]}
                onPress={() => (added ? removeSection(item.id) : addSection(item))}
              >
                <Text style={[styles.buttonText, added && styles.buttonTextAdded]}>
                  {added ? 'Added ✓' : 'Add'}
                </Text>
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
  input: {
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  count: { fontSize: 13, color: Palette.gray, marginBottom: 12 },
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
  warning: { fontSize: 13, fontWeight: '600', color: Palette.scarlet, marginTop: 8 },
  empty: { textAlign: 'center', color: Palette.gray, marginTop: 40 },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: Palette.scarlet,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonAdded: { backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.scarlet },
  buttonText: { color: Palette.white, fontWeight: '700' },
  buttonTextAdded: { color: Palette.scarlet },
});