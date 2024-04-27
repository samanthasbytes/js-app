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
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // add details here
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
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
