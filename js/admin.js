if (!document.cookie.includes("admin=1")) {
    let pass = prompt("Введіть пароль адміністратора:");
    if (pass === "admin123") {
        document.cookie = "admin=1";
    } else {
        alert("Доступ заборонено!");
        window.location = "index.html";
    }
}

function addToy() {
    let name = prompt("Назва:");
    let brand = prompt("Бренд:");
    let age = prompt("Вікова категорія:");
    let price = Number(prompt("Ціна:"));

    if (!name || !brand || !age || isNaN(price)) {
        alert("Некоректні дані!");
        return;
    }

    toyData.push({ id: toyData.length + 1, name, brand, age, price });
    alert("Товар додано!");
}
