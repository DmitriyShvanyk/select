export default class Select {
  constructor({ selector, label, url }) {
    this.container = document.querySelector(selector);
    this.label = label;
    this.url = url;

    // create select
    this.render();

    // bind
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeOutside = this.closeOutside.bind(this);
    this.onClick = this.onClick.bind(this);

    const selectLabel = this.container.querySelector('.select__label');
    selectLabel.addEventListener('click', () => selectLabel.classList.contains('select__label--active') ? this.close() : this.open());
    document.addEventListener('click', this.closeOutside);
  }

  // method render
  render() {
    const selectLabel = document.createElement('button');
    const selectDropdown = document.createElement('ul');

    const selectPreloader = document.createElement('div');
    selectPreloader.classList.add('select__preloader');
    this.container.appendChild(selectPreloader);

    selectLabel.classList.add('select__label');
    selectLabel.textContent = `${this.label}`;
    selectLabel.dataset.index = 0;
    selectDropdown.classList.add('select__dropdown');

    fetch(this.url, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'include'
    }).then((resolve) => {
      return resolve.json();
    }).then(data => {

      //console.log(data.options)

      this.container.removeChild(selectPreloader);

      const selectOptions = data.options;

      for (let i = 0; i < selectOptions.length; i++) {
        const selectDropdownItem = document.createElement('li');
        selectDropdownItem.classList.add('select__dropdown-item');
        selectDropdownItem.textContent = selectOptions[i].label;
        selectDropdownItem.dataset.index = `${i}`;
        selectDropdownItem.dataset.value = selectOptions[i].label;
        selectDropdown.appendChild(selectDropdownItem);
      }

      const selectDropdownItem = this.container.querySelectorAll('.select__dropdown-item');
      Array.from(selectDropdownItem).map(item => item.addEventListener('click', this.onClick));

    }).catch(error => {
      return Promise.reject(`Ошибка: ${error.status}`);
    });

    this.container.appendChild(selectLabel);
    this.container.appendChild(selectDropdown);
  }

  // method open
  open() {
    const selectLabel = this.container.querySelector('.select__label');
    const selectDropdown = this.container.querySelector('.select__dropdown');

    if (!selectLabel) {
      return;
    }

    selectLabel.classList.add('select__label--active');
    selectDropdown.classList.add('select__dropdown--active');
  }

  // method close
  close() {
    const selectLabel = this.container.querySelector('.select__label');
    const selectDropdown = this.container.querySelector('.select__dropdown');

    if (!selectLabel) {
      return;
    }

    selectLabel.classList.remove('select__label--active');
    selectDropdown.classList.remove('select__dropdown--active');
  }

  // method close select click outside
  closeOutside(e) {
    if (!this.container.contains(e.target) && !e.target.classList.contains('btn--open')) {
      this.close();
    }
  }

  // method onClick
  onClick(e) {
    const target = e.target;

    if (this.container.contains(target)) {

      const selectLabel = this.container.querySelector('.select__label');

      if (!selectLabel) {
        return;
      }

      selectLabel.textContent = `${target.textContent} - index ${target.dataset.index}`;
      selectLabel.dataset.index = target.dataset.index;

      let selectOptions = this.container.querySelectorAll('.select__dropdown-item');

      for (let i = 0; i < selectOptions.length; i++) {
        selectOptions[i].classList.remove('select__dropdown-item--active');
      }
      target.classList.add('select__dropdown-item--active');

      this.close();
    }
  }

  // method set index
  setIndex(index) {

    const selectLabel = this.container.querySelector('.select__label');
    if (!selectLabel) {
      return;
    }

    const selectOptions = this.container.querySelectorAll('.select__dropdown-item');

    selectLabel.textContent = `${selectOptions[index].textContent} - index ${index}`;
    selectLabel.dataset.index = index;

    for (let i = 0; i < selectOptions.length; i++) {
      selectOptions[i].classList.remove('select__dropdown-item--active');
      selectOptions[index].classList.add('select__dropdown-item--active');
    }

  }

  // method get index
  getIndex() {
    const selectLabel = this.container.querySelector('.select__label');
    if (!selectLabel) {
      return;
    }
    return selectLabel.dataset.index;
  }

  // method clear
  clear() {
    const selectLabel = this.container.querySelector('.select__label');

    selectLabel.textContent = `${this.label}`;
    selectLabel.dataset.index = 0;

    const selectOptions = this.container.querySelectorAll('.select__dropdown-item');

    for (let i = 0; i < selectOptions.length; i++) {
      selectOptions[i].classList.remove('select__dropdown-item--active');
    }
  }

  // method destroy
  destroy() {
    this.container.innerHTML = '';
  }
}