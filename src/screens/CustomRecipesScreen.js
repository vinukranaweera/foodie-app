import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const { recipe } = route.params || {}; // Pass the  object as a parameter
  console.log("recipe", recipe);

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavorite = favoriteRecipes.some((item) => item.name === recipe.name);

  // Sync to local storage whenever favorites change
  useEffect(() => {
    AsyncStorage.setItem("favoriterecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  if (!recipe) {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topButtonsContainer} testID="topButtonsContainer">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contentText}>No Recipe Details Available</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.image && (
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        )}
      </View>
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.name}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.contentText}>{recipe.ingredients}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    marginBottom: hp(1.5),
    backgroundColor: "#4d4f55ff",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    // width: 300,
    // marginLeft: 500,
    width: wp(70),           // Adjusted for responsiveness
    marginLeft: wp(15),
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
    width: wp(70),
    marginLeft: wp(15),
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
    textAlign: "center"
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
    textAlign: "center"
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: wp(5),
    marginTop: hp(1),
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
