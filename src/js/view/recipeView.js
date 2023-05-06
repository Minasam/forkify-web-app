import icons from "url:../../img/icons.svg";
import {Fraction} from "fractional";
import View from "./view";

class RecipeView extends View{
    parentEl = document.querySelector('.recipe');
    data;
    errorMsg = "We could not find that recipe. Please try another one!";
    message = "";

    _generateMarkup() {
        const markup = `
        <figure class="recipe__fig">
          <img src="${this.data.image}" alt="${this.data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>
  
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.data.servings}</span>
            <span class="recipe__info-text">servings</span>
  
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${this.data.servings-1}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${this.data.servings+1}">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
  
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${this.data.bookmarked ? "-fill": ""}"></use>
            </svg>
          </button>
        </div>
  
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.data.ingredients.reduce(function (str, ingredient) {
            str += `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ingredient.quantity ? (new Fraction(ingredient.quantity)).toString() : ""}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.description}
                  </div>
              </li>
              `
            return str;
        }, "")}
          </ul>
        </div>
  
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      `;

        return markup;
    }

    addHandlerRender(handler){
        window.addEventListener("hashchange", handler);
        window.addEventListener("load", handler);
    }

    addHandlerUpdateServings(handler){
      this.parentEl.addEventListener("click", function(e){
        const btn = e.target.closest(".btn--tiny");
        if(!btn) return;

        const updateTo = Number(btn.dataset.updateTo);
        if(updateTo < 1) return;
        handler(updateTo);
      })
    }

    addHandlerAddBookmark(handler){
      this.parentEl.addEventListener("click", function(e){
        const btn = e.target.closest('.btn--bookmark');
        if(!btn) return;
        handler();
      })
    }
}

export default new RecipeView();