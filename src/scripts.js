let displayWelcome = document.querySelector('.welcome-header');
let recipesDisplay = document.querySelector('.recipe-section');
let searchBar = document.querySelector('.search-input');
let cardSection = document.querySelector('.recipe-section');
let pageBody = document.querySelector('.main-body');
let headerBtns = document.querySelector('.filter-recipe-btns');
let instructionsList;
let randomUser;
let randomIndex;
let user;
let pantry;
let allRecipes;
let clickedRecipe;
let currentRecipe;
let ingredientsNeeded;
let ingredients = ingredientsData;
window.onload = function() {
  generateUser();
  greetUser();
  loadAllRecipes(allRecipes);
}

//event listeners
searchBar.addEventListener('keyup', searchRecipes);
cardSection.addEventListener('click', cardHandler);
headerBtns.addEventListener('click', headerBtnsHandler);

function generateUser() {
  randomIndex = returnRandomNumber();
  randomUser = usersData[randomIndex];
  user = new User(randomUser.id, randomUser.name, randomUser.pantry, recipeData);
  // pantry = new Pantry(user.pantry, currentRecipe);
  allRecipes = recipeData;
}

function returnRandomNumber() {
  randomNumber = Math.floor(Math.random() * (50 - 1) + 1);
  return randomNumber;
}

function greetUser() {
  displayWelcome.innerText = `Welcome, ${returnFirstName()}!`;
}

function returnFirstName() {
  var firstName = user.name.split(" ");
  return firstName[0];
}

function loadAllRecipes(recipes) {
  recipes.forEach(recipe => {
    recipesDisplay.insertAdjacentHTML('beforeend',
  `<div class="indiv-recipe" data-id="${recipe.id}">
    <div id='${recipe.id}' class='card-header'>
      <button id='${recipe.id}' aria-label='add-button' class='add-button add-button${recipe.id} card-buttons'>
      <img id='${recipe.id}' class='add-recipe-img'
            src='../icons/inactive-book.png' alt='Add to
            recipes to cook'>
      </button>
      <p id='${recipe.id}' class="recipe-name">${recipe.name}</p>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-buttons'>
      <img id='${recipe.id}' class='fave-recipe-img'
            src='../icons/inactive-heart.png' alt='Add to
            favorite recipes'>
        </button>
    </div>
      <div id='${recipe.id}' class='card-image'
      style='background-image: url("${recipe.image}")' alt='click to view recipe for ${recipe.name}'>
      </div>
  </div>`)

  });
}

function combineSearchResults(first, second, third) {
  const newArr = first.concat(second).concat(third)
  const results = new Set();

  newArr.forEach(item => {
    results.add(item.id);
  });

  return Array.from(results);
}

function searchRecipes() {
  const recipeCards = Array.from(document.querySelectorAll('.indiv-recipe'))
  const searchInput = searchBar.value.toLowerCase();
  const foundByTag = user.filterRecipeByTag(searchInput);
  const foundByName = user.searchByName(searchInput);
  const foundByIngredient = user.searchByIngredient(searchInput, ingredients);
  const allResults = combineSearchResults(foundByName, foundByIngredient, foundByTag);

  recipeCards.forEach(card => {
    const dataId = parseInt(card.dataset.id);
    const matched = allResults.includes(dataId)
    if(matched !== true){
      card.classList.add('hide')
    } else {
      card.classList.remove('hide')
    }
  });
}

//recipe instructions

function cardHandler() {
  if (event.target.classList.contains('card-image')) {
    displayRecipeInfo(event);
 }
  else if(event.target.classList.contains('back')) {
    clearDom();
    loadAllRecipes(allRecipes);
 } else if (event.target.classList.contains('fave-recipe-img')){
   toggleFavorite(event.target.id);
 } else if (event.target.classList.contains('add-recipe-img')){
   toggleToCook(event.target.id);
 }
}

function displayRecipeInfo(event) {
  matchRecipe();
  clearDom();

  pantry = new Pantry(user.pantry, currentRecipe);
  pantry.evaluateIngredientsForRecipes();

  cardSection.innerHTML = `
  <button class="back" aria-label="back-button">Back</button>
  <h2 class="instructions-title">${currentRecipe.name}</h2>
  <h3 class="instructions-list">Instructions:</h3>
  <h3 class="ingredients-list">Ingredients List:</h3>
  <h3 class="ingredient-eval">You are missing:</h3>
  <h3>Total Cost of Ingredients: $${currentRecipe.calculateCost().toFixed(2)}</h3>`;
  returnInstructions();
  returnIngredientsList();
  returnPantryEval();
}


function returnPantryEval() {
  pantryEval = document.querySelector('.ingredient-eval');
  ingredientsNeeded = pantry.findIngredientsNeeded();
  console.log(ingredientsNeeded);
  ingredientsNeeded.forEach(ingredient => {
       ingredients.forEach(ing => {
         currentRecipe.ingredients.find(ingreds => {
           console.log(ingreds)
           if(ing.id === ingredient.id && ingreds.id === ingredient.id) {
             pantryEval.insertAdjacentHTML('beforeend', `<li>
             ${ingredient.amount} ${ingreds.quantity.unit} of ${ing.name}</li>
             `)
           }
         })
    })
  })
}
function returnInstructions() {
  instructionsList = document.querySelector('.instructions-list');
  currentRecipe.instructions.forEach(instruction => {
      instructionsList.insertAdjacentHTML('beforeend', `<li>
      ${instruction.instruction}</li>
      `)
    })
}

function returnIngredientsList() {
  ingrdList = document.querySelector('.ingredients-list');
  currentRecipe.ingredients.forEach(ingredient => {
    ingredients.find(ingrd => {
      if (ingrd.id === ingredient.id) {
        ingrdList.insertAdjacentHTML('beforeend', `<li>${ingredient.quantity.amount}${ingredient.quantity.unit} of
        ${ingrd.name}</li>
        `)
      }
    })
  })
}

function clearDom() {
  cardSection.innerHTML = "";
}

function matchRecipe() {
   clickedRecipe = allRecipes.find(recipe => {
      if (recipe.id === +event.target.id) {
        return recipe;
      }
    })
  currentRecipe = new Recipe(clickedRecipe, ingredients, allRecipes);
}



function toggleFavorite(id) {
  const recipeCards = Array.from(document.querySelectorAll('.indiv-recipe'));

  recipeCards.forEach(card => {
    const cardId = card.dataset.id;
    if(cardId === id) {
      allRecipes.filter(recipe => {
        if(recipe.id == cardId && !user.favoriteRecipes.includes(recipe)){
          user.addFavoriteRecipes(recipe);
          event.target.src = '../icons/active-heart.png';
        } else if (recipe.id == cardId && user.favoriteRecipes.includes(recipe)){
          user.removeFavoriteRecipes(recipe);
          event.target.src = '../icons/inactive-heart.png'
        }
      })
    }
  });
}

function toggleToCook(id) {
  const recipeCards = Array.from(document.querySelectorAll('.indiv-recipe'));

  recipeCards.forEach(card => {
    const cardId = (card.dataset.id);
    if(cardId === id) {
      allRecipes.filter(recipe => {
        if(recipe.id == cardId && !user.recipesToCook.includes(recipe)){
          user.addRecipesToCook(recipe);
          event.target.src = '../icons/active-book.png';
        } else if (recipe.id == cardId && user.recipesToCook.includes(recipe)){
          user.removeRecipesToCook(recipe);
          event.target.src = '../icons/inactive-book.png';
        }
      })
    }
  });
}

function headerBtnsHandler(){
  if (event.target.classList.contains('heart-image')) {
    filterByFavorites();
  } else if (event.target.classList.contains('recipe-book-img')) {
    filterRecipesToCook()
  }
}

function filterByFavorites() {
  const recipeCards = Array.from(document.querySelectorAll('.indiv-recipe'));
  const favoriteRecipes = user.favoriteRecipes;

  recipeCards.forEach(card => {
    const cardId = parseInt(card.dataset.id);
    const matched = favoriteRecipes.filter(recipe => recipe.id === cardId);
    if(matched.length){
      card.classList.add('favorited');
    }
    if (!card.classList.contains('favorited')) {
      card.classList.toggle('hidden');
    }
  });
}

function filterRecipesToCook() {
  console.log('heeeey');
}
