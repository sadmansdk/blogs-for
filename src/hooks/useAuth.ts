import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence to LOCAL to ensure auth state persists across page reloads
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log('Auth state changed:', user?.email);
          setUser(user);
          setIsAuthenticated(!!user);
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error('Error setting persistence:', error);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { isAuthenticated, user, loading, signOut: handleSignOut };
}; 