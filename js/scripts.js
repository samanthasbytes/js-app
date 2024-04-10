let pokemonRepository = (function () {
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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

// use the code below to test the add function
// pokemonRepository.add({
//   name: 'Pikachu',
//   height: 0.4,
//   types: ['electric']
// });

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height >= 1.7) {
    document.write(
      pokemon.name + ` (height: ${pokemon.height}) - Wow, that's big!<br>`
    );
  } else {
    document.write(pokemon.name + ` (height: ${pokemon.height})<br>`);
  }
});
