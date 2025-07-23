let products = JSON.parse(localStorage.getItem("products")) || [];
let displayProdutcs = products;
const page = document.getElementById("app");
const categories = [
  "Select One",
  "Clothing",
  "Electronics",
  "Home Appliances",
  "Accessories",
  "Toys",
];
// Add Product
const productForm = (index) => {
  product = products[index] || {};
  const title = index == undefined ? "Add Product" : "Edit Product";
  page.innerHTML = "";
  const bigDiv = createElement("div", ["form-container"]);
  const header = createElement("h2", [], title);
  const form = createElement("form");
  let divName = createElement("div");
  const labelName = createElement("label", [], "ProductName");
  const inputName = createInput(
    "productname",
    ["inputs_style"],
    "text",
    product.name || ""
  );
  appendToParent(divName, [labelName, inputName]);

  let divDetail = createElement("div");
  const labelDetail = createElement("label", [], "ProductDetail");
  const inputDetail = createElement(
    "textarea",
    ["inputs_style"],
    product.details
  );
  inputDetail.name = "productdetail";
  appendToParent(divDetail, [labelDetail, inputDetail]);

  let divPrice = createElement("div");
  const labelPrice = createElement("label", [], "Price ($)");
  const inputPrice = createInput(
    "price",
    ["inputs_style"],
    "number",
    product.price
  );
  appendToParent(divPrice, [labelPrice, inputPrice]);

  let divImage = createElement("div");
  const labelImage = createElement("label", [], "Image URL");
  const inputImage = createInput(
    "image",
    ["inputs_style"],
    "text",
    product.image || ""
  );
  appendToParent(divImage, [labelImage, inputImage]);

  let divCategory = createElement("div");
  const labelCategory = createElement("label", [], "Category");
  const inputCategory = createSelect(
    categories,
    ["select-form"],
    product.category || ""
  );
  appendToParent(divCategory, [labelCategory, inputCategory]);

  const divButtons = createElement("div", ["button-group"]);
  const submitButton = createElement("button", [], title);
  const cancelButton = createElement("button", [], "Cancel");

  submitButton.type = "submit";
  cancelButton.type = "button";
  appendToParent(divButtons, [submitButton, cancelButton]);
  appendToParent(form, [
    divName,
    divDetail,
    divPrice,
    divImage,
    divCategory,
    divButtons,
  ]);
  appendToParent(bigDiv, [header, form]);
  appendToParent(page, [bigDiv]);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validation()) {
      if (index == undefined) {
        let newProduct = {
          name: inputName.value,
          details: inputDetail.value,
          price: parseFloat(inputPrice.value),
          image: inputImage.value,
          category: inputCategory.value,
        };

        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        ProductTablePage();
      } else {
        products[index] = {
          name: inputName.value,
          details: inputDetail.value,
          price: inputPrice.value,
          image: inputImage.value,
          category: inputCategory.value,
        };
        localStorage.setItem("products", JSON.stringify(products));
        ProductTablePage();
      }
    }
  });
  cancelButton.addEventListener("click", () => {
    ProductTablePage();
  });
};

const InputValue = (input) => {
  return input.value.trim();
};

const validation = () => {
  let isVaild = true;
  clearErrorMessages();
  Array.from(document.getElementsByClassName("inputs_style")).forEach(
    (input) => {
      if (!isInputEmpty(input)) {
        isVaild = false;
      }
      if (input.type == "number") {
        if (!validatePrice(input)) {
          isVaild = false;
        }
      }

      input.addEventListener("input", () => {
        const p = input.parentElement.querySelector("p");
        if (p) {
          p.remove();
        }
      });
    }
  );
  const selectCategory = document.querySelector("select");
  if (selectCategory.value == "Select One") {
    const p = createElement("p", [], "Select type of product.");
    appendToParent(selectCategory.parentElement, [p]);
    isVaild = false;
  }
  selectCategory.addEventListener("change", () => {
    const p = selectCategory.parentElement.querySelector("p");
    if (p) {
      p.remove();
    }
  });

  return isVaild;
};

const isInputEmpty = (input) => {
  const value = InputValue(input);
  if (value == "") {
    const p = createElement("p", [], `${input.name} is requried`);
    appendToParent(input.parentElement, [p]);
    return false;
  }
  return true;
};

const validatePrice = (input) => {
  const value = InputValue(input);
  if (value != "" && value <= 0) {
    const p = createElement("p", [], "price should be greater than 0");
    appendToParent(
      document.querySelector('input[type="number"]').parentElement,
      [p]
    );
    return false;
  }
  return true;
};

const clearErrorMessages = () => {
  document.querySelectorAll("p").forEach((p) => {
    p.remove();
  });
};

// #2
const ProductTablePage = () => {
  page.innerHTML = "";

  const container = createElement("div", ["product-table-container"]);
  const header = createElement("h2", [], "Product List");
  const div = createElement("div", ["filter-div"]);
  const searchBar = createSearchBar();
  const selectCategory = createSelect(categories);

  appendToParent(div, [searchBar, selectCategory]);

  const addBtn = createElement(
    "button",
    ["add-product-btn"],
    "Add New Product"
  );

  addBtn.addEventListener("click", () => productForm());

  const table = createTable(products);

  table.querySelectorAll(".edit-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => productForm(index));
  });

  table.querySelectorAll(".delete-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      updateProductTable(products);
    });
  });

  selectCategory.addEventListener("change", () => {
    applyFilters();
  });
  appendToParent(container, [header, addBtn, div, table]);
  appendToParent(page, [container]);
};

const createSearchBar = () => {
  const input = createInput("search", [], "text", "");
  input.id = "searchBar";
  input.placeholder = "Search products...";

  input.addEventListener("input", () => {
    applyFilters();
  });

  return input;
};


const applyFilters = () => {
  let result = products;

  const categoryValue = document.querySelector("select").value;
  const searchValue = document.getElementById("searchBar").value.toLowerCase();

  if( categoryValue !== "Select One" && searchValue == "") {
    result = products.filter((p) => p.category.toLowerCase().includes(categoryValue.toLowerCase()));
  }
  else if (categoryValue !== "Select One" && searchValue!=="") {
    result = result.filter((p) => p.category.includes(categoryValue)).filter(
      (p) => p.name.toLowerCase().includes(searchValue)
    );
  }

  if (searchValue !== "") {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(searchValue) 
    );
  }

  displayedProducts = result;
  updateProductTable(displayedProducts);
};


const updateProductTable = (filteredProducts) => {
  const oldTable = document.querySelector(".product-table-container table");
  if (oldTable) oldTable.remove();

  const newTable = createTable(filteredProducts);

  newTable.querySelectorAll(".edit-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const realIndex = products.findIndex(
        (p) => p.name === filteredProducts[index].name
      );
      productForm(realIndex);
    });
  });

  newTable.querySelectorAll(".delete-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const realIndex = products.findIndex(
        (p) => p.name === filteredProducts[index].name
      );
      products.splice(realIndex, 1);
      localStorage.setItem("products", JSON.stringify(products));
      ProductTablePage();
    });
  });

  document.querySelector(".product-table-container").appendChild(newTable);
};



