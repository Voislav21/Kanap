// An updateTotals function for when the user changes the quantity of a product //
const updateTotals = async () => {

  // Get cart items from local storage //
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Accessing totalPrice and totalQuantity //
  const totalPriceElement = document.querySelector("#totalPrice");
  const totalQuantityElement = document.querySelector("#totalQuantity");

  // Checking if the cart array is empty //
  if (cart.length === 0){
    totalQuantityElement.textContent = "0";
    totalPriceElement.textContent = "0";
  }

  // Initialize totalPrice and totalQuantity to 0 //
  let totalPrice = 0;
  let totalQuantity = 0;

  // Loop through items and store values in new variables //
  for (let i = 0; i < cart.length; i++) {
    const productId = cart[i].id;
    const productQuantity = cart[i].quantity;

    // Fetch product details from API based on unique product ID //
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await response.json();

    // Math to calculate totalPrice and totalQuantity //
    totalPrice += product.price * productQuantity;
    totalQuantity += parseInt(productQuantity);

    // Display totalPrice and totalQuantity to the DOM //
    totalPriceElement.textContent = totalPrice;
    totalQuantityElement.textContent = totalQuantity;
  }
};

// Create function that will access all the data needed to populate the page //
const displayItems = async () => {
    
    // Get the cart items from local storage //
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Accessing the section of the HTML we want to populate //
    const cartItems = document.querySelector("#cart__items");
    
    // Iriterate through each item and storing its information into new varibles //
    for (let i = 0; i < cart.length; i++) {
      const productId = cart[i].id;
      const productColor = cart[i].color;
      const productQuantity = cart[i].quantity;
    
      // Fetch the product details from the API based on unique product ID //
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      const product = await response.json();
        
      // Imbedding all content into the cart page //
      cartItems.innerHTML += `<article class="cart__item" data-id="${productId}" data-color="${productColor}">
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

      // Add event listener for each products itemQuantity to be modified //
      const itemQuantity = document.querySelectorAll(".itemQuantity");
      itemQuantity.forEach((item) => {
        item.addEventListener("change", (event) => {
          const updateQuantity = event.target.value;
          const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

          // Loop through cart items and update quantity of matching item //
          for (let i=0; i<cart.length;i++) {
            const cartItem = cartItems[i];
            if (cartItem.id === event.target.closest(".cart__item").dataset.id && 
                cartItem.color === event.target.closest(".cart__item").dataset.color) {
                
                // Checking if the user puts a correct value, if not an alert message and the original value is displayed again //
                if (updateQuantity > 100 || updateQuantity <= 0) {
                  alert("Please select a positive number between 1-100!");
                  event.target.value = cartItem.quantity;
                  return;
                }
                cartItem.quantity = updateQuantity;
                alert(`Updated quantity to ${updateQuantity}`)
                break;
              }
            }
        
          // Save updated cart to local storage //
          localStorage.setItem("cart", JSON.stringify(cartItems));

          // Call our function to display new updated totals to the DOM //
          updateTotals();
        });
      });

      // Add an event listener to each products delete button //
      const deleteBtn = document.querySelectorAll(".cart__item__content__settings__delete");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const cartItem = event.target.closest(".cart__item");
          const itemId = cartItem.dataset.id;
          const itemColor = cartItem.dataset.color

          // Access the cart from local Storage //
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Filter through the cart to target and only keep stored what doesnt match with our click //
          const UpdatedCart = cart.filter(item => !(item.id === itemId && item.color === itemColor));

          // Update the cart on local storage //
          localStorage.setItem("cart", JSON.stringify(UpdatedCart));

          // Remove the product from the DOM //
          cartItem.remove();
          alert(`You have removed ${product.name} from your cart!`);

          // Call our updateTotals function //
          updateTotals();
        });
      });
    }

    // Call our updateTotals function //
    updateTotals();
};


// Access the form and add an event listener tp the orderBtn //
const submitFrom = document.querySelector(".cart__order__form");
submitFrom.addEventListener("submit", (event) => {
  event.preventDefault();

  // Access the form questions and check if the values entered are valid for each field //
  const inputElements = document.querySelectorAll(".cart__order__form__question input");
  let isValid = true;
  inputElements.forEach((input) => {
      const inputValue = input.value;
      const inputName = input.name;
      const inputError = document.getElementById(`${inputName}ErrorMsg`);
      const invalid = () => {
        input.style.border = "solid red 2px";
      } 
      

      // Validation logic here //

      // Switch between inputName //
      switch (inputName) {
        case "firstName":

          // Test the inputValue against regular expression //
          const nameRegex = /^[A-Za-z]+$/;
          if (!nameRegex.test(inputValue)) {

            // Apply invalid styles //
            invalid();
            inputError.textContent = "Please enter a valid first name";
            isValid = false;
          }
          break;

        // Validation for last name //
        case "lastName":
          const lastNameRegex = /^[A-Za-z]+$/;
          if (!lastNameRegex.test(inputValue)) {
            invalid();
            inputError.textContent = "Please enter a valid last name";
            isValid = false;
          }
          break;

        // Validation for address //
        case "address":
          const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
          if(!addressRegex.test(inputValue)){
            invalid();
            inputError.textContent = "Please enter a valid address";
            isValid = false;
          }
          break;

        // Validation for city //
        case "city":
          const cityRegex = /^[a-zA-Z\s]+$/;
          if(!cityRegex.test(inputValue)){
            invalid();
            inputError.textContent = "Please enter a valid address";
            isValid = false;
          }
          break;

        // Validation for email //
        case "email":
          const emailRegex = /^\S+@\S+\.\S+$/;
          if(!emailRegex.test(inputValue)){
            invalid();
            inputError.textContent = "Please enter a valid address";
            isValid = false;
          }
          break;
      }
    });

    // if all values enetered return true //
  if(isValid){
    const form = document.querySelector(".cart__order__form");

    // Create a formData //
    const formData = new FormData(form);

    // Extract the values //
    const contact = Object.fromEntries(formData);

    // Get cart items from local storage //
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get only the id's //
    let products = cart.map(product => product.id)

    // Store all data in new varible //
    const sendFormData = {
      contact,
      products,
    }

    // Make a POST request
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(res =>{
      return res.json();
    })
    .then(data =>{
      // Store the response in a new varible to be sent to a unique confirmation page //
      const orderId = data.orderId;
      window.location.href = `confirmation.html?id=${orderId}`;
    })
  }
  
});

// Calling the function //
displayItems();


