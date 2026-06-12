import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
const RecipeCard = ({ recipe }) => {
  console.log("RecipeCard rendering:", recipe.title);
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.image_url }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.info}>{recipe.author_id}</Text>
      <TouchableOpacity
        onPress={() => console.log("Liked recipe: ", recipe.id)}
      >
        <Text>🧡</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", //  rewrite to use friendlier background color using the theme of the app design
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
});
export default RecipeCard;
