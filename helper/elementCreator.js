import { addToCart, addItem, removeItem } from '../helper/helper.js';
export function elementCreator(data, container, category, renderingPage, itemCount) {
    if (category === "all") {
        data.forEach((item) => {
            filteredProducts(item, container, itemCount, renderingPage)
        });
    }
    else if (category === "men" || category === "women" || category === "electronics") {
        data.forEach((item) => {
            if (item.category === category) {
                filteredProducts(item, container, itemCount, renderingPage)
            }
        });
    }
    else {
        data.forEach((item) => {
            const name = item.title.toLowerCase()
            if (name.includes(category)) {
                filteredProducts(item, container, itemCount, renderingPage)
            }
        });
    }
}

function filteredProducts(item, container, itemCount, renderingPage) {
    const obj = JSON.parse(localStorage.getItem('currentUser') || -1);

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data-card', item.id);

    const image = document.createElement('img');
    image.setAttribute("src", item.image);
    image.setAttribute("alt", "product Image");
    image.setAttribute("class" , "productImage")
    card.appendChild(image);

    const name = document.createElement('h3');
    name.innerText = item.title;
    card.appendChild(name);

    const price = document.createElement('h4');
    price.innerText = `$ ${item.price}`;
    price.setAttribute('class', 'price')
    price.setAttribute('data-price', item.id);
    card.appendChild(price);

    const addToCartButton = document.createElement("button")
    addToCartButton.setAttribute('class', "addToCart");
    addToCartButton.setAttribute('data-add_to_cart', item.id);
    addToCartButton.addEventListener('click', (e) => addToCart(e, container, obj, itemCount));
    addToCartButton.innerText = "Add to cart"

    const counter = document.createElement('div');
    counter.setAttribute('class', 'counter');
    counter.setAttribute('data-counter', item.id)

    const removeItemButton = document.createElement("button")
    removeItemButton.setAttribute('class', "removeItem");
    removeItemButton.setAttribute('data-remove_item', item.id);
    removeItemButton.addEventListener('click', (e) => removeItem(e, container, itemCount, renderingPage));
    removeItemButton.innerText = "-";
    counter.appendChild(removeItemButton);

    const display = document.createElement('span');
    display.setAttribute('class', 'display');
    display.setAttribute('data-display', item.id);
    display.innerText = "1";
    counter.appendChild(display);

    const addItemButton = document.createElement("button")
    addItemButton.setAttribute('class', "addItem");
    addItemButton.setAttribute('data-add_item', item.id);
    addItemButton.addEventListener('click', (e) => addItem(e, container, renderingPage))
    addItemButton.innerText = "+";
    counter.appendChild(addItemButton);

    card.appendChild(counter);
    card.appendChild(addToCartButton);

    container.appendChild(card);
}