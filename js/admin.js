let selectedImage = "";
let editToyId = null;

if (!document.cookie.includes("admin=1")) {
    window.location = "login.html";
}


document.addEventListener("DOMContentLoaded", () => {
    let storedToys = localStorage.getItem("toyData");
    if (storedToys) {
        toyData = JSON.parse(storedToys);
    } else {
        localStorage.setItem("toyData", JSON.stringify(toyData));
    }
    renderToysAdmin();

    document.getElementById("addToyForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const name = this.elements["name"].value.trim();
        const brand = this.elements["brand"].value.trim();
        const age = this.elements["age"].value.trim();
        const price = Number(this.elements["price"].value.trim());

        if (!name || !brand || !age || isNaN(price)) {
            alert("Некоректні дані!");
            return;
        }

        if (editToyId !== null) {

            const toy = toyData.find(t => t.id === editToyId);
            toy.name = name;
            toy.brand = brand;
            toy.age = age;
            toy.price = price;
            toy.image = selectedImage || toy.image;
            alert("Товар оновлено!");
        } else {
            const newToy = {
                id: Date.now(),
                name,
                brand,
                age,
                price,
                image: selectedImage || "images/default.jpeg"
            };
            toyData.push(newToy);
            alert("Товар додано!");
        }

        localStorage.setItem("toyData", JSON.stringify(toyData));
        renderToysAdmin();
        closeAddModal();
    });


});

function renderToysAdmin(toys = toyData) {
    let toyList = document.getElementById("toyList");
    toyList.innerHTML = `
    <div class="addToy">
      <button onclick="openAddModal()">+</button>
    </div>
  `;
    toys.forEach(toy => {
        let div = document.createElement("div");
        div.className = "toy";
        div.innerHTML = `
      <img src="${toy.image}" alt="${toy.name}" onclick="openEditModal(${toy.id})">
      <h3>${toy.name}</h3>
      <p>Бренд: ${toy.brand}</p>
      <p>Вік: ${toy.age}</p>
      <p class="price">Ціна: ${toy.price} грн</p>
      <button onclick="deleteToy(${toy.id})">
        <img src="images/delete.svg" alt="Видалити">
      </button>
    `;
        toyList.appendChild(div);
    });
}

function deleteToy(id) {
    if (confirm("Видалити товар?")) {
        toyData = toyData.filter(t => t.id !== id);
        localStorage.setItem("toyData", JSON.stringify(toyData));
        renderToysAdmin();
    }
}
function openAddModal() {
    const modal = document.getElementById("addModal");
    modal.classList.remove("modal-close");
    modal.style.display = "flex";
}

function closeAddModal() {
    const modal = document.getElementById("addModal");
    modal.classList.add("modal-close");
    setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("addToyForm").reset();
        document.getElementById("addToyImage").src = "images/default.jpeg";
        selectedImage = "";
        editToyId = null;
        document.querySelector("#addToyForm button[type='submit']").textContent = "Додати товар";
    }, 400);
}


function filterToysAdmin() {
    let search = document.getElementById("search").value.toLowerCase();
    let filtered = toyData.filter(toy =>
        toy.name.toLowerCase().includes(search) ||
        toy.brand.toLowerCase().includes(search)
    );
    renderToysAdmin(filtered);
}

document.getElementById("imageInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        resizeImage(event.target.result, 300, 300, (resized) => {
            selectedImage = resized;
            document.getElementById("addToyImage").src = resized;
        });
    };
    reader.readAsDataURL(file);
});
function resizeImage(dataUrl, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let w = img.width;
        let h = img.height;

        if (w > h) {
            if (w > maxWidth) {
                h *= maxWidth / w;
                w = maxWidth;
            }
        } else {
            if (h > maxHeight) {
                w *= maxHeight / h;
                h = maxHeight;
            }
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL("image/jpeg"));
    };
    img.src = dataUrl;
}

function openEditModal(id) {
    const toy = toyData.find(t => t.id === id);
    editToyId = id;

    const form = document.getElementById("addToyForm");
    form.elements["name"].value = toy.name;
    form.elements["brand"].value = toy.brand;
    form.elements["age"].value = toy.age;
    form.elements["price"].value = toy.price;
    document.getElementById("addToyImage").src = toy.image;
    selectedImage = toy.image;

    document.querySelector("#addToyForm button[type='submit']").textContent = "Зберегти зміни";
    openAddModal();
}
