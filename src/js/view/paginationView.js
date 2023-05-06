
import icons from "url:../../img/icons.svg";
import View from "./view";

class PaginationView extends View{
    parentEl = document.querySelector('.pagination');
    data;
    errorMsg = "No recipes found for your query! please try again ;)";
    message = "";

    addHandlerClick(handler){
        this.parentEl.addEventListener("click", function(e){
            const btn = e.target.closest(".btn--inline");

            if(!btn) return;

            const goToPage = Number(btn.dataset.goto);
            handler(goToPage);
        });
    }

    _generateMarkup(){
        const page = this.data.page;
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        const lastPage = page === numPages;

        let markup = ``;
        if(page > 1){
            markup = `
            <button data-goto="${page-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page-1}</span>
            </button>
            `
        }

        if(!lastPage){
            markup += `
            <button data-goto="${page+1}" class="btn--inline pagination__btn--next">
                <span>Page ${page+1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        return markup;
    }
}

export default new PaginationView();