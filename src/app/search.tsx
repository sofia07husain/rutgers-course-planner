import { Palette } from '@/constants/palette';
import { COURSES } from '@/data/courses';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSchedule } from '../context/schedule';

//useState gives you a variable query and the change function setQuery 
//React will re draw the screen with the new value --
//according to what user types itll update the query accordingly
export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { addCourse, removeCourse, hasCourse } = useSchedule();

  // only keeps the courses that match what the user typed
  const results = COURSES.filter((c) => {
    const q = query.toLowerCase();
    return c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
  });

    return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Search by course name or code"
        placeholderTextColor={Palette.gray}
        value={query}
        onChangeText={setQuery}
      />
       <FlatList
       //more efficient way to render long lists
        data={results}
        keyExtractor={(c) => c.code}
        ListEmptyComponent={<Text style={styles.empty}>No courses found.</Text>}
        renderItem={({ item }) => {
          const added = hasCourse(item.code);
          return (
            <View style={styles.card}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.credits} credits · {item.days} · {item.time}
              </Text>
              <Pressable
                style={[styles.button, added && styles.buttonAdded]}
                onPress={() => (added ? removeCourse(item.code) : addCourse(item))}
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
    marginBottom: 16,
  },
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