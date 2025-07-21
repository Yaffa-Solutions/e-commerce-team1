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
