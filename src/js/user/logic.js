const page = document.getElementById('app');

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

      appendToParent(card, [img, name, details, price, category]);
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

CustomerProductsPage();
