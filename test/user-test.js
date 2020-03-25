const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user.js');
const recipeInfo = require('../data/recipes.js');

let user1;
//want it to be a function
//want it to be an instance of user
//want it to have an id
//want it to have a name
// want it to have a pantry
// want it to have fav recipes property
//want it to have a recipestocook property
//should be able to add recipes to favoriteRecipes
//should be able to remove recipes to favoriteRecipes
//should be able to filter through recipes

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
    ]);
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

   it('should be able to remove recipes to favoriteRecipes', () => {
     user1.removeFavoriteRecipes(recipeInfo[0]);

     expect(user1.favoriteRecipes).to.deep.equal([]);
   });

  });
