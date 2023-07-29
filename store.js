if (document.readyState == "loading")
  document.addEventListener("DOMContentLoaded", documentReady);
else documentReady();

function documentReady() {
  // Add event listener to All remove buttons
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++)
    removeCartItemButtons[i].addEventListener("click", removeCartItem);

  /*  Handle the quantity of cart items to not be minus or not a number and
      Update the total if changed*/
  let cartQuantity = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < cartQuantity.length; i++)
    cartQuantity[i].addEventListener("change", updateCartQuantity);

  // Add shoping item to cart
  let addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++)
    addToCartButtons[i].addEventListener("click", addToCart);

  // Handle purchase
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchase);
}

function removeCartItem(e) {
  e.target.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartQuantity(e) {
  if (isNaN(e.target.value) || e.target.value <= 0) e.target.value = 1;
  updateCartTotal();
}

function addToCart(e) {
  // 1-Get item information from the clicked button
  let shopItem = e.target.parentElement.parentElement;
  let itemTitle =
    shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let itemPrice = parseFloat(
    shopItem
      .getElementsByClassName("shop-item-price")[0]
      .innerText.replace("$", "")
  );
  let itemImageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  // 2- Check if the item is already added to the cart
  let cartItems = document.getElementById("cart-items");
  let cartItemTitle = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemTitle.length; i++) {
    if (cartItemTitle[i].innerText === itemTitle) {
      alert("This item is already added to the cart");
      return;
    }
  }
  // 3- Create a new Item
  let cartItemContents = `
  <div class="cart-column cart-item">
            <img class="cart-item-image" src=${itemImageSrc} />
            <span class="cart-item-title">${itemTitle}</span>
          </div>

          <span class="cart-column cart-price">$${itemPrice}</span>
          <div class="cart-column cart-quantity">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger">REMOVE</button>
          </div>
  `;
  // 4-Add a new Item to cart
  let cartItem = document.createElement("div");
  cartItem.classList.add("cart-row");
  cartItem.innerHTML = cartItemContents;
  cartItems.append(cartItem);
  // 5-Add event listener to the new remove button
  cartItem
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  /* 6-Handle the quantity of the new item to not be minus or not a number and
      Update the total if changed*/
  cartItem
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", updateCartQuantity);
  // 7-Update cart total
  updateCartTotal();
}
function purchase() {
  alert("Thank you for your purchase");
  let cartItems = document.getElementById("cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function updateCartTotal() {
  let cartItems = document.getElementById("cart-items");
  let cartRows = cartItems.getElementsByClassName("cart-row");
  let cartTotal = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartPrice = parseFloat(
      cartRows[i]
        .getElementsByClassName("cart-price")[0]
        .innerHTML.replace("$", "")
    );
    let cartQuantity = cartRows[i].getElementsByClassName(
      "cart-quantity-input"
    )[0].value;
    cartTotal += cartPrice * cartQuantity;
  }
  cartTotal = Math.round(cartTotal * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + cartTotal;
}
