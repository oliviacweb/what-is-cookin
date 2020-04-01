let displayWelcome = document.querySelector('.welcome-header');
let recipesDisplay = document.querySelector('.recipe-section');
let searchBar = document.querySelector('.search-input');
let randomUser;
let randomIndex;
let user;
let allRecipes;
let ingredients = ingredientsData;
window.onload = function() {
  generateUser();
  greetUser();
  loadAllRecipes(allRecipes);
}

//event listeners
searchBar.addEventListener('keyup', searchRecipes);

function generateUser() {
  randomIndex = returnRandomNumber();
  randomUser = usersData[randomIndex];
  user = new User(randomUser.id, randomUser.name, randomUser.pantry, recipeData);
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
