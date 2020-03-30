class Pantry {
  constructor(contents, recipe) {
    this.contents = contents;
    this.recipe = recipe;
  };

  evaluateIngredientsForRecipes() {
    const pantryIngredients = this.contents;
    const recipeIngredients = this.recipe.ingredients;
    const requiredIngredients = recipeIngredients.map((ingredient)  => {
      const newIngredientObj = {};
      newIngredientObj.id = ingredient.id;
      newIngredientObj.amount = ingredient.quantity.amount;
      return newIngredientObj;
    });
    const iHave = [];
    const insufficient = [];

    requiredIngredients.forEach(ingredient => {
      const found = pantryIngredients.find(item => item.ingredient === ingredient.id);

      if(found && found.amount >= ingredient.amount){
        iHave.push(found);
        return `You have enough of this ingredient`;
      } else if (found && found.amount < ingredient.amount){
        insufficient.push(found);
        return `You have this ingredient but not enough`;
      };

      if(!found) {
        insufficient.push(ingredient);
        return `You need this ingredient`;
      }
    });
    console.log('i need', insufficient);
    console.log('i have', iHave);
    this.findIngredientsNeeded(insufficient, recipeIngredients)
  };

  findIngredientsNeeded(neededIngredients, recipeIngredients) {
    console.log('needed', neededIngredients, 'callsFor', recipeIngredients);
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
