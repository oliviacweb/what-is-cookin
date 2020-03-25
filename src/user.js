class User {
  constructor(id, name, pantry){
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
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

  // findFavorites() {
  //
  // }

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

  // findRecipesToCook() {
  //
  // }
}


module.exports = User;
