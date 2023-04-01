//Retrive only one items data from URL using its id//
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

//Create function to populate the product page specific to its id//
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
        addTitle.textContent = item.name;
        const addPrice = document.querySelector("#price");
        addPrice.textContent = item.price;
        const addDescription = document.querySelector("#description");
        addDescription.textContent = item.description;

        const colorOption = document.querySelector("#colors");
        for (i in item.colors) {
            colorOption.innerHTML += `<option value="${item.colors[i]}">${item.colors[i]}</option>`
        }
        console.log(colorOption)
    })
}
//Call the function//
getArticle();