import { View, Text, StyleSheet } from "react-native";

const KitchensScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Kitchens</Text>
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
export default KitchensScreen;
