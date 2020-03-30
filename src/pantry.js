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

    this.findIngredientsNeeded(insufficient, recipeIngredients);

    const result = {
      iHave: iHave,
      iNeed: insufficient
    };
    return result;
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
