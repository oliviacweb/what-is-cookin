class Recipe {
  constructor(recipe, ingredientsData) {
     this.id = recipe.id;
     this.image = recipe.image;
     this.ingredients = recipe.ingredients;
     this.instructions = recipe.instructions;
     this.name = recipe.name;
     this.tags = recipe.tags;
     this.ingredientsData = ingredientsData;
  }

  calculateCost() {
     return this.ingredients.reduce((total, ingredient) => {
       let ingredientById = this.ingredientsData.find(matchIngredient => {
         return matchIngredient.id === ingredient.id;
       });
       let cost = (((ingredientById.estimatedCostInCents) * (ingredient.quantity.amount)) / 100)
       total += cost;
       return total;
     }, 0)
   }
}
if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
