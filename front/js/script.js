//Create function that will sort through the data to populate the cards//
async function getArticles () {
    await fetch("http://localhost:3000/api/products")
    .then(data => {
        return data.json();
    })
    .then(items => {
        const cards = document.querySelector("#items");
        for(items of items) {
            cards.innerHTML += `<a href="./product.html?id=${items._id}">
            <article>
              <img src="${items.imageUrl}" alt="${items.altTxt}">
              <h3 class="productName">${items.name}</h3>
              <p class="productDescription">${items.description}</p>
            </article>
            </a>`
        }
    })
    // Catch errors //
    .catch(error => {
        console.error(error);
        alert("There was an unexpected error. Please try again later");
    });
}
//Call the function//
getArticles();