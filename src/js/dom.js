const createElement = (tag, classes = [], text = '') => {
  let element = document.createElement(tag);
  classes.forEach((clas) => {
    element.classList.add(clas);
  });
  element.textContent = text;
  return element;
};

const appendToParent = (parent, children = []) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};




const createInput=(name,classes=[],type,value)=>{
    let input=createElement('input',classes)
    input.type=type
    input.name=name
    input.value=value
    return input
}

const createSelect=(categories,classes=[],selectValue='')=>{
    let select=createElement('select',classes)
    select.name='category'
    const categoriesOptions =categories.map((category)=>{
        let option=createElement('option',[],category)
        option.value=category
        if(selectValue==category){
            option.selected=true
        }
        return option
    })
    appendToParent(select, categoriesOptions)
    return select
}
//#2
const createTable = (products) => {
    const table = createElement('table', ['product-table'])
    
    const thead = createElement('thead')
    const headerRow = createElement('tr')
    const headers = ['Image', 'Name', 'Details', 'Price ($)', 'Category', 'Actions']
    headers.forEach(text => {
        const th = createElement('th', [], text)
        appendToParent(headerRow, [th])
    })
    appendToParent(thead, [headerRow])

    const tbody = createElement('tbody')
    products.forEach((product) => {
        const row = createElement('tr')

        const imageTd = createElement('td')
        const img = document.createElement('img')
        img.src = product.image
        img.alt = product.name
        img.style.width = 'auto'
        img.style.height = '100px'
        imageTd.style.width = '150px'
        imageTd.appendChild(img)
        
        const nameTd = createElement('td', [], product.name)
        const detailTd = createElement('td', [], product.details)
        const priceTd = createElement('td', [], product.price.toString())
        const categoryTd = createElement('td', [], product.category)

        const actionsTd = createElement('td')
        const editBtn = createElement('button', ['edit-btn'], 'Edit')
        const deleteBtn = createElement('button', ['delete-btn'], 'Delete')
        appendToParent(actionsTd, [editBtn, deleteBtn])

        appendToParent(row, [imageTd, nameTd, detailTd, priceTd, categoryTd, actionsTd])
        appendToParent(tbody, [row])
    })

    appendToParent(table, [thead, tbody])
    return table
}

const nav = document.createElement('nav');
nav.classList.add('navbar');

// Logo
const logoWrapper = document.createElement('div');
logoWrapper.classList.add('logo-wrapper');

const logo = document.createElement('div');
logo.classList.add('logo');
logo.textContent = 'Ecommerce';

logoWrapper.appendChild(logo);

const menuWrapper = document.createElement('div');
menuWrapper.classList.add('menu-wrapper');

const mainMenu = document.createElement('ul');
mainMenu.classList.add('main-menu');

menuWrapper.appendChild(mainMenu);

nav.appendChild(logoWrapper);
nav.appendChild(menuWrapper);

const items = [
  { type: 'text', label: 'Home', icon: 'fa-house' },
  {
    type: 'mega-menu',
    label: 'Categories',
    icon: 'fa-th-large',
    columns: [
      { title: 'Electronics', items: ['Phones', 'Laptops', 'Accessories'] },
      { title: 'Clothing', items: ['Men', 'Women', 'Kids'] },
      { title: 'Home & Kitchen', items: ['Furniture', 'Cookware', 'Decor'] }
    ]
  },
  { type: 'text', label: 'Deals', icon: 'fa-tags' },
  { type: 'cart', icon: 'fa-shopping-cart' }
];

function createIcon(className) {
  const icon = document.createElement('i');
  icon.className = `fa-solid ${className}`;
  icon.style.marginRight = '6px';
  return icon;
}

function createColumn(columnData) {
  const column = document.createElement('div');
  column.classList.add('column');

  const title = document.createElement('h4');
  title.textContent = columnData.title;
  column.appendChild(title);

  const ul = document.createElement('ul');
  columnData.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  column.appendChild(ul);

  return column;
}

items.forEach(item => {
  const li = document.createElement('li');
  li.classList.add('menu-item');

  if (item.type === 'text') {
    li.appendChild(createIcon(item.icon));
    li.append(item.label);
  } else if (item.type === 'mega-menu') {
    li.classList.add('mega-menu-parent');
    li.appendChild(createIcon(item.icon));
    li.append(item.label);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');

    item.columns.forEach(columnData => {
      const column = createColumn(columnData);
      megaMenu.appendChild(column);
    });

    li.appendChild(megaMenu);
  } else if (item.type === 'cart') {
    li.classList.add('cart-icon');
    const icon = createIcon(item.icon);
    li.appendChild(icon);
    li.addEventListener('click', renderCartPage);
  }

  mainMenu.appendChild(li);
});

nav.appendChild(mainMenu);
document.body.prepend(nav);

const hero = document.createElement('div');
hero.classList.add('hero-section');


const heroText = document.createElement('div');
heroText.classList.add('hero-text');
heroText.textContent = 'Find quality products at the best prices.';


const searchBox = document.createElement('div');
searchBox.classList.add('search-box');

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Search for products...';

const button = document.createElement('button');
button.innerHTML = '<i class="fa fa-search"></i>';

searchBox.appendChild(input);
searchBox.appendChild(button);

hero.appendChild(heroText);
hero.appendChild(searchBox);
document.body.insertBefore(hero, document.body.children[1]);

function renderCartPage() {
  document.body.innerHTML = ''; 

  const title = document.createElement('h1');
  title.textContent = 'cart';
  document.body.appendChild(title);

  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');
  document.body.appendChild(cartContainer);

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `
    <strong>total:</strong> $<span id="total">0</span>
  `;
  document.body.appendChild(totalDiv);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cart.forEach((item, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('cart-item');

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;

    const details = document.createElement('div');
    details.classList.add('cart-details');
    details.innerHTML = `
      <strong>${item.name}</strong><br>
      price: $${item.price}<br>
      quantity: ${item.quantity}<br>
      total: $${(item.price * item.quantity).toFixed(2)}
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartPage(); 
    };

    productDiv.appendChild(image);
    productDiv.appendChild(details);
    productDiv.appendChild(deleteBtn);

    cartContainer.appendChild(productDiv);

    total += item.price * item.quantity;
  });

  document.getElementById('total').textContent = total.toFixed(2);


  const backBtn = document.createElement('button');
  backBtn.textContent = 'back';
  backBtn.style.marginTop = '20px';
  backBtn.addEventListener('click', () => {
    location.reload(); // أو renderHome
  });

  document.body.appendChild(backBtn);
}

const page = document.getElementById('app');

const CustomerProductsPage = () => {
  page.innerHTML = '';

  const products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    const msg = createElement('p', ['no-products'], 'No products available.');
    page.appendChild(msg);
    return;
  }

  const title = createElement('h2', ['page-title'], 'Available Products:');
  page.appendChild(title);

  const btnContainer = createElement('div', ['view-buttons']);
 /* const gridBtn = createElement('button', ['grid-btn'], 'View as Grid');
  const listBtn = createElement('button', ['list-btn'], 'View as List');
  appendToParent(btnContainer, [gridBtn, listBtn]);*/
  const toggleBtn = createElement('button', ['toggle-view'], 'View as List');
  btnContainer.appendChild(toggleBtn);

  page.appendChild(btnContainer);

  const container = createElement('div', ['customer-products', 'grid-view']);
  page.appendChild(container);

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
      const price = createElement('p', [], product.price);
      const category = createElement('p', [], product.category);

      appendToParent(card, [img, name, details, price, category]);
      container.appendChild(card);
    });
  };


    let currentView = 'grid';
    container.classList.add('grid-view'); 
    renderProducts(currentView);
    toggleBtn.textContent = 'View as List';
    renderProducts(currentView);

    toggleBtn.addEventListener('click', () => {
        if (currentView === 'grid') {
           currentView = 'list';
           container.classList.remove('grid-view');
           container.classList.add('list-view');
           toggleBtn.textContent = 'View as Grid';
        } else {
          currentView = 'grid';
          container.classList.remove('list-view');
          container.classList.add('grid-view');
         toggleBtn.textContent = 'View as List';
    }

    renderProducts(currentView);
  });

  
};

CustomerProductsPage();

