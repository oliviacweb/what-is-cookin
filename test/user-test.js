const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user.js');
const recipeInfo = require('../data/recipes.js');
const ingredientInfo = require('../data/ingredients.js');
const Recipe = require('../src/recipe.js');

let user1;
let recipe;

describe('User', () => {
  beforeEach(() => {
    user1 = new User(1, "Saige O'Kon", [
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      },
      {
        "ingredient": 20081,
        "amount": 5
      },
      {
        "ingredient": 11215,
        "amount": 5
      }
    ], recipeInfo);
  });

    it('Should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('Should be an instance of User', () => {
      expect(user1).to.be.an.instanceof(User);
    });

    it('Should have an id', () => {
      expect(user1.id).to.equal(1);
    });

    it('Should have a name', () => {
      expect(user1.name).to.equal("Saige O'Kon");
    });

    it('Should have a pantry', () => {
      expect(user1.pantry).to.deep.equal([{
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      },
      {
        "ingredient": 20081,
        "amount": 5
      },
      {
        "ingredient": 11215,
        "amount": 5
      }])
    });

   it('Should have a favoriteRecipes property with inital value', () => {
     expect(user1.favoriteRecipes).to.deep.equal([]);
   });

   it('Should have a recipesToCook property with an initial value', () => {
     expect(user1.recipesToCook).to.deep.equal([]);
   });

   it('Should be able to add recipes to favoriteRecipes', () => {
     user1.addFavoriteRecipes(recipeInfo[0]);

     expect(user1.favoriteRecipes).to.deep.equal([recipeInfo[0]]);
   });

   it('Should be able to remove recipes to favoriteRecipes', () => {
     user1.addFavoriteRecipes(recipeInfo[0]);
     user1.addFavoriteRecipes(recipeInfo[1]);
     user1.removeFavoriteRecipes(recipeInfo[0]);

     expect(user1.favoriteRecipes).to.deep.equal([recipeInfo[1]]);
   });

   it('Should be able to filter through favorite recipes', () => {
     user1.addFavoriteRecipes(recipeInfo[0]);
     user1.addFavoriteRecipes(recipeInfo[1]);
     user1.addFavoriteRecipes(recipeInfo[2]);

     expect(user1.filterFavorites('sauce')).to.deep.equal([recipeInfo[2]]);
   });

   it('Should be able to search through favoriteRecipes using recipe name', () => {
     user1.addFavoriteRecipes(recipeInfo[0]);
     user1.addFavoriteRecipes(recipeInfo[1]);
     user1.addFavoriteRecipes(recipeInfo[2]);
     user1.addFavoriteRecipes(recipeInfo[3]);

     expect(user1.findFavorites('Dirty Steve\'s Original Wing Sauce', ingredientInfo)).to.deep.equal([recipeInfo[2]]);
   });

   it('Should be able to search through favoriteRecipes using ingredient name', () => {
     user1.addFavoriteRecipes(recipeInfo[0]);
     user1.addFavoriteRecipes(recipeInfo[1]);
     user1.addFavoriteRecipes(recipeInfo[2]);
     user1.addFavoriteRecipes(recipeInfo[3]);

     expect(user1.findFavorites('black pepper', ingredientInfo)).to.deep.equal([recipeInfo[2]]);
   });

   it('Should be able to add recipes to recipesToCook', () => {
     user1.addRecipesToCook(recipeInfo[0]);
     expect(user1.recipesToCook).to.deep.equal([recipeInfo[0]]);

     user1.addRecipesToCook(recipeInfo[1]);
     expect(user1.recipesToCook).to.deep.equal([recipeInfo[0], recipeInfo[1]]);
   });

   it('Should be able to remove recipes from recipesToCook', () => {
     user1.addRecipesToCook(recipeInfo[0]);
     user1.addRecipesToCook(recipeInfo[1]);
     user1.removeRecipesToCook(recipeInfo[0]);

     expect(user1.recipesToCook).to.deep.equal([recipeInfo[1]]);
   })

   it('Should be able to filter through recipesToCook', () => {
     user1.addRecipesToCook(recipeInfo[0]);
     user1.addRecipesToCook(recipeInfo[1]);
     user1.addRecipesToCook(recipeInfo[2]);

     expect(user1.filterRecipesToCook('dinner')).to.deep.equal([recipeInfo[1]]);
   });

   it('Should search recipes by ingredient', () => {
      let recipesByIng = user1.searchByIngredient('red chili powder', ingredientInfo);
      expect(recipesByIng.length).to.equal(2);
    })


  });
