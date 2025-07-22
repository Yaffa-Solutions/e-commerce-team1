const createElement=(tag,classes=[],text='')=>{
    let element=document.createElement(tag)
    classes.forEach((cls)=>{
        element.classList.add(cls)
    })
    element.textContent=text
    return element
}

const appendToParent=(parent,children)=>{
    children.forEach((child)=>{
        parent.appendChild(child)
    })
}


const createInput=(name,type)=>{
    let input=createElement('input')
    input.type=type
    input.name=name
    return input
}

const createSelect=(categories)=>{
    let select=createElement('select')
    select.name='category'
    categories.forEach((cat)=>{
        let option=createElement('option',[],cat)
        option.value=cat
        appendToParent(select,[option])
    })
    return select
}
//  #2
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
        img.style.width = '50px'
        img.style.height = '50px'
        imageTd.appendChild(img)
        
        const nameTd = createElement('td', [], product.name)
        const detailTd = createElement('td', [], product.details)
        const priceTd = createElement('td', [], product.price.toString())
        const categoryTd = createElement('td', [], product.category)

        const actionsTd = createElement('td')
        const editBtn = createElement('button', ['edit-btn'], 'Edit')
        const deleteBtn = createElement('button', ['delete-btn'], 'Delete')
        appendToParent(actionsTd, [editBtn, deleteBtn])

        appendToParent(row, [imageTd,nameTd, detailTd, priceTd,categoryTd, actionsTd])
        appendToParent(tbody, [row])
    })

    appendToParent(table, [thead, tbody])
    return table
}
