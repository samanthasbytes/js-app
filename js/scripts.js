// pokemonList wrapped in IIFE pokemonRepository
let pokemonRepository = (function () {
  // pokemon array
  let pokemonList = [
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
    },

    {
      name: 'Jigglypuff',
      height: 0.5,
      types: ['fairy', 'normal'],
    },

    {
      name: 'Psyduck',
      height: 0.8,
      types: ['water'],
    },
  ];

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
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // makes functions accessible outside of IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// testing pokemon made via push to array
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric'],
});

// testing pokemon made via DOM element
pokemonRepository.addListItem({
  name: 'Bulbasaur',
  height: 0.7,
  types: ['grass', 'poison'],
});

// logs all pokemon to the console
console.log(pokemonRepository.getAll());

// adds all pokemon to the ul, used to render pokemon in the UI
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
