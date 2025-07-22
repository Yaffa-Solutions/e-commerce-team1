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
}

productForm()