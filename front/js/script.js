const url = "http://localhost:3000/api/products/";
const cards = document.querySelector("#items");

const getArticles = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        for(product in data){
            cards.innerHTML += `<a href="./product.html?id=42">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>`
        }
    })
}

getArticles();