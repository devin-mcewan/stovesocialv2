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
  const [ingredients, setIngredients] = useState([
    { name: "", amount: 0, unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { step_number: 1, description: "" },
  ]);
  const { user } = useAuth();

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "" }]);
    return;
  };
  const updateIngredient = (index, key, value) => {
    setIngredients(
      ingredients.map((ingredient, i) => {
        if (i === index) {
          const updatedIngredient = { ...ingredient, [key]: value };
          return updatedIngredient;
        }
        return ingredient;
      }),
    );
  };
  const removeIngredient = (id) => {
    const filteredIngredients = ingredients.filter((ingredient, index) => {
      if (index === id && ingredients.length > 1) {
        return false;
      }
      return true;
    });
    setIngredients(filteredIngredients);
    return;
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { step_number: instructions.length + 1, description: "" },
    ]);
    return;
  };
  const updateInstruction = (index, key, value) => {
    setInstructions(
      instructions.map((instruction, i) => {
        if (i === index) {
          const updatedInstruction = { ...instruction, [key]: value };
          return updatedInstruction;
        }
        return instruction;
      }),
    );
  };
  const removeInstruction = (id) => {
    const filteredInstructions = instructions.filter((instruction, index) => {
      if (index === id && instructions.length > 1) {
        return false;
      }
      return true;
    });
    setInstructions(filteredInstructions);
    return;
  };

  const postRecipe = async () => {
    if (!title || title.trim() === "") {
      alert("Invalid Title");
      return;
    } else {
      const { data: titleData, error: titleError } = await supabase
        .from("recipes")
        .insert({ title, author_id: user.id })
        .select();
      if (titleError) {
        alert("Error adding recipe");
        console.log("Error adding recipe:", titleError.message);
        return;
      }
      const recipeId = titleData[0].id; // Get the newly created recipe ID
      const ingredientsWithId = ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: recipeId, // Associate each ingredient with the recipe ID
      }));

      const instructionsWithId = instructions.map((instruction) => ({
        ...instruction,
        recipe_id: recipeId, // Associate each instruction with the recipe ID
      }));

      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from("ingredients")
        .insert(ingredientsWithId)
        .select();
      if (ingredientsError) {
        alert("Error adding ingredients");
        console.log("Error adding ingredients:", ingredientsError.message);
      } else {
        setIngredients([{ name: "", amount: 0, unit: "" }]);
      }

      const { data: instructionsData, error: instructionsError } =
        await supabase.from("instructions").insert(instructionsWithId).select();
      if (instructionsError) {
        alert("Error adding instructions");
        console.log("Error adding instructions:", instructionsError.message);
      } else {
        setInstructions([{ step_number: 1, description: "" }]);
        setTitle(""); // Clear the title input after successful submission
        alert("Recipe added successfully!");
      }
    }
  };

  return (
    <View>
      <Text>+ Recipe</Text>
      <Text>Title</Text>
      <TextInput value={title} placeholder="Title..." onChangeText={setTitle} />
      <Text>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text>Name:</Text>
          <TextInput
            value={ingredient.name}
            placeholder="Ingredient Name..."
            onChangeText={(text) => {
              updateIngredient(index, "name", text);
            }}
          />
          <Text>Amount:</Text>
          <TextInput
            value={String(ingredient.amount)}
            placeholder="Amount..."
            onChangeText={(text) => {
              updateIngredient(index, "amount", text);
            }}
          />
          <Text>Unit:</Text>
          <TextInput
            value={ingredient.unit}
            placeholder="Unit..."
            onChangeText={(text) => {
              updateIngredient(index, "unit", text);
            }}
          />
          <TouchableOpacity onPress={() => removeIngredient(index)}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => addIngredient()}>
        <Text>+Add Ingredient</Text>
      </TouchableOpacity>
      <Text>Instructions</Text>
      {instructions.map((instruction, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text>Step {instruction.step_number}</Text>
          <TextInput
            value={instruction.description}
            placeholder="Start by measuring...."
            onChangeText={(text) => {
              updateInstruction(index, "description", text);
            }}
          />
          <TouchableOpacity onPress={() => removeInstruction(index)}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => addInstruction()}>
        <Text>+Add Instruction</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={postRecipe}>
        <Text>Submit Recipe</Text>
      </TouchableOpacity>
      {/* Image Upload Section */}
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
