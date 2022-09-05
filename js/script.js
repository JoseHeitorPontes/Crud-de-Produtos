import {v4 as uuid} from 'https://jspm.dev/uuid';
function removeProduct(id){
    const products = JSON.parse(localStorage.getItem("products"));
    const newProducts = products.filter((product)=>{
        return product.id !== id;
    });
    localStorage.setItem("products", JSON.stringify(newProducts));
    renderProducts();
    return JSON.parse(localStorage.getItem("products")) || [];
}
function openModalProduct(id){
    const containerModal = document.getElementById("container-modal");
    if(containerModal.classList.contains("hide")){
        containerModal.classList.remove("hide");
        containerModal.classList.add("show");
    }
    else{
        containerModal.classList.remove("show");
        containerModal.classList.add("hide");
    }
    const inputId = document.getElementById("product-id");
    inputId.value = id;
    const productId = document.getElementById("product-id").value;
    fetchProduct(productId);
}
function fetchProduct(id){
    const products = JSON.parse(localStorage.getItem("products"));
    const product = products.find((product)=>{
        return product.id == id;
    });
    document.getElementById("name-edit").value = product.name;
    document.getElementById("price-edit").value = product.price;
    document.getElementById("description-edit").value = product.description;
}
function closeModalProduct(){
    const containerModal = document.getElementById("container-modal");
    containerModal.classList.remove("show");
    containerModal.classList.add("hide");
}
document.getElementById("modal-close").addEventListener("click", closeModalProduct);
document.getElementById("form-products-update").addEventListener("submit", (event)=>{
    event.preventDefault();
    const id = document.getElementById("product-id").value;
    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];
    const product = products.find((product)=>{
        return product.id == id;
    });
    const name = document.getElementById("name-edit").value;
    const price = document.getElementById("price-edit").value;
    const description = document.getElementById("description-edit").value;
    const newProduct = {
        id: product.id,
        name: name,
        price: price,
        description: description,
    };
    const newProducts = removeProduct(id);
    localStorage.setItem("products", JSON.stringify([...newProducts, newProduct]));
    renderProducts();
});
function renderProducts(){
    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];
    const tableBody = document.getElementById("body-table");
    tableBody.innerHTML = "";
    products.forEach(product=>{
        let tr = document.createElement("tr");
        tr.setAttribute("title",product.name);
        tr.innerHTML = `
            <td class="table-row">${product.name}</td>
            <td class="table-row">${product.price}</td>
            <td class="table-row">${product.description}</td>
            <td class="table-row">
                <button class="button-red" data-id="${product.id}">Deletar</button>
                <button class="button-green" data-id="${product.id}">Editar</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
    const buttonsRed = document.querySelectorAll(".button-red");
        buttonsRed.forEach((button)=>{
            button.addEventListener("click", (event)=>{
                const id = event.target.dataset.id;
                removeProduct(id);
        });
    });
    const buttonsGreen = document.querySelectorAll(".button-green");
        buttonsGreen.forEach((button)=>{
            button.addEventListener("click", (event)=>{
                const id = event.target.dataset.id;
                openModalProduct(id);
        });
    });
}
document.addEventListener("DOMContentLoaded", renderProducts);
document.getElementById("form-products").addEventListener("submit", (event)=>{
    event.preventDefault();
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const product = {
        id: uuid(),
        name: name.value,
        price: price.value,
        description: description.value, 
    };
    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];
    localStorage.setItem("products", JSON.stringify([...products, product]));
    name.value = price.value = description.value = "";
    renderProducts();
    document.getElementById("table-container").scrollIntoView({"behavior": "smooth"});
});
document.getElementById("button-lightmode").addEventListener("click", ()=>{
    if(localStorage.getItem("mode") == "light"){
        localStorage.setItem("mode","dark");
        changeTheme();
    }
    else{
        localStorage.setItem("mode","light");
        changeTheme();
    }
});
function changeTheme(){
    if(localStorage.getItem("mode")){
        const root = document.querySelector(":root");
        if(localStorage.getItem("mode") == "light"){
            root.style.setProperty("--background-theme", "#333");
            root.style.setProperty("--font-color", "#fff");
            root.style.setProperty("--border", "#fff 1px solid");
        }
        else{
            root.style.setProperty("--background-theme", "#fff");
            root.style.setProperty("--font-color", "#333");
            root.style.setProperty("--border", "#333 1px solid");
        }
    }
}
changeTheme();