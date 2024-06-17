let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // creates DOM elements representing pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); // ul

    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('custom-button', 'btn', 'btn-dark', 'btn-lg');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then(function () {
        showModal(pokemon);
      })
      .catch(function (error) {
        console.error('Error loading Pokemon details:', error);
      });
  }

  function showModal(item) {
    let modalTitle = document.querySelector('#exampleModalLabel');
    modalTitle.innerText = item.name;
    
    let modalBody = document.querySelector('.modal-body');

    modalBody.innerHTML = `
    <img src="${item.imageUrl}" class="img-fluid" alt="${item.name}">
    <p>Height: ${item.height / 10} m</p>
    <p>Type: ${item.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
    `;

    exampleModal.show();
  }

  // fetches pokemon name and details URL
  // ! ASYNC LOAD LISST
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

  // ! REGULAR LOAD LIST
  function loadList() {
    // requests pokemon from API
    return fetch(apiUrl)
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
        });
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
