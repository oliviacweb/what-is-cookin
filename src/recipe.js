class Recipe {
  constructor(recipe, ingredientsData) {
     this.id = recipe.id;
     this.image = recipe.image;
     this.ingredients = recipe.ingredients;
     this.instructions = recipe.instructions;
     this.name = recipe.name;
     this.tags = recipe.tags;
  }
}
if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
