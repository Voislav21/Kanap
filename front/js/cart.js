// Create function that will access all the data needed to populate the page //
const displayItems = async () => {
    
    // Get the cart items from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Accessing the section of the HTML we want to populate //
    const cartItems = document.querySelector("#cart__items");

    // Iriterate through each item and storing its information into new varibles //
    for (let i = 0; i < cart.length; i++) {
      const productID = cart[i].id;
      const productColor = cart[i].color;
      const productQuantity = cart[i].quantity;
    
      // Fetch the product details from the API based on product ID //
      const response = await fetch(`http://localhost:3000/api/products/${productID}`);
      const product = await response.json();
        
      //Imbedding all content into the cart page //
      cartItems.innerHTML += `<article class="cart__item" data-id="${productID}" data-color="${productColor}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${productColor}</p>
            <p>${product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Quantity : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
      </article>`;
  }
}

//Calling the function //
displayItems();
