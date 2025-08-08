import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      let recipe = action.payload;
      if (!recipe.source) {
        recipe = {
          ...recipe,
          source: recipe.recipeId ? "api" : "custom",
        };
      }

      const identifier = recipe.recipeId || recipe.name;
      const exists = state.favoriterecipes.find(
        (item) => (item.recipeId || item.name) === identifier
      );

      if (exists) {
        state.favoriterecipes = state.favoriterecipes.filter(
          (item) => (item.recipeId || item.name) !== identifier
        );
      } else {
        state.favoriterecipes.push(recipe);
      }
    },
    setFavorites: (state, action) => {
      state.favoriterecipes = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
