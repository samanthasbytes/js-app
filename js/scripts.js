// pokemonList wrapped in IIFE pokemonRepository
let pokemonRepository = (function () {
  // pokemon array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // pushes new pokemon into the pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // doesn't directly add pokemon to the pokemonList array; instead, creates DOM elements representing the pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); // ul
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class'); // gives the button a class of .button-class; used in CSS
    listItem.appendChild(button); // appends the button to the li as its child
    pokemonList.appendChild(listItem); // appends the li to the ul as its child
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // gets list of pokemon from API
  function loadList() {
    // requests pokemon from API
    return (
      fetch(apiUrl)
        // response is passed to response parameter
        .then(function (response) {
          // accesses the json property of the response, which holds a function that parses JSON strings into JS objects; returns a promise object
          return response.json();
        })
        // if the promise is resolved, the code here runs
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        // handles errors if the promise is rejected
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  // TODO: comment the loadDetails function
  function loadDetails(item) {
    let url = item.detailsUrl;
    // fetch from API
    return (
      fetch(url)
        // accesses the json property of the response, which returns a promise
        .then(function (response) {
          return response.json();
        })
        // if promise is resolved
        .then(function (details) {
          // add details here
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        // if promise is rejected
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  // makes functions accessible outside of IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// TESTING pokemon made via push to array
// pokemonRepository.add({
//   name: 'Pikachu',
//   height: 0.4,
//   types: ['electric'],
// });

// TESTING pokemon made via DOM element
// pokemonRepository.addListItem({
//   name: 'Bulbasaur',
//   height: 0.7,
//   types: ['grass', 'poison'],
// });

// TESTING .getAll()
// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  // adds all pokemon to the ul, used to render pokemon in the UI
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// modal IIFE
let modalIIFE = (function() {
  function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');

    // clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // add the modal content: close button, title, content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal); // need to create a reusable hideModal function below, to be used for click on button, click outside modal, and when pressing esc key when the modal is visible

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    // append all the things you just made to the DOM
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    // after all the content is added give the modal container a visibility class
    modalContainer.classList.add('is-visible');

    // close the modal when the user clicks outside the modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // hideModal function
  function hideModal() {
    // TBD
  }

  // hide modal using esc key

  // one last thing... showModal is declared but never read... let's do it

})();