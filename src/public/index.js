const socketClient = io();

const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const products = document.getElementById("products");


form.onsubmit = (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    socketClient.emit("newProd", { name, price });
}

socketClient.on("prodArray", (arr) =>{
    let infoProds = "";
    arr.map((p) => {
        infoProds += `${p.name} - ${p.price} <br>`;
    });
    products.innerHTML = infoProds;
});


