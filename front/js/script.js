//Retrive data from API//
const response = await fetch('http://localhost:3000/api/products/');
const items = await response.json();

console.log(items);

//Create function that will sort through the data to populate the cards//
const getArticles = () => {
    for (let i=0; i<items.length;i++) {
        const cards = document.querySelector("#items");
        cards.innerHTML += `<a href="./product.html?id=${items[i]._id}">
        <article>
          <img src="${items[i].imageUrl}" alt="${items[i].altTxt}">
          <h3 class="productName">${items[i].name}</h3>
          <p class="productDescription">${items[i].description}</p>
        </article>
        </a>`
    }
}
//Call the function//
getArticles();