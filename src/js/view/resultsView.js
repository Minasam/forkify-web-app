import icons from "url:../../img/icons.svg";
import View from "./view";

class ResultsView extends View{
    parentEl = document.querySelector('.results');
    data;
    errorMsg = "No recipes found for your query! please try again ;)";
    message = "";

    _generateMarkup() {
        const id = window.location.hash.slice(1);

        const markup = `
        ${this.data.map(function(recipe){
            return `
            <li class="preview">
                <a class="preview__link ${window.location.hash.slice(1) === recipe.id ? "preview__link--active": ""}" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src="${recipe.image}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title}</h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`
        }).join('')}   
      `;
        return markup;
    }
}

export default new ResultsView();

