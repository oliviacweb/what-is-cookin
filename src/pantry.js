class Pantry {
  constructor(contents, recipe) {
    this.contents = contents;
    this.recipe = recipe;
    this.thingsToBuy = [];
    this.amountToBuy = [];
  }

  evaluateIngredientsForRecipes() {
    console.log(this.recipe);
    const pantryIngredients = this.contents;
    const recipeIngredients = this.recipe.ingredients;
    const requiredIngredients = recipeIngredients.map((ingredient)  => {
      const newIngredientObj = {};
      newIngredientObj.id = ingredient.id;
      newIngredientObj.amount = ingredient.quantity.amount;
      return newIngredientObj;
    });
    const iHave = [];

    requiredIngredients.forEach(ingredient => {
      const found = pantryIngredients.find(item => item.ingredient === ingredient.id);

      if (found && found.amount >= ingredient.amount) {
        iHave.push(found);
        return `You have enough of this ingredient`;
      } else if (found && found.amount < ingredient.amount) {
        this.amountToBuy.push(found);
        return `You have this ingredient but not enough`;
      }

      if (!found) {
        this.thingsToBuy.push(ingredient);
        return `You need this ingredient`;
      }
    });
  }

  findIngredientsNeeded() {
    const recipeIngredients = this.recipe.ingredients;
    const requiredIngredients = recipeIngredients.map((ingredient)  => {
      const newIngredientObj = {};
      newIngredientObj.id = ingredient.id;
      newIngredientObj.amount = ingredient.quantity.amount;
      return newIngredientObj;
    });
    const amountToBuy = this.amountToBuy;
    const ingredientsNeeded = [];

    if (this.thingsToBuy.length > 0) {
      this.thingsToBuy.forEach(item => ingredientsNeeded.push(item))
    }

    if (this.amountToBuy.length > 0) {
      requiredIngredients.forEach(recipeIngredient => {
        amountToBuy.forEach(item => {
          if (recipeIngredient.id === item.ingredient) {
            const newIngObj = recipeIngredient;
            const needed = recipeIngredient.amount - item.amount;
            newIngObj.amount = needed;
            return ingredientsNeeded.push(newIngObj);
          }
        })
      })
    }
    return ingredientsNeeded;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
