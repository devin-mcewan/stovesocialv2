import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { supabase } from "../supabase";

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl =
        "https://bnbp9ly-devdevindev-8081.exp.direct/--/auth/callback";

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          scopes: "profile email",
        },
      });

      if (error) throw error;

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl,
        );

        Alert.alert(
          "Result",
          `Type: ${result.type}\nURL: ${result.url || "none"}`,
        );

        if (result.type === "success" && result.url) {
          const { error: sessionError } =
            await supabase.auth.exchangeCodeForSession(result.url);
          if (sessionError) Alert.alert("Session Error", sessionError.message);
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>StoveSocial</Text>
        <Text style={styles.subtitle}>
          Where family gathers & recipes simmer
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f4",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#1a1a18",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b6b63",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  googleButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8e5de",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a18",
  },
});

export default SignInScreen;
