import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        const { id, email, user_metadata } = session.user;

        console.log("User signed in:", email);
        console.log("User metadata:", user_metadata);

        const { data, error } = await supabase.from("users").upsert(
          {
            id,
            email,
            display_name: user_metadata?.full_name ?? null,
            avatar_url: user_metadata?.avatar_url ?? null,
          },
          {
            onConflict: "id",
          },
        );

        if (error) {
          console.log("Upsert error:", error.message);
        } else {
          console.log("User saved successfully:", data);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
