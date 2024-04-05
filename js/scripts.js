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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1.7) {
    document.write(
      pokemonList[i].name +
        ` (height: ${pokemonList[i].height}) - Wow, that's big!<br/>`
    );
  } else {
    document.write(
      pokemonList[i].name + ` (height: ${pokemonList[i].height})<br/>`
    );
  }
}
