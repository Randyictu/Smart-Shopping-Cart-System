let cartCount = 0;

function addToCart(plantName, price) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;

  // Optionally store cart data in localStorage for cart.html
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === plantName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: plantName, price: price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}
