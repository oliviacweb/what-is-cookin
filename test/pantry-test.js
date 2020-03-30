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

  it.skip('Should be a function', () => {
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
    pantry1.evaluateIngredientsForRecipes();
    expect();
  });

})
