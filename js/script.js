let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.addEventListener("DOMContentLoaded", () => {
    let storedToys = localStorage.getItem("toyData");
    if (storedToys) {
        toyData = JSON.parse(storedToys);
        renderToys(toys = toyData)
    } else {
        localStorage.setItem("toyData", JSON.stringify(toyData));
    }
});
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
            <button onclick="addToCart(${toy.id}, this)">
                <img src="images/cart_down.svg" alt="Cart Icon">
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

function addToCart(id, btn) {
    console.log("Кнопка:", btn);
    if (window.location.pathname.includes("product.html")) {
        window.location.href = `index.html`;
        return;
    }
    let toy = toyData.find(t => t.id === id);
    cart.push(toy);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (btn) {
        let img = btn.querySelector("img");
        if (img) {
            img.src = "images/cart_up.svg";
        }
        btn.classList.add('active');
    }
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

    const name = prompt("Ваше ім'я:");
    const address = prompt("Адреса доставки:");

    if (!name || !address) {
        alert("Дані не заповнені!");
        return;
    }

    let summary = `Замовлення оформлено!\nІм'я: ${name}\nАдреса: ${address}\n`;
    cart.forEach(item => summary += `\n- ${item.name} — ${item.price} грн`);
    summary += `\n\nЗагальна сума: ${cart.reduce((sum, item) => sum + item.price, 0)} грн`;

    alert(summary);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    closeCart();
}


function openProductPage(id) {
    window.location.href = `product.html?id=${id}`;
}

