// pokemon IIFE
let pokemonRepository = (function () {
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
    // button.innerText = pokemon.name; // lowercase
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('button-class');
    listItem.appendChild(button); // appends the button to the li
    pokemonList.appendChild(listItem); // appends the li to the ul
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = pokemon.name;
      let modalText = `Height: ${pokemon.height / 10} m`; // height in meters
      let modalImage = pokemon.imageUrl;
      modalRepository.showModal(modalTitle, modalText, modalImage);
    });
  }

  // fetches list of pokemon from API
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

  // fetches pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    // fetch from API
    return (
      fetch(url)
        // accesses the json property of the response, which returns a promise
        .then(function (response) {
          return response.json();
        })
        // if promise is resolved, fetches specified details
        .then(function (details) {
          // add details here
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types; // TODO add types
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

pokemonRepository.loadList().then(function () {
  // adds all pokemon to the ul, used to render pokemon in the UI
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// modal IIFE
let modalRepository = (function () {
  function showModal(title, text, image) {
    let modalContainer = document.querySelector('#modal-container');

    // clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // add the modal content: close button, title, content, image
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';
    closeButtonElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>'; // prompted ChatGPT to generate SVG code for a simple black "X"
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    // titleElement.innerText = title; // lowercase
    titleElement.innerText = title.charAt(0).toUpperCase() + title.slice(1);

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = image;

    // append all the things you just made to the DOM
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
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
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // close modal using esc key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  return {
    showModal: showModal,
    hideModal: hideModal,
  };
})();
