
createNav()
createHeroSection()
const moreCategory = document.querySelector('.category-item:last-child');
    const dropdown = document.querySelector('.dropdown');

   if (moreCategory && dropdown) {
      let dropdownOpen = false;

    moreCategory.addEventListener('click', (e) => {
      e.stopPropagation(); 
      dropdownOpen = !dropdownOpen;
      dropdown.style.display = dropdownOpen ? 'block' : 'none';
  });

     document.addEventListener('click', () => {
      if (dropdownOpen) {
        dropdown.style.display = 'none';
        dropdownOpen = false;
      }
    });
 
   }

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find(p => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}


/*function removeFromCart(index) {
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartPage();
}


function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}


function renderCartPage() {
  document.body.innerHTML = ''

  const title = document.createElement('h1');
  title.textContent = 'cart';
  document.body.appendChild(title);

  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');
  document.body.appendChild(cartContainer);

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `
    <strong>total :</strong> $<span id="total">0</span>
  `;
  document.body.appendChild(totalDiv);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;
    image.style.width = '80px';
    image.style.height = '80px';
    image.style.objectFit = 'cover';
    image.style.borderRadius = '8px';

    const details = document.createElement('div');
    details.classList.add('cart-details');
    details.innerHTML = `
      <strong>${item.name}</strong><br>
       price: $${item.price}<br>
       quantity : ${item.quantity}<br>
        total: $${(item.price * item.quantity).toFixed(2)}
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', () => removeFromCart(index));

    itemDiv.appendChild(image);
    itemDiv.appendChild(details);
    itemDiv.appendChild(deleteBtn);

    cartContainer.appendChild(itemDiv);

    total += item.price * item.quantity;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

<<<<<<< HEAD
// const page = document.getElementById('app');
=======
const page = document.getElementById('app');
>>>>>>> develop

const CustomerProductsPage = () => {
  page.innerHTML = '';

  const products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    const msg = createElement('p', ['no-products'], 'No products available.');
    page.appendChild(msg);
    return;
  }
  const bigDiv = createElement('div', ['products-container']);
  const header = createElement('h2', ['page-title'], 'Available Products:');

  const btnContainer = createElement('div', ['view-buttons']);
  const gridBtn = createElement('button', ['grid-btn'], 'View as Grid');
  const listBtn = createElement('button', ['list-btn'], 'View as List');
  appendToParent(btnContainer, [gridBtn, listBtn]);

  const container = createElement('div', ['customer-products', 'grid-view']);

  const renderProducts = (viewType = 'grid') => {
    container.innerHTML = '';

    products.forEach((product) => {
      const card = createElement(
        'div',
        ['product-card'].concat(viewType === 'list' ? ['list-item'] : [])
      );

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.style.width = '100px';
      img.style.height = '100px';

      const name = createElement('h3', [], product.name);
      const details = createElement('p', [], product.details);
      const price = createElement('p', [], `$${product.price}`);
      const category = createElement('p', [], product.category);

      const addToCartBtn = createElement(
        'button',
        ['add-to-cart-btn'],
        'Add to Cart'
      );


      appendToParent(card, [img, name, details, price, category, addToCartBtn]);
      appendToParent(container, [card]);
    });
  };

  renderProducts('grid');
  appendToParent(bigDiv, [header, btnContainer, container]);
  appendToParent(page, [bigDiv]);

  gridBtn.addEventListener('click', () => {
    container.classList.remove('list-view');
    container.classList.add('grid-view');
    renderProducts('grid');
  });

  listBtn.addEventListener('click', () => {
    container.classList.remove('grid-view');
    container.classList.add('list-view');
    renderProducts('list');
  });
};

CustomerProductsPage();*/
