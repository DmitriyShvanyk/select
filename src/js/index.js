import '../pages/index.css'

// select
import '../blocks/select/select.css'
import Select from '../blocks/select/select.js'


window.addEventListener('DOMContentLoaded', () => {

  const select = new Select({
    selector: '.select',
    label: 'Selected technolodgy',
    url: '../select.json'
  });

  // console.log(select)


  // open
  const btnOpen = document.querySelector('.btn--open');
  btnOpen.addEventListener('click', () => {
    select.open();
  });

  // close
  const btnClose = document.querySelector('.btn--close');
  btnClose.addEventListener('click', () => {
    select.close();
  });

  // set index
  const btnSetIndex = document.querySelector('.btn--set-index');

  btnSetIndex.addEventListener('click', () => {
    select.setIndex(2);
  });

  // get index
  const btnGetIndex = document.querySelector('.btn--get-index');
  const selectAction = document.querySelector('.select__action');
  btnGetIndex.addEventListener('click', () => {
    select.getIndex();
    selectAction.textContent = `Index: ${select.getIndex()}`;
  });

  // clear
  const btnClear = document.querySelector('.btn--clear');
  btnClear.addEventListener('click', () => {
    select.clear();
  });

  // destroy
  const btnDestroy = document.querySelector('.btn--destroy');
  btnDestroy.addEventListener('click', () => {
    select.destroy();
  });

});


