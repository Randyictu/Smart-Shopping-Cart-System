// Product list
const products = [
  { id: 1, name: "Aloe Vera", price: 10, image: "assets/images/istockphoto-1457941583-2048x2048.jpg" },
  { id: 2, name: "Snake Plant", price: 12, image: "assets/images/istockphoto-1457941583-2048x2048.jpg" },
  { id: 3, name: "Peace Lily", price: 15, image: "assets/images/istockphoto-1457941583-2048x2048.jpg" },
  { id: 4, name: "Spider Plant", price: 8, image: "assets/images/istockphoto-2170686151-1024x1024.jpg" },
  { id: 5, name: "Succulent", price: 6, image: "assets/images/istockphoto-2170686151-1024x1024.jpg" },
  { id: 6, name: "Fern", price: 11, image: "assets/images/istockphoto-2170686151-1024x1024.jpg" }
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
if (document.getElementById("product-list")) {
  const list = document.getElementById("product-list");
  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(item);
  });
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}
updateCartCount();

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Display cart
if (document.getElementById("cart-items")) {
  const cartContainer = document.getElementById("cart-items");

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const totalPrice = item.quantity * item.price;
      total += totalPrice;
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>Unit Price: $${item.price}</p>
        <p>Qty: ${item.quantity}</p>
        <p>Total: $${totalPrice}</p>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <button onclick="removeItem(${item.id})">Delete</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    document.getElementById("total-items").textContent = cart.reduce((a, b) => a + b.quantity, 0);
    document.getElementById("total-cost").textContent = total.toFixed(2);
  }

  window.changeQty = (id, change) => {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  window.removeItem = (id) => {
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  renderCart();
}
