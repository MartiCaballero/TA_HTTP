let products = [];
let filteredProducts = products;

async function fecthProducts() {
  let url = 'http://localhost:3000/api/tasks';

  let resBody = await fetch(url, {
    method: 'GET',
  })
    .then(async function (res) {
      return await res.json();
    })
    .catch((err) => {
      console.log(err);
    });

  products = resBody;
  filteredProducts = resBody;

  displayProducts();
}

fecthProducts();

async function FuncionPOST(product) {
  let url = 'http://localhost:3000/api/tasks';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...product }),
  }).catch((err) => {
    console.log(err);
  });
}


async function FuncionDELETE() {
  
}

function filterList() {
  const name = document.getElementById('buscador').value;

  filteredProducts = products.filter((product) => product.name.toLowerCase().includes(name));
  displayProducts();
}

function handleDropdownChange() {
  const dropdownValue = document.getElementById('dropdown1').value;

  switch (dropdownValue) {
    case 'op1':
      location.reload();
      break;
    case 'op2':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'op3':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
  }

  displayProducts();
}

function newProduct() {
  const name = document.getElementById('newProductName').value;
  const description = document.getElementById('newProductDescription').value;
  const price = parseFloat(document.getElementById('newProductPrice').value);
  const image = document.getElementById('newProductImage').value;

  if (name && description && !isNaN(price) && image) {
    const newProduct = {
      name: name,
      description: description,
      price: price,
      image: image,
    };

    FuncionPOST(newProduct);
    // products.push(newProduct);

    // filteredProducts = products;
    location.reload()
    // displayProducts();

    document.getElementById('newProductName').value = '';
    document.getElementById('newProductDescription').value = '';
    document.getElementById('newProductPrice').value = '';
    document.getElementById('newProductImage').value = '';
  } else {
    alert('Por favor, completa todos los campos.');
  }
}

function displayProducts() {
  const cardContainer = document.getElementById('productCard');
  cardContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    cardContainer.innerHTML = `
    <div id="itemNotFound">
      <h3>
        Sorry, the product that you searched does not exists :(
      </h3>
    </div>
    `;
  } else {
    filteredProducts.forEach((product, index) => {
      const productCard = `
    <div class="card" draggable="true" id="product-${index}" onclick="showDetails(this.innerHTML)">
      <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="${product.image}"
                alt="${product.name}"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${product.name}</p>
                <p class="subtitle is-6">$${product.price}</p>
              </div>
            </div>
        
            <div class="content">
              "${product.description}"
              <br/>
            </div>
          </div>
    </div>
    `;
      cardContainer.innerHTML += productCard;
    });
  }

  addDragAndDropFunctionality();
}

function addDragAndDropFunctionality() {
  const draggableItems = document.querySelectorAll('.card');
  const shop = document.getElementById('shop');

  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text', e.target.id);
    });
  });

  shop.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  shop.addEventListener('drop', function (e) {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(productId);

    // Crea una copia del producto arrastrado
    const clonedElement = draggedElement.cloneNode(true);
    clonedElement.style.cursor = 'default'; // Deshabilita el arrastre en la canasta
    clonedElement.setAttribute('draggable', 'false'); // Deshabilita arrastrar en la canasta

    // Añade la copia a la canasta visual y almacena en localStorage
    addToBasket(productId);
  });
}

// Almacena los productos en la canasta en localStorage
function addToBasket(productId) {
  const productIndex = productId.split('-')[1];
  const product = products[productIndex];

  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  basket.push(product);
  localStorage.setItem('basket', JSON.stringify(basket));
}

// Redirige a la página de la canasta
function goToBasket() {
  window.location.href = 'basket.html';
}

// Initialize display with all products
displayProducts();

function showDetails(rawProduct) {
  const detailsModal = document.getElementById('modalProductDetails');
  detailsModal.classList.add('is-active');

  const product = document.createElement('div');
  product.innerHTML = rawProduct;

  const name = product.querySelector('.title.is-4').textContent;
  const price = product.querySelector('.subtitle.is-6').textContent;
  const description = product.querySelector('.content').textContent;
  const imageUrl = product.querySelector('img').src;

  console.log('Product Name:', name);
  console.log('Product Price:', price);
  console.log('Product Description:', description);
  console.log('Product Image URL:', imageUrl);

  const modalContent = document.getElementById('modalProductDetailsContent');
  modalContent.innerHTML = `
    <div class="box">
      <h2>Name</h2>
      <p>${name}</p>
      <h2>Description</h2>
      <p>${description}</p>
      <h2>Price</h2>
      <p>${price}</p>
      <figure class="image is-4by3">
        <img
          src="${imageUrl}"
          alt="${name}"
        />
      </figure>
    </div>
  `;
}

function showNewProduct() {
  const detailsModal = document.getElementById('modalNewProduct');
  detailsModal.classList.add('is-active');
}

function closeNewProductModal() {
  const detailsModal = document.getElementById('modalNewProduct');
  detailsModal.classList.remove('is-active');
}

function closeDetailsModal() {
  const detailsModal = document.getElementById('modalProductDetails');
  detailsModal.classList.remove('is-active');
}

function emptyCart() {
  localStorage.clear();
  window.location.reload();
}
