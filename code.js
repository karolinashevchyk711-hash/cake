// КОШИК
let cart = []; let total = 0;
const cartButton = document.querySelector(".cart-btn"); const cartModal = document.querySelector(".cart-modal"); const cartItems = document.getElementById("cart-items"); const totalPrice = document.getElementById("total-price"); const cartCount = document.getElementById("cart-count");
// ВІДКРИТИ / ЗАКРИТИ КОШИК
cartButton.addEventListener("click", () => {
if (cartModal.style.display === "block") {
    cartModal.style.display = "none";
} else {
    cartModal.style.display = "block";
}
});
// ДОДАВАННЯ В КОШИК
const addButtons = document.querySelectorAll(".add-cart");
addButtons.forEach(button => {
button.addEventListener("click", () => {

    const card = button.closest(".product-card");

    const productName =
        card.querySelector("h3").textContent;

    const productPrice =
        parseInt(
            card.querySelector(".price")
            .textContent
        );

    cart.push({
        name: productName,
        price: productPrice
    });

    total += productPrice;

    updateCart();

    showNotification(
        productName + " додано в кошик 🛒"
    );

});
});
// ОНОВЛЕННЯ КОШИКА
function updateCart() {
cartItems.innerHTML = "";

cart.forEach((item, index) => {

    const div =
        document.createElement("div");

    div.innerHTML = `
        <p>
        ${item.name}
        - ${item.price} грн
        <button onclick="removeItem(${index})">
        ❌
        </button>
        </p>
    `;

    cartItems.appendChild(div);

});

cartCount.textContent = cart.length;

totalPrice.textContent =
    "Загалом: " + total + " грн";
}
// ВИДАЛЕННЯ ТОВАРУ
function removeItem(index) {
total -= cart[index].price;

cart.splice(index, 1);

updateCart();
}
// ПОШУК
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
const value =
    searchInput.value.toLowerCase();

const cards =
    document.querySelectorAll(
        ".product-card"
    );

cards.forEach(card => {

    const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

    if (title.includes(value)) {

        card.style.display = "block";

    } else {

        card.style.display = "none";

    }

});
});
// КНОПКА ДЕТАЛЬНІШЕ
const detailButtons = document.querySelectorAll(".details-btn");
detailButtons.forEach(button => {
button.addEventListener("click", () => {

    const card =
        button.closest(".product-card");

    const title =
        card.querySelector("h3")
        .textContent;

    const price =
        card.querySelector(".price")
        .textContent;

    alert(
        title +
        "\n\nЦіна: " +
        price +
        "\n\nСмачний авторський торт 🍰"
    );

});
});
// ФОРМА КОНТАКТІВ
const form = document.getElementById( "contactForm" );
form.addEventListener( "submit", function(e){
    e.preventDefault();

    showNotification(
        "Повідомлення успішно надіслано ❤️"
    );

    form.reset();

}
);
// ПОВІДОМЛЕННЯ
function showNotification(text){
const notification =
    document.createElement("div");

notification.classList.add(
    "notification"
);

notification.textContent = text;

document.body.appendChild(
    notification
);

notification.style.position =
    "fixed";

notification.style.bottom =
    "20px";

notification.style.right =
    "20px";

notification.style.background =
    "#ff5ba7";

notification.style.color =
    "white";

notification.style.padding =
    "15px 25px";

notification.style.borderRadius =
    "12px";

notification.style.zIndex =
    "9999";

setTimeout(() => {

    notification.remove();

}, 3000);
}
// КНОПКА ГОЛОВНА
const heroButton = document.querySelector(".shop-btn");
heroButton.addEventListener("click", () => {
document
.getElementById("catalog")
.scrollIntoView({
    behavior:"smooth"
});
});
// ПЛАВНА ПРОКРУТКА
document .querySelectorAll("nav a") .forEach(link => {
link.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
                );

        target.scrollIntoView({
            behavior:"smooth"
        });

    }
);
});
// АНІМАЦІЯ КАРТОК
const cards = document.querySelectorAll( ".product-card" );
cards.forEach(card => {
card.addEventListener(
    "mouseenter",
    () => {

        card.style.transform =
        "scale(1.03)";

    }
);

card.addEventListener(
    "mouseleave",
    () => {

        card.style.transform =
        "scale(1)";

    }
);
});
// ЗБЕРЕЖЕННЯ КОШИКА
window.addEventListener( "beforeunload", () => {
    localStorage.setItem(
        "sweetLifeCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "sweetLifeTotal",
        total
    );

}
);
// ЗАВАНТАЖЕННЯ КОШИКА
window.addEventListener( "load", () => {
    const savedCart =
        localStorage.getItem(
            "sweetLifeCart"
        );

    const savedTotal =
        localStorage.getItem(
            "sweetLifeTotal"
        );

    if(savedCart){

        cart =
        JSON.parse(savedCart);

    }

    if(savedTotal){

        total =
        Number(savedTotal);

    }

    updateCart();

}
);
console.log( "Sweet Life успішно запущено 🍰" );