import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { supabase } from "../supabase";
import RecipeCard from "../components/RecipeCard";
const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Recipes data:", data);
      console.log("Recipes error:", error);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, []);

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
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f4",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
export default HomeScreen;
