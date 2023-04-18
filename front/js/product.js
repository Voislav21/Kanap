//Retrive only one items data from URL using its id//
const id = new URLSearchParams(window.location.search).get("id");

//Create function to populate the product page specific to its id//
const getArticle  = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => {
        return res.json();
    })
    // Immbed the product //
    .then(item => {
        const addImg = document.querySelector(".item__img");
        addImg.innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
        const addTitle = document.querySelector("#title");
        addTitle.textContent = item.name;
        const addPrice = document.querySelector("#price");
        addPrice.textContent = item.price;
        const addDescription = document.querySelector("#description");
        addDescription.textContent = item.description;

        // Retriving the colors //
        const colorOption = document.querySelector("#colors");
        for (i in item.colors) {
            colorOption.innerHTML += `<option value="${item.colors[i]}">${item.colors[i]}</option>`
        }
    })
    // Catch errors //
    .catch(error => {
        console.error(error);
        alert("There was an unexpected error. Please try again later");
    });
}


const addToCart = document.querySelector("#addToCart");
addToCart.addEventListener('click', () => {
    const colorSelect = document.querySelector("#colors").value;
    const quantitySelect = document.querySelector("#quantity").value;
    const productName = document.querySelector("#title").textContent;

    //if the color or the quantity is not selected display an error message and prevent the code from executing//
    if(colorSelect === '' || quantitySelect === '' || !Number.isInteger(Number(quantitySelect)) || parseInt(quantitySelect) <= 0 || parseInt(quantitySelect) > 100) {
        alert ("Please select a color and a positive number between 1-100!");
        document.querySelector("#quantity").value = 0;
        return;
    }

    //Information to be pushed to cart//
    const addProduct = {
        id: id,
        color: colorSelect,
        quantity: quantitySelect
    }

    //Get the current cart items or create an empty array//
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    //Find existing product with the same id and color//
    const existingProduct = cart.find(item => item.id === addProduct.id && item.color === addProduct.color);

    if (existingProduct) {

        // Save the original quantity value
        const originalQuantity = existingProduct.quantity;

        //if existing product is found, update its quantity//
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(addProduct.quantity);
        if(existingProduct.quantity > 100) {
            alert(`You can not order more than 100 of the same product. You currently have: ${existingProduct.quantity}`);
            
            // Reset the input value to the original quantity value
            const quantityInput = document.querySelector("#quantity");
            quantityInput.value = originalQuantity;
            return;
        }
        alert(`Added ${quantitySelect} of ${productName} ${colorSelect} to your cart!`);
    } else {

        //if no existing product add product to cart//
        alert(`Added ${quantitySelect} of ${productName} ${colorSelect} to your cart!`);
        cart.push(addProduct);
    }

    //store array into local storage//
    localStorage.setItem("cart", JSON.stringify(cart));
});


//Call the function//
getArticle();