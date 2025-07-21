let page=document.getElementById('app')
function AddProductPage(){
    let bigDiv=createElement('div',['form-container'])
    let header=createElement('h2',[],'Add Product')
    let form=createElement('form')
    let labelName=createElement('label',[],'ProductName')
    let inputName=createInput('productname','text')

    let labelDetail=createElement('label',[],'ProductDetail')
    let inputDetail=createElement('textarea')

    let labelPrice=createElement('label',[],'Price ($)')
    let inputPrice=createInput('price','number')

    let labelImage=createElement('label',[],'Image URL')
    let inputImage=createInput('image','text')

    let labelCategory=createElement('label',[],'Category')
    let categories=['-- Select Category --','Clothing','Electronics','Home Appliances','Accessories','Toys']
    let inputCategory=createSelect(categories)

    let divButtons=createElement('div',['button-group'])
    let submitButton=createElement('button',[], 'Add Product')
    let cancelButton=createElement('button',[], 'Cancel')

    submitButton.type='submit'
    cancelButton.type='button'
    appendToParent(divButtons,[submitButton,cancelButton])
    appendToParent(form,[labelName,inputName,labelDetail,inputDetail,labelPrice,inputPrice,labelImage,inputImage,labelCategory,inputCategory, divButtons])
    appendToParent(bigDiv,[header,form])
    appendToParent(page,[bigDiv])
}

AddProductPage()