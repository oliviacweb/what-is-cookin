const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe.js');
const recipeData = require('../data/recipes.js');
const ingredientsData = require('../data/ingredients.js');

let recipe

describe('Recipe', () => {
  beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientsData);
  });
  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });
})
