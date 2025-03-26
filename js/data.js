let toyData = [
    { id: 1, name: "М'яка іграшка ведмедик", brand: "Teddy", age: "0-3", price: 200, image: "images/teddy.jpeg" }
];
let storedToys = localStorage.getItem("toyData");
if (storedToys) {
    toyData = JSON.parse(storedToys);
} else {
    localStorage.setItem("toyData", JSON.stringify(toyData));
}