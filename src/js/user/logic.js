
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
