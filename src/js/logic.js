const page=document.getElementById('app')
const productForm=()=>{
    const bigDiv=createElement('div',['form-container'])
    const header=createElement('h2',[],'Add Product')
    const form=createElement('form')
    let divName=createElement('div')
    const labelName=createElement('label',[],'ProductName')
    const inputName=createInput('productname',['inputs_style'],'text')
    appendToParent(divName,[labelName,inputName])

    let divDetail=createElement('div')
    const labelDetail=createElement('label',[],'ProductDetail')
    const inputDetail=createElement('textarea',['inputs_style'])
    inputDetail.name='productdetail'
    appendToParent(divDetail,[labelDetail,inputDetail])

    let divPrice=createElement('div')
    const labelPrice=createElement('label',[],'Price ($)')
    const inputPrice=createInput('price',['inputs_style'],'number')
    appendToParent(divPrice,[labelPrice,inputPrice])

    let divImage=createElement('div')
    const labelImage=createElement('label',[],'Image URL')
    const inputImage=createInput('image',['inputs_style'],'text')
    appendToParent(divImage,[labelImage,inputImage])

    let divCategory=createElement('div')
    const labelCategory=createElement('label',[],'Category')
    const categories=['Clothing','Electronics','Home Appliances','Accessories','Toys']
    const inputCategory=createSelect(categories)
    appendToParent(divCategory,[labelCategory,inputCategory])

    const divButtons=createElement('div',['button-group'])
    const submitButton=createElement('button',[], 'Add Product')
    const cancelButton=createElement('button',[], 'Cancel')

    submitButton.type='submit'
    cancelButton.type='button'
    appendToParent(divButtons,[submitButton,cancelButton])
    appendToParent(form,[divName,divDetail,divPrice,divImage,divCategory, divButtons])
    appendToParent(bigDiv,[header,form])
    appendToParent(page,[bigDiv])
}

productForm()


const InputValue=(input)=>{
    return input.value.trim()
}

const validation=()=>Array.from(document.getElementsByClassName('inputs_style')).forEach(input => {
    isInputEmpty(input)
    if(input.type=='number'){
        validatePrice(input)
    }
    input.addEventListener('input',()=>{
        const p=input.parentElement.querySelector('p')
        if(p){
            p.remove()
        }
    });

});

const isInputEmpty=(input)=>{
    const value=InputValue(input)
    if(value==''){
        const p=createElement('p',[],`${input.name} is requried`)
        appendToParent(input.parentElement,[p]) 
    }
}

const validatePrice=(input)=>{
    const value=InputValue(input)
    if(value!=''&&value<=0){
        const p=createElement('p',[],'price should be greater than 0')
        appendToParent(document.querySelector('input[type="number"]').parentElement,[p])
    }
}


document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    validation()
    
})