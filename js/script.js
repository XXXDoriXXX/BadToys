let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderToys(toys = toyData) {
    let toyList = document.getElementById("toyList");
    toyList.innerHTML = "";
    toys.forEach(toy => {
        let div = document.createElement("div");
        div.className = "toy";
        div.innerHTML = `
            <img src="${toy.image}" alt="${toy.name}" onclick="openProductPage(${toy.id})">
            <h3 onclick="openProductPage(${toy.id})">${toy.name}</h3>
            <p>Бренд: ${toy.brand}</p>
            <p>Вік: ${toy.age}</p>
            <p class="price">Ціна: ${toy.price} грн</p>
            <button onclick="addToCart(${toy.id})">
                <img src="images/cart-arrow.svg" alt="Cart Icon">
            </button>
        `;
        toyList.appendChild(div);
    });
}

function filterToys() {
    let age = document.getElementById("ageFilter").value;
    let search = document.getElementById("search").value.toLowerCase();
    let filtered = toyData.filter(toy =>
        (age === "all" || toy.age === age) &&
        (toy.name.toLowerCase().includes(search) || toy.brand.toLowerCase().includes(search))
    );
    renderToys(filtered);
}

function addToCart(id) {
    if (window.location.pathname.includes("product.html")) {
        console.log("Виклик з product.html");
        window.location.href = `index.html`;
    }
    let toy = toyData.find(t => t.id === id);
    cart.push(toy);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар додано!");
}

function viewCart() {
    let modal = document.getElementById("cartModal");
    modal.style.display = "flex";
    modal.classList.remove("close-animation");
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((toy, index) => {
        total += toy.price;
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${toy.image}" alt="${toy.name}">
            <div>
                <p>${toy.name} - ${toy.price} грн</p>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    document.getElementById("totalPrice").textContent = total;
}

function closeCart() {
    let modal = document.getElementById("cartModal");
    modal.classList.add("close-animation");
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    viewCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }
    alert("Замовлення оформлено!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    closeCart();
}

renderToys();


function openProductPage(id) {
    window.location.href = `product.html?id=${id}`;
}
function closeAddCart(){
    let modal = document.getElementById("addModal");
    modal.classList.add("close-animation");
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);
}
function openAddCart(){
    let modal = document.getElementById("addModal");
    modal.style.display = "flex";
    madal.style.opacity = 1;
    modal.classList.remove("close-animation");
}