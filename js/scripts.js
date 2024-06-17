let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // creates DOM elements representing pokemon and an event listener that calls showDetails
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); // ul

    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', );

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-dark', 'btn-lg');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // calls loadDetails, then showModal
  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then(function () {
        showModal(pokemon);
      })
      .catch(function (error) {
        console.error('Error loading Pokemon details:', error);
      });
  }

  // dynamically generates modal title and body
  function showModal(item) {
    let modalTitle = document.querySelector('#exampleModalLabel');
    modalTitle.innerText = item.name;
    
    let modalBody = document.querySelector('.modal-body');

    modalBody.innerHTML = `
    <img id="modal-image" src="${item.imageUrl}" class="img-fluid mb-3" alt="${item.name}">
    <p>Height: ${item.height / 10} m</p>
    <p class="" id="modal-types">Types: ${item.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
    `;
  }

  // fetches pokemon name and details URL
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // fetches pokemon image, height and types
  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

// adds all pokemon to the ul, used to render pokemon in the UI
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
