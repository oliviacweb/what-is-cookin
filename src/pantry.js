class Pantry {
  constructor(contents, recipe) {
    this.contents = contents;
    this.recipe = recipe;
  };

  evaluateIngredientsForRecipes() {
    const pantryIngredients = this.contents;
    const recipeIngredients = this.recipe.ingredients;
    const recipeIngredientInfo = recipeIngredients.map((ingredient)  => {
      const ingredientIds = {};
      ingredientIds.id = ingredient.id;
      ingredientIds.amount = ingredient.quantity.amount;
      return ingredientIds;
    });

    recipeIngredientInfo.forEach((ingredient) => {
      return pantryIngredients.forEach((pantryItem) => {
        if(ingredient.id === pantryItem.ingredient){
          const amount = pantryItem.amount;
          if(amount >= ingredient.amount){
            return true;
          }else {
            return 'There are not enought ingredients in your pantry';
          };
        };
      });
    });
    console.log('pantry', pantryIngredients);
    console.log('recipe', recipeIngredientInfo);
    //filter over ingredients and see how much of each is need in recipe
    //Go over ingredients in a users pantry and see what and how much of ingredients there are
    //compare pantry ingredients with recipe ingredients
    //If there are enough return 'Let's getting cooking'
    //If not invoke findIngredientsNeeded method to see how much is needed before the dish can be cooked
  };

  findIngredientsNeeded() {

  };

  removeIngredients() {

  };
};

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}

// Pantries
// Every User should have a pantry. A Pantry holds on to all the ingredients its owner has stocked, and the amount of each ingredient they have. As a user, I should be able to:

// Determine whether my pantry has enough ingredients to cook a given meal
// Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry
// Remove the ingredients used for a given meal from my pantry, once that meal has been cooked (only applicable if users have a list of mealsToCook; can be considered a stretch goal)
