class Recipe {
  constructor(recipe, ingredientsData) {
     this.id = recipe.id;
     this.image = recipe.image;
     this.ingredients = recipe.ingredients;
  }
}
if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
