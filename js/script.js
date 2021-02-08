document.getElementById('search-button').addEventListener('click', function () {
    const mealNameInput = document.getElementById('meal-name-input').value;
    returnMealDetail(mealNameInput);
    document.getElementById("meal-name-input").value = "";
    document.getElementById("total-search-result").innerHTML = "";
    document.getElementById("meal-info").innerHTML = "";
    document.getElementById("warning").innerHTML = "";
    document.getElementById("result-headline").style.display = "block";
})

const returnMealDetail = mealNameInput => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealNameInput)
    .then(response => response.json())
    .then(data => {
        const totalSearchResult = document.getElementById('total-search-result');
        data.meals.forEach( meals => {
            const mealName = meals.strMeal;
            const getingMaleImage = meals.strMealThumb;
            totalSearchResult.innerHTML += `
            <div onclick="showCookingMealDetails(${meals.idMeal})" class="col-3 card d-flex justify-content-start align-items-center m-3 card-main">
                <div>
                   <img src="${getingMaleImage}" class="male-image">
                   <div class="card-body">
                        <h5 class="card-title text-center px-3">${mealName}</h5>
                    </div>
                </div>
            </div>
            `;
        });
    })
    .catch(error => {
        // alert("Cooking Master Searching Meal not Found");
        document.getElementById("warning").innerHTML = `
            <div id="warning" class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Searching Result!</strong> For Cooking Master Meal Recepie Not Found, Try with meaningful meal name !!!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    });
}

const showCookingMealDetails = (itemId) =>{
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
   fetch(url)
   .then(response => response.json())
   .then(data => mealIngredient(data.meals[0]));
}

const mealIngredient = (meal) => {
     // taking empty array for push new value
     const mealIngredients = [];
     // 'strIngredient' -> start at position 1 and end at position 20
     for (let i = 1; i <= 20; i++) {
         if (meal[`strIngredient${i}`] != "") {
             mealIngredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`);
            }
        }
        const mealInfo = document.getElementById('meal-info');
        mealInfo.innerHTML = `
        <div class="card d-flex justify-content-start align-items-center m-3 mx-auto cooking-details-main">
            <div>
                <img src="${meal.strMealThumb}" class="info-details-image">
                <div class="card-body">
                    <h1>${meal.strMeal}</h1>
                    <h4>Ingredient</h4>
                    <ul class="">
                        ${mealIngredients.map(mealIngredients =>`<li><i class="fas fa-check-square check-mark"></i> ${mealIngredients}
                        </li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        `;
}
 