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

})
