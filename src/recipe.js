class Recipe {
  constructor(recipe, ingredientsData, recipeData) {
     this.id = recipe.id;
     this.image = recipe.image;
     this.ingredients = recipe.ingredients;
     this.instructions = recipe.instructions;
     this.name = recipe.name;
     this.tags = recipe.tags;
     this.ingredientsData = ingredientsData;
     this.recipeData = recipeData;
  }

  getRecipeInstructions() {
    return this.instructions;
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

  filterRecipeByTag(tag) {
    return this.recipeData.filter(recipe => recipe.tags.includes(tag))
  }

  // searchByIngredient(str, ingredients) {
  //   const ingredientByName = ingredients.find(ingredient => {
  //     if(ingredient.name) {
  //       return ingredient.name.includes(str);
  //     }
  //   });
  //    const matchedIngredient = this.recipeData.reduce((acc, recipe) => {
  //     recipe.ingredients.forEach(ingredient => {
  //       if(ingredient.id === ingredientByName.id) {
  //         return acc.push(recipe);
  //       }
  //     })
  //     return acc;
  //   }, []);
  //   return matchedIngredient
  // }
}
if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
