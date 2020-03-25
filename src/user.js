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

}


module.exports = User;
