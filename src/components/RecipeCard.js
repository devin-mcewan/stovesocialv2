import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
const RecipeCard = ({ recipe, navigation }) => {
  console.log("RecipeCard rendering:", recipe.title);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: recipe.id })
      }
    >
      <Image source={{ uri: recipe.image_url }} style={styles.image} />
      <Text style={styles.primaryText}>{recipe.title}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.secondaryText}>
          {recipe.users?.display_name || "Chef"}
        </Text>
        <TouchableOpacity
          onPress={() => console.log("Liked recipe: ", recipe.id)}
        >
          <Text style={styles.accent}>🧡</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  primaryText: {
    color: "#1a1a18",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  secondaryText: {
    fontSize: 14,
    color: "#6b6b63",
  },
  accent: {
    color: "#c8490a",
  },
});
export default RecipeCard;
