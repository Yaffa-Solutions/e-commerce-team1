const products=[
    {
        id: 1, 
        name: "T-shirt",
        details: "Basic cotton t-shirt",
        price: 25,
        category: "Clothing",
        image: "https://images.pexels.com/photos/1861907/pexels-photo-1861907.jpeg"
    },
    {
        id: 2, 
        name: "Jacket",
        details: "Comfortable denim Jacket",
        price: 50,
        category: "Clothing",
        image: "https://images.pexels.com/photos/33071568/pexels-photo-33071568.jpeg"
    },
    {
        id: 3, 
        name: "Dabdoob",
        details: "Nice toy for kids",
        price: 75,
        category: "Toys",
        image: "https://images.pexels.com/photos/207891/pexels-photo-207891.jpeg"
    },
    {
        id: 4, 
        name: "Watch",
        details: "Elegant wristwatch",
        price: 150,
        category: "Accessories",
        image: "https://images.pexels.com/photos/33084197/pexels-photo-33084197.jpeg"
    },
    {
        id: 5, 
        name: "Microwave",
        details: "Good Machine for cooking",
        price: 60,
        category: "Electronics",
        image: "https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg"
    },
    {
        id: 6, 
        name: "Sunglasses",
        details: "UV protection sunglasses",
        price: 40,
        category: "Accessories",
        image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg"
    }
]
localStorage.setItem("products", JSON.stringify(products));
