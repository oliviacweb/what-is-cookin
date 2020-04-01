let displayWelcome = document.querySelector('.welcome-header');
let recipesDisplay = document.querySelector('.recipe-section');
let searchBar = document.querySelector('.search-input');
let randomUser;
let randomIndex;
let user;
let allRecipes;
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

function searchRecipes() {
  const searchInput = searchBar.value;

}

function handleCardBtns(event){
  var classArr = Array.from(event.target.classList);
  var cardId = event.target.closest('.indiv-recipe').id;
  if (classArr.includes('add-button')) {
    toggleFavorite(cardId);
  }
}

function toggleFavorite() {
  const recipeCards = Array.from(document.querySelectorAll('.indiv-recipe'));

  recipeCards.forEach(card => {
    console.log('card', card);
  })
}
