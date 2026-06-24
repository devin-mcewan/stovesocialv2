import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { supabase } from "../supabase";
import RecipeCard from "../components/RecipeCard";
const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async () => {
        const { data, error } = await supabase
          .from("recipes")
          .select("*, users(display_name, avatar_url)")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching recipes:", error);
        } else {
          setRecipes(data);
        }
        setLoading(false);
      };
      fetchRecipes();
    }, [setRecipes]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f4",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
export default HomeScreen;
