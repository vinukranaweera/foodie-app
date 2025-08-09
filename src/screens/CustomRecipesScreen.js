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
          <Text style>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: "white",
            },
          ]}
        >
          <Text>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={styles.recipeDetailsContainer} testID="recipeDetailsContainer">
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
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
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
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: hp(1),
  },
  // imageContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginBottom: 20,
  // },
  scrollContent: {
    paddingBottom: 30,
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
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
    height: hp(45),
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: hp(2.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
    textAlign: "center"
  },
});
