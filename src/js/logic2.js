
const page = document.getElementById('app');

const CustomerProductsPage = () => {

  const products = JSON.parse(localStorage.getItem('products')) || [];

  const container = createElement('div', ['customer-products']);

  if (products.length === 0) {
    const msg = createElement('p', ['no-products'], 'No products available.');
    page.appendChild(msg);
    return;
  }
    page.innerHTML = '';
    const title = createElement(
      'h2',
      ['page-title'],
      'Available Products:'
    );
    page.appendChild(title);

  products.forEach((product) => {
    const card = createElement('div', ['product-card']);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.style.width = '100px';
    img.style.height = '100px';

    const name = createElement('h3', [], product.name);
    const details = createElement('p', [], product.details);
    const price = createElement('p', [], `$${product.price}`);
    const category = createElement('p', [], product.category);

    appendToParent(card, [img, name, details, price, category]);
    container.appendChild(card);
  });

  page.appendChild(container);
};

CustomerProductsPage();
