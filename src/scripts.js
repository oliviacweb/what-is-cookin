let displayWelcome = document.querySelector('.welcome-header');
let recipesDisplay = document.querySelector('.recipe-section');
let searchBar = document.querySelector('.search-input');
let cardSection = document.querySelector('.recipe-section');
let pageBody = document.querySelector('.main-body');
let instructionsList;
let randomUser;
let randomIndex;
let user;
let pantry;
let allRecipes;
let clickedRecipe;
let currentRecipe;
let ingredients = ingredientsData;
window.onload = function() {
  generateUser();
  greetUser();
  loadAllRecipes(allRecipes);
}

//event listeners
searchBar.addEventListener('keyup', searchRecipes);
cardSection.addEventListener('click', cardHandler);

function generateUser() {
  randomIndex = returnRandomNumber();
  randomUser = usersData[randomIndex];
  user = new User(randomUser.id, randomUser.name, randomUser.pantry, recipeData);
  pantry = new Pantry(randomUser.pantry);
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
      <button id='${recipe.id}' aria-label='add-button' class='add-button add-button${recipe.id} card-button'>
      <img id='${recipe.id}' class='add-recipe-img'
            src='https://image.flaticon.com/icons/svg/467/467248.svg' alt='Add to
            recipes to cook'>
      </button>
      <p id='${recipe.id}' class="recipe-name">${recipe.name}</p>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'>
      <img id='${recipe.id}' class='fave-recipe-img'
            src='https://image.flaticon.com/icons/svg/535/535285.svg' alt='Add to
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
    // results.add(item.image);
    // results.add(item.ingredients);
    // results.add(item.instructions);
    // results.add(item.name);
    // results.add(item.tags)
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
    console.log('matched', matched);
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
 }
}

function displayRecipeInfo(event) {
  matchRecipe();
  clearDom();
  console.log(pantry);
  cardSection.innerHTML = `
  <button class="back" aria-label="back-button">Back</button>
  <h2 class="instructions-title">${currentRecipe.name}</h2>
  <h3 class="instructions-list"></h3>
  <h3 class="ingredients-list"></h3>
  <p>The ingredients will cost: ${currentRecipe.calculateCost().toFixed(2)}</p>`;
  returnInstructions();
}

function returnInstructions() {
  instructionsList = document.querySelector('.instructions-list');
  currentRecipe.instructions.forEach(instruction => {
      instructionsList.insertAdjacentHTML('beforebegin', `<li>
      ${instruction.instruction}</li>
      `)
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
