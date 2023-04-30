import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _windowElement = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  _ingColumn = document.querySelector('.foringredient');
  _btnAddIng = document.querySelector('.newing');

  _count = 6;

  constructor() {
    super();
    this._addHandlerNewIng();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _addHandlerNewIng() {
    this._btnAddIng.addEventListener('click', this._markUp.bind(this));
  }

  _markUp() {
    this._count += 1;
    const markup = `
      <label>Ingredient ${this._count}</label>
      <input
      type="text"
      name="ingredient-${this._count}"
      placeholder="Format: 'Quantity,Unit,Description'"
      />
      `;
    //   ingNum += 1
    this._ingColumn.insertAdjacentHTML('beforeend', markup);
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggleWindow.bind(this))
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
}

export default new AddRecipeView();
