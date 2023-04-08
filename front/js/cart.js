// Create function that will access all the data needed to populate the page //
const displayItems = async () => {
    
    // Get the cart items from local storage //
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Accessing the section of the HTML we want to populate //
    const cartItems = document.querySelector("#cart__items");

    // Initialize totalPrice and totalQuantity to 0 //
    let totalPrice = 0;
    let totalQuantity = 0;

    // Iriterate through each item and storing its information into new varibles //
    for (let i = 0; i < cart.length; i++) {
      const productID = cart[i].id;
      const productColor = cart[i].color;
      const productQuantity = cart[i].quantity;
    
      // Fetch the product details from the API based on product ID //
      const response = await fetch(`http://localhost:3000/api/products/${productID}`);
      const product = await response.json();

      totalPrice += product.price * productQuantity;
      totalQuantity += parseInt(productQuantity);
        
      // Imbedding all content into the cart page //
      cartItems.innerHTML += `<article class="cart__item" data-id="${productID}" data-color="${productColor}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
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

      const itemQuantity = document.querySelectorAll(".itemQuantity");
      itemQuantity.forEach((item) => {
        item.addEventListener("change", (event) => {
          const updateQuantity = event.target.value;
          const cartItems = JSON.parse(localStorage.getItem("cart")) || []

          // Loop through cart items and update quantity of matching item //
          for (let i=0; i<cart.length;i++) {
            const cartItem = cartItems[i];
            if (cartItem.id === event.target.closest(".cart__item").dataset.id && 
                cartItem.color === event.target.closest(".cart__item").dataset.color) {
                
                // Checking if the user puts a correct value, if not an alert message and the original value is displayed again //
                if (updateQuantity > 100 || updateQuantity <= 0) {
                  alert("No way josé");
                  event.target.value = cartItem.quantity;
                  return;
                }
                cartItem.quantity = updateQuantity;
                break;
              }
            }
        
          // Save updated cart to local storage //
          localStorage.setItem("cart", JSON.stringify(cartItems));
        });
      });
  }

  // Imbedding totalPrice and totalQuantity //
  const totalQuantityElement = document.querySelector("#totalQuantity");
  totalQuantityElement.textContent = totalQuantity;
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.textContent = totalPrice;
};

//Calling the function //
displayItems();