import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text>My Profile</Text>
      <Image
        source={{ uri: user?.user_metadata?.avatar_url }}
        style={styles.image}
      />
      <Text style={styles.text}>{user?.user_metadata?.full_name}</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#c8490a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
export default ProfileScreen;
