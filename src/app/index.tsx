import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Palette } from '../constants/palette';

const SEMESTER = 'Spring 2027';

const features = [
  { title: 'My Schedule', subtitle: 'View your classes' },
  { title: 'Find Courses', subtitle: 'Browse Rutgers classes' },
  { title: 'Degree Progress', subtitle: 'Track requirements' },
  { title: 'Build Schedule', subtitle: 'Generate combinations' },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.brand}>RU Planner</Text>
        <Text style={styles.eyebrow}>YOUR ACADEMIC DASHBOARD</Text>
        <Text style={styles.title}>Plan your semester.</Text>
        <Text style={styles.tagline}>Your courses, your schedule, your degree.</Text>
      </View>

      <View style={styles.semesterPill}>
        <Text style={styles.semesterText}>{SEMESTER}</Text>
      </View>

      {features.map((f) => (
        <Pressable
          key={f.title}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => {
              if (f.title === 'Find Courses') router.push('/search');
              else console.log('Pressed', f.title);
          }}
        >
          <Text style={styles.cardTitle}>{f.title}</Text>
          <Text style={styles.cardSubtitle}>{f.subtitle}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Palette.light },
  content: { padding: 20, paddingTop: 70 },
  header: { marginBottom: 20 },
  brand: { fontSize: 22, fontWeight: '800', color: Palette.scarlet },
  eyebrow: { fontSize: 12, letterSpacing: 1.5, color: Palette.gray, marginTop: 16 },
  title: { fontSize: 32, fontWeight: '800', color: Palette.dark, marginTop: 6 },
  tagline: { fontSize: 16, color: Palette.gray, marginTop: 6 },
  semesterPill: {
    alignSelf: 'flex-start',
    backgroundColor: Palette.scarlet,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  semesterText: { color: Palette.white, fontWeight: '700' },
  card: {
    backgroundColor: Palette.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardPressed: { opacity: 0.7 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Palette.dark },
  cardSubtitle: { fontSize: 14, color: Palette.gray, marginTop: 4 },
});