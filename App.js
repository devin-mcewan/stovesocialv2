import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import SignInScreen from "./src/screens/SignInScreen";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./src/supabase";
WebBrowser.maybeCompleteAuthSession();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <SignInScreen />;
  }

  return (
    // In your AppNavigator, replace the welcome screen with:

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user.email}!</Text>
      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#c8490a",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
