import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../supabase";

const RecipeDetailScreen = () => {
  const route = useRoute();
  const { recipeId } = route.params;
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", recipeId)
        .single();

      if (error) {
        console.error("Error fetching recipe:", error);
      } else {
        setRecipe(data);
      }
      setLoading(false);
    };
    const fetchIngredients = async () => {
      const { data, error } = await supabase
        .from("ingredients")
        .select("*")
        .eq("recipe_id", recipeId);

      if (error) {
        console.error("Error fetching ingredients:", error);
      } else {
        setIngredients(data);
      }
    };
    const fetchInstructions = async () => {
      const { data, error } = await supabase
        .from("instructions")
        .select("*")
        .eq("recipe_id", recipeId);

      if (error) {
        console.error("Error fetching instructions:", error);
      } else {
        setInstructions(data);
      }
    };
    fetchRecipe();
    fetchIngredients();
    fetchInstructions();
  }, [recipeId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!recipe) {
    return <Text>Recipe not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.description}>{recipe.servings} servings</Text>
      <Text style={styles.description}>
        {recipe?.prep_time || 0} minutes prep
      </Text>
      <Text style={styles.description}>
        {recipe?.cook_time || 0} minutes cook
      </Text>
      <Text style={styles.description}>
        {recipe?.prep_time && recipe?.cook_time
          ? recipe.prep_time + recipe.cook_time
          : 0}{" "}
        minutes total
      </Text>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View>
        {ingredients.map((ingredient) => (
          <Text key={ingredient.id} style={styles.ingredientText}>
            • {ingredient.amount} {ingredient.unit} {ingredient.name}
          </Text>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Instructions</Text>
      {instructions.map((instruction, index) => (
        <Text style={styles.description} key={instruction.id}>
          {index + 1}. {instruction.description}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 16,
    color: "#6b6b63",
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RecipeDetailScreen;
