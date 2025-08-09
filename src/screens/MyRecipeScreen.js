import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchrecipes = async () => {
        const storedRecipes = await AsyncStorage.getItem("customrecipes");
        let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
        setrecipes(recipes);
        setLoading(false);
      };

      fetchrecipes();
    }, [])
  );

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const deleterecipe = async (index) => {
    try {
      const updatedrecipes = [...recipes];

      updatedrecipes.splice(index, 1);

      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(updatedrecipes)
      );

      setrecipes(updatedrecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationButtonsContainer} testID="addBackButtons">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back To Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Recipe</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.norecipesText}>No recipes added yet.</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard} testID="recipeCard">
                <TouchableOpacity
                  testID="handlerecipeBtn"
                  onPress={() => handlerecipeClick(recipe)}
                >
                  <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                  />
                  <Text style={styles.recipeTitle}>{recipe.name}</Text>
                  <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.ingredients?.length > 50
                      ? recipe.ingredients.slice(0, 50) + "..."
                      : recipe.ingredients}
                  </Text>
                  <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.description?.length > 50
                      ? recipe.description.slice(0, 50) + "..."
                      : recipe.description}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Buttons */}
                <View
                  style={styles.actionButtonsContainer}
                  testID="editDeleteButtons"
                >
                  <TouchableOpacity
                    onPress={() => editrecipe(recipe, index)}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit recipe</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleterecipe(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete recipe</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  navigationButtonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: hp(10),
    // gap: wp(5),
  },
  backButton: {
    marginBottom: hp(1.5),
    backgroundColor: "#4d4f55ff",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    // width: 300,
    // marginLeft: 500,
    width: wp(40), // Adjusted for responsiveness
    // marginLeft: wp(10),
  },
  backButtonText: {
    // fontSize: hp(2.2),
    // color: "#4F75FF",
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  addButton: {
    backgroundColor: "#eda445ff",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    width: wp(40),
    // marginLeft: wp(10),
    marginBottom: hp(2),
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  recipeCard: {
    // width: 400, // Make recipe card width more compact
    width: wp(80),
    //height: wp(80),
    //height: 300, // Adjust the height of the card to fit content
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
    elevation: 3, // for Android shadow
  },
  // recipeImage: {
  //   width: 300, // Set width for recipe image
  //   height: 150, // Adjust height of the image
  //   borderRadius: 8,
  //   marginBottom: hp(1),
  // },
  // 📷 Recipe image
  recipeImage: {
    //width: wp(70),
    height: hp(25),
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
    textAlign: "center",
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
    gap: wp(5),
  },
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(0.5),
    borderRadius: 5,
    width: wp(25),
    // width: 100, // Adjust width of buttons to be more compact
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(0.5),
    borderRadius: 5,
    width: wp(25),
    // width: 100, // Adjust width of buttons to be more compact
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});
