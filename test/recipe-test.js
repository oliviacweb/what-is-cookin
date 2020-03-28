const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe.js');
const recipeData = require('../data/recipes.js');
const ingredientsData = require('../data/ingredients.js');

let recipe

describe('Recipe', () => {
  beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientsData, recipeData);
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

  it('Should have instructions', () => {
    expect(recipe.instructions).to.deep.equal([{
        number: 1,
        instruction: 'Saute the zucchini in the olive oil on high heat. Season generously with salt and pepper. Stir and leave alone for a little while, so you get a little bit of texture from the browning on the zucchini.While you’re sauteing, toast the flatbread in the oven at 400 degrees.When the zucchini is soft and just slightly browned, remove from the heat. Take the flatbread out of the oven and spread the zucchini on the flatbread.Top with the fresh tomatoes, cheese, and fresh basil.'
      },
      { number: 2, instruction: 'Cut, serve, and enjoy!' }]);
    });

  it('Should have an name', () => {
    expect(recipe.name).to.equal("Farmer’s Market Flatbread Pizza");
    });

  it('Should have an tags', () => {
    expect(recipe.tags).to.deep.equal([ 'side dish' ]);
    });

  it('Should be able to calculate cost of ingredients', () => {
    expect(recipe.calculateCost()).to.equal(41.66);
  })

  it('Should return instructions', () => {
    expect(recipe.getRecipeInstructions()).to.equal(recipeData[47].instructions);
  })

  it('Should be able to return recipes by tags', () => {
   let recipesByTag = recipe.filterRecipeByTag('side dish');
   expect(recipesByTag.length).to.equal(22);
 })

 it('Should search recipes by ingredient', () => {
    let recipesByIng = recipe.searchByIngredient('red chili powder', ingredientsData);
    expect(recipesByIng.length).to.equal(2);
  })

})
