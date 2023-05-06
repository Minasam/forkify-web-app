import icons from "url:../../img/icons.svg";

export default class View{

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)){
            return this.renderError();
        }
        this.data = data;
        const markup = this._generateMarkup();
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    update(data){
        this.data = data;
        const newMarkup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));

        const curElements = Array.from(this.parentEl.querySelectorAll('*'));

        newElements.forEach((newEl, index) => {
            const curEl = curElements[index];

            // update changed text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
                console.log(curEl.textContent);
                console.log(newEl.textContent);
                curEl.textContent = newEl.textContent;
            }

            // update changed attribute
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach
                    ((attr) => curEl.setAttribute(attr.name, attr.value));
            }
        });
    }

    renderSpinner() {
        const spinnerHtml = `
                <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>
              `;
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", spinnerHtml);
    }

    renderError(errorMsg = this.errorMsg){
        const errorHTML = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${errorMsg}</p>
            </div>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", errorHTML);
    }

    renderMessage(msg = this.message){
        const errorHTML = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${msg}</p>
            </div>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", errorHTML);
    }

    _clear() {
        this.parentEl.innerHTML = "";
    }
}