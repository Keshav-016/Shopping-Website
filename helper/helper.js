import dbData from '../storage.js'

export function addToCart(e, container, obj, itemCount) {

    if (obj === -1)
        window.location.href = "../login/login.html";
    else {
        const counter = container.querySelector(`[data-counter="${e.target.dataset.add_to_cart}"]`)
        const countDisplay = container.querySelector(`[data-display="${e.target.dataset.add_to_cart}"]`)
        e.target.style.display = "none";
        counter.style.display = "block";
        const product = dbData.find((value) => value.id === Number(e.target.dataset.add_to_cart));
        const item = {
            id: product.id,
            qty: countDisplay.innerText,
            title: product.title,
            image: product.image,
            price: product.price,
        };
        obj = JSON.parse(localStorage.getItem('currentUser'));
        const index = obj.cartItems.findIndex(value => value.id === item.id);

        if (index === -1) {
            obj.cartItems.push(item);
            countDisplay.innerText = 1;
        }

        else {
            countDisplay.innerText = obj.cartItems[index].qty;
        }
        localStorage.setItem('currentUser', JSON.stringify(obj));
        itemCount.innerHTML = obj.cartItems.length;
    }
}

export function addItem(e, container, renderingPage) {

    const countDisplay = container.querySelector(`[data-display="${e.target.dataset.add_item}"]`)
    countDisplay.innerText = Number(countDisplay.innerText) + 1;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserCart = currentUser.cartItems;
    const localStorageIndex = currentUserCart.findIndex((value) => value.id === Number(e.target.dataset.add_item));
    currentUserCart[localStorageIndex].qty = Number(countDisplay.innerText);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (renderingPage === "cart") {
        const price = container.getElementsByClassName('price')
        price[localStorageIndex].innerText = `$ ${currentUserCart[localStorageIndex].price * currentUserCart[localStorageIndex].qty}`;
        location.reload();
    }
}


export function removeItem(e, container, itemCount, renderingPage) {

    const addCartButton = container.querySelector(`[data-add_to_cart="${e.target.dataset.remove_item}"]`)
    const counter = container.querySelector(`[data-counter="${e.target.dataset.remove_item}"]`)
    const countDisplay = container.querySelector(`[data-display="${e.target.dataset.remove_item}"]`)
    countDisplay.innerText = Number(countDisplay.innerText) === 0 ? 0 : Number(countDisplay.innerText) - 1;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserCart = currentUser.cartItems;
    const index = currentUserCart.find(value => value.id === Number(e.target.dataset.remove_item));

    if (renderingPage === "cart") {
        const price = container.querySelector(`[data-price="${e.target.dataset.remove_item}"]`)
        const card = container.querySelector(`[data-card="${e.target.dataset.remove_item}"]`)
        if (index.qty < 2) {
            currentUser.cartItems = currentUserCart.filter(ob => ob.id !== index.id)
            card.remove();
            index.qty = 0;
        }
        else {
            price.innerText = `$ ${index.price * index.qty}`;
            index.qty--;;
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        location.reload('../cart/cart.mjs');
    }

    else {
        if (index.qty < 2) {
            addCartButton.style.display = "block";
            counter.style.display = "none";
            itemCount.innerHTML = currentUserCart.length;
            index.qty = 0;
            currentUser.cartItems = currentUserCart.filter(ob => ob.id !== index.id)
        }
        else {
            index.qty--;
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    itemCount.innerHTML = currentUser.cartItems.length;
}

