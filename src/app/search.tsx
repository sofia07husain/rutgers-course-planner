import { Palette } from '@/constants/palette';
import { COURSES } from '@/data/courses';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
//useState gives you a variable query and the change function setQuery 
//React will re draw the screen with the new value --
//according to what user types itll update the query accordingly
export default function SearchScreen(){
    const[query, setQuery] = useState('');

    //only keeps the courses according to what the user entered 
    const results = COURSES.filter((c) => {
        const q = query.toLowerCase();
        return c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    })

    return(
        <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Search by course name or code"
        placeholderTextColor={Palette.gray}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
    //more efficient way to render longer lists
        data={results}
        keyExtractor={(c) => c.code}
        ListEmptyComponent={<Text style={styles.empty}>No courses found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.credits} credits · {item.days} · {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );}
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
});


