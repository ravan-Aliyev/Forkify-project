import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {

    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if(!btn) return;

      const goToPage = +btn.dataset.goto;
      
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other page
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupNext(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
        return this._generateMarkupPre(curPage)
    }
    // Other page
    if (curPage < numPages) {
      return [
        this._generateMarkupPre(curPage),
        this._generateMarkupNext(curPage),
      ];
    }
    // Page 1, and there are No other page
    return '';
  }

  _generateMarkupPre(curPage) {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
  }

  _generateMarkupNext(curPage) {
    return `
    <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
    `;
  }
}

export default new PaginationView();
