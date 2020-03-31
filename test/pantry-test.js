const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/pantry.js');
const recipeInfo = require('../data/recipes.js');
const mockPantryIngredients = require('../mockData/mockPantryIngredients');
const mockRecipe = require('../mockData/mockRecipe');

let pantry1;

describe('Pantry', () => {
  beforeEach(() => {
    pantry1 = new Pantry(mockPantryIngredients, mockRecipe);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be an instance of Pantry', () => {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('Should be passed an users pantry', () => {
    expect(pantry1.contents).to.deep.equal(mockPantryIngredients);
  });

  it('Should be passed a desired recipe', () => {
    expect(pantry1.recipe).to.deep.equal(mockRecipe);
  });

  it('Should be able to evalute ingredients needed for recipes', () => {
    const result = pantry1.evaluateIngredientsForRecipes();
    const expectedResult = {
      iHave: [
        { ingredient: 12061, amount: 2 },
        { ingredient: 2047, amount: 6 },
        { ingredient: 2050, amount: 4 }
      ],
      iNeed: [
        { id: 19334, amount: 6 },
        { id: 12104, amount: 0.5 },
        { id: 12115, amount: 1 },
        { id: 4047, amount: 6 },
        { id: 10019071, amount: 1 },
        { id: 8212, amount: 1 },
        { id: 19911, amount: 5 },
        { id: 8121, amount: 3 },
        { id: 12142, amount: 0.5 }
      ]
    }
    expect(result).to.deep.equal(expectedResult);
  });

  // it('Should be able to find the amount of missing ingredients are needed', () => {
  //
  // });

})
