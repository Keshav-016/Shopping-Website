import { elementCreator } from "../helper/elementCreator.js";

const cartData = document.getElementById("cartContainer");
const counter = document.getElementsByClassName('counter');
const countDisplay = document.getElementsByClassName('display');
const price = document.getElementsByClassName('price');
const totalPrice = document.getElementById('totalCost');
const totalItem = document.getElementById('totalItem');
const addToCart = document.getElementsByClassName('addToCart');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

currentUser.cartItems.length === 0 ? cartData.innerText = "You have nothig to buy in your cart ; )"
    : elementCreator(currentUser.cartItems, cartData, "all", "cart");

let total = currentUser.cartItems.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0);

for (let i = 0; i < currentUser.cartItems.length; i++) {
    countDisplay[i].innerText = currentUser.cartItems[i].qty;
    counter[i].style.display = "block";
    addToCart[i].style.display = "none";
    price[i].innerText = `$ ${currentUser.cartItems[i].price * currentUser.cartItems[i].qty}`;
};

totalPrice.innerHTML = `Total cost : $ ${total}`;
totalItem.innerHTML = `Total Items : ${currentUser.cartItems.length}`;







