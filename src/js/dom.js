const createElement=(tag,classes=[],text='')=>{
    let element=document.createElement(tag)
    classes.forEach((clas)=>{
        element.classList.add(clas)
    })
    element.textContent=text
    return element
}

const appendToParent=(parent,children=[])=>{
    children.forEach((child)=>{
        parent.appendChild(child)
    })
}


const createInput=(name,classes=[],type)=>{
    let input=createElement('input',classes)
    input.type=type
    input.name=name
    return input
}

const createSelect=(categories)=>{
    let select=createElement('select')
    select.name='category'
    const categoriesOptions =categories.map((category)=>{
        let option=createElement('option',[],category)
        option.value=category
        return option
    })
    appendToParent(select, categoriesOptions)
    return select
}
