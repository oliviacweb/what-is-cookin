class User {
  constructor(id, name, pantry, recipeData){
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.recipeData = recipeData
  }

  addFavoriteRecipes(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    }
  }

  removeFavoriteRecipes(recipe) {
    const removedRecipe = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(removedRecipe, 1);
  }

  filterFavorites(tagName) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tagName);
    })
  }

  findFavorites(recipeQuery, ingredients) {
    const matchedOnRecipeName = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(recipeQuery);
    });

    const foundIngredient = ingredients.find(ingredient => {
      if(ingredient.name) {
        return ingredient.name.includes(recipeQuery);
      }
    });

    const matchedOnIngredient = this.favoriteRecipes.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if(ingredient.id && foundIngredient && ingredient.id === foundIngredient.id) {
          return acc.push(recipe);
        }
      })
      return acc;
    }, []);

    if(matchedOnRecipeName.length > 0) {
      return matchedOnRecipeName
    } else if (matchedOnIngredient.length > 0) {
      return matchedOnIngredient
    };
  }

  addRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)){
      this.recipesToCook.push(recipe)
    }
  }

  removeRecipesToCook(recipe) {
    const removedRecipe =
    this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(removedRecipe, 1);
  }

  filterRecipesToCook(tagName) {
    return this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(tagName)
    })
  }

  searchByIngredient(str, ingredients) {
    const ingredientByName = ingredients.find(ingredient => {
      if(ingredient.name) {
        return ingredient.name.includes(str);
      }
    });
     const matchedIngredient = this.recipeData.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if(ingredient.id && ingredientByName && ingredient.id === ingredientByName.id) {
          return acc.push(recipe);
        }
      })
      return acc;
    }, []);
    return matchedIngredient
  }

  filterRecipeByTag(tag) {
    return this.recipeData.filter(recipe => recipe.tags.includes(tag))
  }

  searchByName(name) {
     return this.recipeData.filter(recipe => recipe.name.toLowerCase().includes(name))
   }

  // findRecipesToCook() {
  //
  // }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
