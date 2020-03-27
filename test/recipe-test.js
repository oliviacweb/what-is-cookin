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

  it('Should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('Should have an id', () => {
    expect(recipe.id).to.equal(601216);
  });

  it('Should have have an image', () => {
    expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/601216-556x370.jpg')
    });
    
  it('Should have an array of ingredients', () => {
    expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    });
})
