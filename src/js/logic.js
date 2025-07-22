let products = JSON.parse(localStorage.getItem('products')) || []

const page=document.getElementById('app')
const productForm=()=>{
    const bigDiv=createElement('div',['form-container'])
    const header=createElement('h2',[],'Add Product')
    const form=createElement('form')
    const labelName=createElement('label',[],'ProductName')
    const inputName=createInput('productname','text')

    const labelDetail=createElement('label',[],'ProductDetail')
    const inputDetail=createElement('textarea')

    const labelPrice=createElement('label',[],'Price ($)')
    const inputPrice=createInput('price','number')

    const labelImage=createElement('label',[],'Image URL')
    const inputImage=createInput('image','text')

    const labelCategory=createElement('label',[],'Category')
    const categories=['-- Select Category --','Clothing','Electronics','Home Appliances','Accessories','Toys']
    const inputCategory=createSelect(categories)

    const divButtons=createElement('div',['button-group'])
    const submitButton=createElement('button',[], 'Add Product')
    const cancelButton=createElement('button',[], 'Cancel')

    submitButton.type='submit'
    cancelButton.type='button'
    appendToParent(divButtons,[submitButton,cancelButton])
    appendToParent(form,[labelName,inputName,labelDetail,inputDetail,labelPrice,inputPrice,labelImage,inputImage,labelCategory,inputCategory, divButtons])
    appendToParent(bigDiv,[header,form])
    appendToParent(page,[bigDiv])
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let newProduct = {
            name: inputName.value,
            details: inputDetail.value,
            price: parseFloat(inputPrice.value),
            image: inputImage.value,
            category: inputCategory.value
        }

         products.push(newProduct)
         localStorage.setItem('products', JSON.stringify(products))

        ProductTablePage()
})
     cancelButton.addEventListener('click', () => {
        ProductTablePage() 
    })
}

// productForm()

// #2
function ProductTablePage() {
    page.innerHTML = ''

    const container = createElement('div', ['product-table-container'])
    const header = createElement('h2', [], 'Product List')
    const searchBar = createSearchBar()
    const addBtn = createElement('button', ['add-product-btn'], 'Add New Product')

    addBtn.addEventListener('click', () => productForm())

    const table = createTable(products)

    table.querySelectorAll('.edit-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => showEditProductPage(index))
    })

    table.querySelectorAll('.delete-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            products.splice(index, 1)
            localStorage.setItem('products', JSON.stringify(products))
            updateProductTable(products) 
        })
    })

    appendToParent(container, [header, addBtn, searchBar, table])
    appendToParent(page, [container])
}

 ProductTablePage()
function showEditProductPage(index) {
  page.innerHTML = ''

  let product = products[index]

  let bigDiv = createElement('div', ['form-container'])
  let header = createElement('h2', [], 'Edit Product')
  let form = createElement('form')

  let labelName = createElement('label', [], 'ProductName')
  let inputName = createInput('productname', 'text')
  inputName.value = product.name

  let labelDetail = createElement('label', [], 'ProductDetail')
  let inputDetail = createElement('textarea')
  inputDetail.value = product.details

  let labelPrice = createElement('label', [], 'Price ($)')
  let inputPrice = createInput('price', 'number')
  inputPrice.value = product.price

  let labelImage = createElement('label', [], 'Image URL')
  let inputImage = createInput('image', 'text')
  inputImage.value = product.image

  let labelCategory = createElement('label', [], 'Category')
  let categories = ['-- Select Category --', 'Clothing', 'Electronics', 'Home Appliances', 'Accessories', 'Toys']
  let inputCategory = createSelect(categories)
  inputCategory.value = product.category

  let divButtons = createElement('div', ['button-group'])
  let saveButton = createElement('button', [], 'Save')
  let cancelButton = createElement('button', [], 'Cancel')

  saveButton.type = 'submit'
  cancelButton.type = 'button'

  appendToParent(divButtons, [saveButton, cancelButton])
  appendToParent(form, [
    labelName, inputName,
    labelDetail, inputDetail,
    labelPrice, inputPrice,
    labelImage, inputImage,
    labelCategory, inputCategory,
    divButtons
  ])
  appendToParent(bigDiv, [header, form])
  appendToParent(page, [bigDiv])

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    products[index] = {
      name: inputName.value,
      details: inputDetail.value,
      price: parseFloat(inputPrice.value),
      image: inputImage.value,
      category: inputCategory.value
    }
    console.log('Updated product:', products[index])

    localStorage.setItem('products', JSON.stringify(products))
    ProductTablePage()
  })

  cancelButton.addEventListener('click', () => {
    ProductTablePage()
  })
}

function createSearchBar() {
  const input = document.createElement('input')
  input.type = 'text'
  input.id = 'searchBar'
  input.placeholder = 'Search products...'

  input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase()
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.details.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    )

    updateProductTable(filtered)
  })

  return input
}
function updateProductTable(filteredProducts) {
  const oldTable = document.querySelector('.product-table-container table')
  if (oldTable) oldTable.remove()

  const newTable = createTable(filteredProducts)

  newTable.querySelectorAll('.edit-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {

      const realIndex = products.findIndex(p => p.name === filteredProducts[index].name)
      showEditProductPage(realIndex)
    })
  })

  newTable.querySelectorAll('.delete-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const realIndex = products.findIndex(p => p.name === filteredProducts[index].name)
      products.splice(realIndex, 1)
      localStorage.setItem('products', JSON.stringify(products))
      ProductTablePage()
    })
  })

  document.querySelector('.product-table-container').appendChild(newTable)
}
