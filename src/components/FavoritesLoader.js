import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFavorites } from "../redux/favoritesSlice";

export default function FavoritesLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem("favoriterecipes");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch(setFavorites(parsed));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  return null; // No UI; just dispatch on mount
}