const dishesCheckBox = document.querySelector("#dishes");
const cocktailCheckBox = document.querySelector("#cocktails");
const flexHorizontalContainer = document.querySelector("#FlexHorizzontalContainer");

fetchRecipes();
function fetchRecipes(){
    fetch("fetch_favoriteRecipes.php").then(onResponse).then(onJson);
}

function onError(error){
  console.log("ERROR");
}

function onResponse(response){ 
  if(!response.ok) return null;
  return response.json();
}

function onJson(json){
  if(!json.length) {
    noResults();
    return;
  }
  
  for(let recipe in json){
    const span = document.createElement("span");
    span.classList.add("material-symbols-outlined")
    span.innerHTML = "star";
    const div = document.createElement('div');
    div.classList.add("divRecipe");
    div.dataset.id = json[result].recipe.recipeId;
    const img = document.createElement('img');
    img.src = json[result].recipe.img;
    const title = document.createElement('h1');
    title.textContent = json[result].recipe.title;
    div.dataset.type = json[result].recipe.type;
    div.appendChild(title);
    div.appendChild(span);
    div.appendChild(img);
    flexItem.appendChild(div);
    span.addEvenetListener('clic', removeFavorite);
    div.addEventListener('clic', showSelectedRecipe);
  }
} 
function removeFavorite(e){
    $id = e.target.parentNode.dataset.id;
   const formData = new FormData();
   formData.append('id', $id);
   fetch("removeFavorite.php", {method: 'post', body: formData}).then(controllaRisposta, controllaErrore);
   e.stopPropagation();
}

function controllaRisposta(response){
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
function noResults(){
    const searchNotFound = document.createElement('h1');
    searchNotFound.textContent = 'Search has given 0 results';
    flexHorizontalContainer.appendChild(searchNotFound);
}
 function showSelectedRecipe(event){
        const recipeID = event.target.dataset.id;
        const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+recipeID+'/information?includeNutrition=false';
        fetch(url, options).then(onResponse, onError).then(onClick).catch(onError);
      }

function onClick(json){
        //Reset the item container
        while(flexHorizontalContainer.hasChildNodes()){
          flexHorizontalContainer.removeChild(flexHorizontalContainer.firstChild);
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
        flexHorizontalContainer.appendChild(titleH1);
        flexHorizontalContainer.appendChild(img);
        flexHorizontalContainer.appendChild(ingredientsH2);
        flexHorizontalContainer.appendChild(ordinaryIngredientList);
        flexHorizontalContainer.appendChild(instructionsH1);
        flexHorizontalContainer.appendChild(divInstructionList);
      }else {
            const searchNotFound = document.createElement('h1');
            searchNotFound.textContent = 'Search has given 0 results';
            bestResultItem.appendChild(searchNotFound);
            return;
          }
      }