import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";

const AddRecipeScreen = () => {
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  const postRecipe = async () => {
    if (!title || title.trim() === "") {
      alert("Invalid Title");
      return;
    } else {
      const { data, error } = await supabase
        .from("recipes")
        .insert({ title, author_id: user.id })
        .select();
      if (error) {
        alert("Error adding recipe");
        console.log("Error adding recipe:", error.message);
      } else {
        setTitle("");
        return alert("Recipe Added");
      }
    }
  };

  return (
    <View>
      <Text>+ Recipe</Text>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title..." />
      <TouchableOpacity onPress={postRecipe}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddRecipeScreen;
