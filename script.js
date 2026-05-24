const customerForm = document.getElementById("customerForm");

if (customerForm) {

    customerForm.addEventListener("submit", function(event) {

        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            event.preventDefault();
            return;
        }

        alert("Your details have been successfully sent!");

    });

}

//Shop

let cart = [];

// Open & Close Cart
function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

// Add Product
function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

// Update Cart Display
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>P${item.price} each</p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${index}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <p>
                    <strong>Total: P${itemTotal}</strong>
                </p>

            </div>
        `;
    });

    totalPrice.textContent = total;
    cartCount.textContent = count;
}

// Change Quantity
function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}