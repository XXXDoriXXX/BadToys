const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
console.log("Product ID:", productId);

const product = toyData.find(t => t.id === productId);
console.log("Found product:", product);
console.log("Toy Data:", toyData);

if (product) {
    document.getElementById("productDetails").innerHTML = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p><strong>Бренд:</strong> ${product.brand}</p>
            <p><strong>Вікова категорія:</strong> ${product.age}</p>
            <p class="price">Ціна: ${product.price} грн</p>
            <button onclick="addToCart(${product.id},this)">Додати в корзину</button>
        </div>
    `;
} else {
    document.getElementById("productDetails").innerHTML = "<p>Товар не знайдено!</p>";
}
