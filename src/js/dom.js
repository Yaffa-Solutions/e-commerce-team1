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


const createInput=(name,type)=>{
    let input=createElement('input')
    input.type=type
    input.name=name
    return input
}

const createSelect=(categories)=>{
    let select=createElement('select')
    select.name='category'
    let options=[]
    categories.forEach((category)=>{
        let option=createElement('option',[],category)
        option.value=category
        options.push(option)
    })
    appendToParent(select, options)
    return select
}
