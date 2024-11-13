const prodList = document.getElementById("prod-list");
const productsArray = [];

const showProds = (arr) => {
  if (productsArray.length > 1) {
    console.log(arr);
    let infoProds = "";
    arr.map((p) => {
      infoProds += `<li>${p.name} - ${p.price}</li>`;
      console.log(infoProds);
    });
    console.log(arr);
    prodList.innerHTML = infoProds;
  } else {
    prodList.innerHTML = `<li>No products added yet.</li>`;
  }
};
showProds(productsArray);
