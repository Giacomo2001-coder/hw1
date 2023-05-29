const searchValue = document.querySelector("#SearchValue");
searchValue.onchange = onOptionChange;

const flexContainer = document.querySelector('#FlexContainer');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const bestResultContainer = document.querySelector('#FlexResultContainer');
const bestResultItem = bestResultContainer.lastElementChild;
//Inizialize the div in order to clean it later at the start of the function
const lessRelevantItem = document.createElement('div');
const arrowBack = bestResultContainer.firstElementChild;
arrowBack.addEventListener('click', onClickArrowBack);
const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '8f1abb32a4msh9a5eeb13cee8759p1846b9jsn6b070b764739',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};
function searchNotFound(){
      const searchNotFound = document.createElement('h1');
      searchNotFound.textContent = 'Search has given 0 results';
      bestResultItem.appendChild(searchNotFound);
      return;
}
function onOptionChange(e){
const value = e.target.options[e.target.selectedIndex].value;
const textValue = document.querySelector("#ricetta");
if(value === "cocktails"){
  document.querySelector("#dishesOptions").style.display = "none";
textValue.placeholder = "Search a Cocktail recipe";
}else if(value ==="dishes"){
  document.querySelector("#dishesOptions").style.display = "block";
 textValue.placeholder = "Search a Food recipe";
}

}
function onSubmit(e){
  e.preventDefault();
  const searchValue = document.querySelector("#SearchValue");
  const selectedValue = searchValue.options[searchValue.selectedIndex].value;
  const textValue = encodeURIComponent(document.querySelector('#ricetta').value);
  if( selectedValue === 'dishes'){
  const cousineValue = document.querySelector("#CousineValue");
  const selectedValue = cousineValue.options[cousineValue.selectedIndex].value;
  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query='+textValue+'&cuisine='+selectedValue+'&fillIngredients=true&addRecipeInformation=true&number=9&ranking=2';
  fetch(url, options).then(onResponse, onError).then(onRecipeSearch).catch(onError);
  }else if(selectedValue === 'cocktails') {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+textValue+'';
    fetch(url).then(onResponse, onError).then(onCocktailSearch).catch(onError);
  }
  bestResultContainer.style.display = 'flex';
  flexContainer.style.display = 'none';
}

function onResponse(response){
  return response.json();
}
function onError(error){
  console.log(error);
}
function onRecipeSearch(json){
  //remove all children on start
    while(bestResultItem.hasChildNodes()){
      bestResultItem.removeChild(bestResultItem.firstChild);
    }
    while(lessRelevantItem.hasChildNodes()){
      lessRelevantItem.removeChild(lessRelevantItem.firstChild);
    }
    const results = json.results;

    if(Object.keys(results).length === null || Object.keys(results).length === 0){
      searchNotFound();
    }
    const mostRelevant = results[0];
    const title = mostRelevant.title;
    const image = mostRelevant.image;
    const ingredients = mostRelevant.missedIngredients;
    const ingredientsCount = mostRelevant.missedIngredientCount;
    const instructions = mostRelevant.analyzedInstructions[0].steps;
    const titleH1 = document.createElement('h1');
    titleH1.textContent = title;
    const img = document.createElement('img');
    img.src = image;
    const ingredientsCountH2 = document.createElement('h2');
    ingredientsCountH2.textContent = 'Total Ingredients: '+ingredientsCount+'';
    const ordinaryIngredientList = document.createElement('ol');
    ordinaryIngredientList.style.listStyleType = 'none';
    const divInstructionList = document.createElement('div');
    const instructionsH1 = document.createElement('h1');
    instructionsH1.textContent = 'Instructions: ';
    
    //Dataset
    bestResultItem.dataset.id = mostRelevant.id;
    bestResultItem.dataset.name = title;
    bestResultItem.dataset.img = image;
    bestResultItem.dataset.type = "dishes";

    //Ingredients
    if(ingredients !== null && instructions !== null){
    for(const ingredient of ingredients){
      const li = document.createElement('li');
      const ingredientInstruction = ingredient.original;
      ordinaryIngredientList.appendChild(li);
      const p = document.createElement('p');
      p.textContent = ingredientInstruction;
      li.appendChild(p);
    }  
    //Instructions
    for(const instruction of instructions){
      const br = document.createElement('br');
      const detailedInstruction = instruction.step;
      divInstructionList.appendChild(br);
      const p = document.createElement('p');
      p.textContent = detailedInstruction;
      divInstructionList.appendChild(p);
    } 
    const favorite = document.createElement("span");
  favorite.classList.add("material-symbols-outlined");
  favorite.innerHTML = "recommend";
  favorite.addEventListener('click', onFavoriteClick);
  const arrow_back = document.createElement("span");
  arrow_back.classList.add("material-symbols-outlined");
  arrow_back.id = "arrowBack";
  arrow_back.innerHTML = "arrow_back";
  arrow_back.addEventListener('click', onClickArrowBack);
  bestResultItem.appendChild(titleH1);
  bestResultItem.appendChild(arrow_back);
  bestResultItem.appendChild(favorite);
  bestResultItem.appendChild(img);
  bestResultItem.appendChild(ingredientsCountH2);
  bestResultItem.appendChild(ordinaryIngredientList);
  bestResultItem.appendChild(instructionsH1);
  bestResultItem.appendChild(divInstructionList);
  }else{
    searchNotFound();
  }
   
    
    //lessRelevant Recipes
    bestResultContainer.appendChild(lessRelevantItem);
    lessRelevantItem.classList.add('FlexItemImages');
    const lessRelevantH1 = document.createElement('h1');
    lessRelevantH1.textContent = 'Other Recipes: ';
    lessRelevantH1.style.flexBasis = '100%';
    lessRelevantH1.style.textAlign = 'center';
    lessRelevantItem.appendChild(lessRelevantH1);
    //meno rilevanti
    for(const result of results){
      if(result.id !== mostRelevant.id){
         const image = result.image;
         let lessRelevantImg = document.createElement('img');
         lessRelevantImg.src = image;
         lessRelevantItem.appendChild(lessRelevantImg);
         lessRelevantImg.addEventListener('click', showSelectedRecipe);
         lessRelevantImg.myParam = result.id;
      }
    }
}

function onClickArrowBack(){
  flexContainer.style.display = 'flex';
  bestResultContainer.style.display = 'none';
}

function showSelectedRecipe(event){
  const recipeID = event.currentTarget.myParam;
  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+recipeID+'/information?includeNutrition=false';
  fetch(url, options).then(onResponse, onError).then(onSelectedRecipe).catch(onError);
}

function onSelectedRecipe(json){
  //Reset the item container
  while(bestResultItem.hasChildNodes()){
    bestResultItem.removeChild(bestResultItem.firstChild);
  }
  const title = json.title;
  const image = json.image;
  const ingredients = json.extendedIngredients;
  const instructions = json.analyzedInstructions[0].steps;
  if(instructions === null){
    searchNotFound();
  }
  const titleH1 = document.createElement('h1');
  titleH1.textContent = title;
  const img = document.createElement('img');
  img.src = image;
  const ingredientsH2 = document.createElement('h2');
  ingredientsH2.textContent = 'Ingredients: ';
  const ordinaryIngredientList = document.createElement('ol');
  ordinaryIngredientList.style.listStyleType = 'none';
  const divInstructionList = document.createElement('div');
  const instructionsH1 = document.createElement('h1');
  instructionsH1.textContent = 'Instructions: ';

  //Dataset
  bestResultItem.dataset.id = json.id;
  bestResultItem.dataset.name = title;
  bestResultItem.dataset.img = image;
  bestResultItem.dataset.type = "dishes";

  //Ingredients
  if(ingredients !== null && instructions !== null){
  for(const ingredient of ingredients){
    const ingredientInstruction = ingredient.original;
    const li = document.createElement('li');
    ordinaryIngredientList.appendChild(li);
    const p = document.createElement('p');
    p.textContent = ingredientInstruction;
    li.appendChild(p);
  }
  //Instructions
  for(const instruction of instructions){
    const detailedInstruction = instruction.step;
    const br = document.createElement('br');
    const p = document.createElement('p');
    p.textContent = detailedInstruction;
    divInstructionList.appendChild(br);
    divInstructionList.appendChild(p);
  }
  const favorite = document.createElement("span");
  favorite.classList.add("material-symbols-outlined");
  favorite.innerHTML = "recommend";
  favorite.addEventListener('click', onFavoriteClick);
  const arrow_back = document.createElement("span");
  arrow_back.classList.add("material-symbols-outlined");
  arrow_back.id = "arrowBack";
  arrow_back.innerHTML = "arrow_back";
  arrow_back.addEventListener('click', onClickArrowBack);
  bestResultItem.appendChild(titleH1);
  bestResultItem.appendChild(arrow_back);
  bestResultItem.appendChild(favorite);
  bestResultItem.appendChild(img);
  bestResultItem.appendChild(ingredientsH2);
  bestResultItem.appendChild(ordinaryIngredientList);
  bestResultItem.appendChild(instructionsH1);
  bestResultItem.appendChild(divInstructionList);
}else {
      const searchNotFound = document.createElement('h1');
      searchNotFound.textContent = 'Search has given 0 results';
      bestResultItem.appendChild(searchNotFound);
      return;
    }
}

function onCocktailSearch(json){
  while(bestResultItem.hasChildNodes()){
    bestResultItem.removeChild(bestResultItem.firstChild);
  }
  while(lessRelevantItem.hasChildNodes()){
    lessRelevantItem.removeChild(lessRelevantItem.firstChild);
  }
  const drinks = json.drinks;

  if(Object.keys(drinks).length === null || Object.keys(drinks).length === 0){
    searchNotFound();
  }

  const firstDrinkResult = drinks[0];
  const drinkName = firstDrinkResult.strDrink;
  const drinkImg = firstDrinkResult.strDrinkThumb;
  const drinkInstructions = firstDrinkResult.strInstructions;
  const drinkIngredients = [];

  //Dataset
  bestResultItem.dataset.id = firstDrinkResult.idDrink;
  bestResultItem.dataset.name = drinkName;
  bestResultItem.dataset.img = drinkImg;
  bestResultItem.dataset.type = "cocktails";

  if(drinkInstructions === null) searchNotFound();
  const h1 = document.createElement('h1');
  h1.textContent = drinkName;
  const img = document.createElement('img');
  img.src = drinkImg;
  const totalIngredients = document.createElement('h2');
  const divDrinkingredients = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Instructions: ';
  const p = document.createElement('p');
  p.textContent = drinkInstructions;
  //Save variables not null in Array
  for(let i=1; i<=15; i++){
    let ingredientI = eval("firstDrinkResult.strIngredient" + i);
    if(ingredientI !== null){
      drinkIngredients.push(ingredientI);
    }
  }
  
  //Check if there are ingredients in the recipe
  if(drinkIngredients.length === 0){
    searchNotFound();
  }
  //Load variables from Array
  totalIngredients.textContent = 'Total Ingredients : '+drinkIngredients.length+'';
  divDrinkingredients.appendChild(totalIngredients);
  for(const drinkIngredient of drinkIngredients){
    const br = document.createElement('br');
    const p = document.createElement('p');
    p.textContent = drinkIngredient;
    divDrinkingredients.appendChild(br);
    divDrinkingredients.appendChild(p);
  }
  
  const favorite = document.createElement("span");
  favorite.classList.add("material-symbols-outlined");
  favorite.innerHTML = "recommend";
  favorite.addEventListener('click', onFavoriteClick);
  const arrow_back = document.createElement("span");
  arrow_back.classList.add("material-symbols-outlined");
  arrow_back.id = "arrowBack";
  arrow_back.innerHTML = "arrow_back";
  arrow_back.addEventListener('click', onClickArrowBack);
  bestResultItem.appendChild(h1);
  bestResultItem.appendChild(arrow_back);
  bestResultItem.appendChild(favorite);
  bestResultItem.appendChild(img);
  bestResultItem.appendChild(divDrinkingredients);
  bestResultItem.appendChild(h2);
  bestResultItem.appendChild(p);

  bestResultContainer.appendChild(lessRelevantItem);
  lessRelevantItem.classList.add('FlexItemImages');
  const lessRelevantH1 = document.createElement('h1');
  lessRelevantH1.textContent = 'Other Drinks: ';
  lessRelevantH1.style.flexBasis = '100%';
  lessRelevantH1.style.textAlign = 'center';
  lessRelevantItem.appendChild(lessRelevantH1);
  for(const drink of drinks){
   if(drink.idDrink !== firstDrinkResult.idDrink){
     let drinkImg = drink.strDrinkThumb;
     const otherDrinks = document.createElement('img');
     otherDrinks.src = drinkImg;
     lessRelevantItem.appendChild(otherDrinks);
     otherDrinks.addEventListener('click', showSelectedCocktail);
     otherDrinks.myParam = drink.idDrink;
   }
  }

}

function showSelectedCocktail(e){
  const cocktailID = e.currentTarget.myParam;
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+cocktailID+'';
  fetch(url).then(onResponse, onError).then(onSelectedCocktail);
}

function onSelectedCocktail(json){
  while(bestResultItem.hasChildNodes()){
    bestResultItem.removeChild(bestResultItem.firstChild);
  }
  const drink = json.drinks[0];
  const drinkName = drink.strDrink;
  const drinkImg = drink.strDrinkThumb;
  const drinkInstructions = drink.strInstructions;
  const drinkIngredients = [];
  
  //Dataset 
  bestResultItem.dataset.id = drink.idDrink;
  bestResultItem.dataset.name = drinkName;
  bestResultItem.dataset.img = drinkImg;
  bestResultItem.dataset.type = "cocktails";

  if(drinkInstructions === null) searchNotFound();

  const h1 = document.createElement('h1');
  h1.textContent = drinkName;
  const img = document.createElement('img');
  img.src = drinkImg;
  const divDrinkingredients = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Instructions: ';
  const p = document.createElement('p');
  p.textContent = drinkInstructions;
  
  //Save variables not null in Array
  for(let i=1; i<=15; i++){
    let ingredientI = eval("drink.strIngredient" + i);
    if(ingredientI !== null){
      drinkIngredients.push(ingredientI);
    }
  }
  //Check if there are ingredients in the recipe
  if(drinkIngredients.length === 0){
    const searchNotFound = document.createElement('h1');
    searchNotFound.textContent = 'Search has given 0 results';
    bestResultItem.appendChild(searchNotFound);
    return;
  }
  //Load variables from Array
  for(const drinkIngredient of drinkIngredients){
    const br = document.createElement('br');
    const p = document.createElement('p');
    p.textContent = drinkIngredient;
    divDrinkingredients.appendChild(br);
    divDrinkingredients.appendChild(p);
  }
  
  const favorite = document.createElement("span");
  favorite.classList.add("material-symbols-outlined");
  favorite.innerHTML = "recommend";
  favorite.addEventListener('click', onFavoriteClick);
  const arrow_back = document.createElement("span");
  arrow_back.classList.add("material-symbols-outlined");
  arrow_back.id = "arrowBack";
  arrow_back.innerHTML = "arrow_back";
  arrow_back.addEventListener('click', onClickArrowBack);
  bestResultItem.appendChild(h1);
  bestResultItem.appendChild(arrow_back);
  bestResultItem.appendChild(favorite);
  bestResultItem.appendChild(img);
  bestResultItem.appendChild(divDrinkingredients);
  bestResultItem.appendChild(h2);
  bestResultItem.appendChild(p);

}

function onFavoriteClick(e){
  e.currentTarget.style.color = "lightblue";
  const informazioni = e.currentTarget.parentNode;
  const formData = new FormData();
  formData.append('id', informazioni.dataset.id);
  formData.append('name', informazioni.dataset.name);
  formData.append('img', informazioni.dataset.img);
  formData.append('type', informazioni.dataset.type);
  fetch("favorites.php", {method: 'post', body: formData}).then(controllaRisposta, controllaErrore);
  e.stopPropagation();
}

function controllaRisposta(response){
  console.log(response.json);
  return response.json().then(controllaJson);
}

function controllaErrore(errore){
  console.log("Errore");
}

function controllaJson(json){
  console.log(json.verify);
  if(!json.verify){
    controllaErrore();
    return null;
  }
}