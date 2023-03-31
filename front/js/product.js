//Retrive data from API//
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

const getArticle  = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => {
        return res.json();
    })
    .then(item => {
        console.log(item);
        const addImg = document.querySelector(".item__img");
        addImg.innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
        const addTitle = document.querySelector("#title");
        addTitle.innerHTML = item.name;
        const addPrice = document.querySelector("#price");
        addPrice.innerHTML = item.price;
        const addDescription = document.querySelector("#description");
        addDescription.innerHTML = item.description;
    })
}

getArticle();