const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);

    sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    calculateCartTotal();
});

//! Capturing
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
    let quantityP = e.target.parentElement.parentElement.querySelector("#product-quantity");
    // console.log(quantityP);
    // console.log(event.target);
    //? minus buttons
    if (e.target.classList.contains("fa-minus") || e.target == quantityP.parentElement.firstElementChild) {
        if (quantityP.innerText > 1) {
            quantityP.innerText--;
            //!calculate Product Total and Cart Total
            calculateProductTotal(quantityP);
        }
        else {
            if (confirm("Product will be removed!")) {
                quantityP.parentElement.parentElement.parentElement.remove();
                //!calculate Cart Total
                calculateCartTotal();
            };
        }

        // console.log("minusBtn clicked");
    }

    //? plus buttons
    else if (e.target.className == "fas fa-plus" || e.target == quantityP.parentElement.lastElementChild) {
        quantityP.innerText++;
        //!calculate Product Total and Cart total
        calculateProductTotal(quantityP);
        // console.log("plusBtn clicked");
    }

    //? remove buttons
    else if (e.target.className == "remove-product") {
        if (confirm("Product will be removed")) {
            quantityP.parentElement.parentElement.parentElement.remove();
            // e.target.parentElement.parentElement.remove();
        };


        //!calculate Cart Total
        calculateCartTotal();

        // console.log("removeBtn clicked");
    }

    //?Others
    else {
        console.log("other elements clicked");
    }
})

const calculateProductTotal = (quantityP) => {
    console.log(quantityP.innerText);
    let productPrice = quantityP.parentElement.parentElement.querySelector("strong");
    let productTotalPriceDiv = quantityP.parentElement.parentElement.querySelector(".product-line-price");
    productTotalPriceDiv.innerText = (quantityP.innerText * productPrice.innerText).toFixed(2);
    calculateCartTotal();
}

const calculateCartTotal = () => {
    let productTotalPriceDivs = document.querySelectorAll(".product-line-price");
    let subtotal = 0;
    productTotalPriceDivs.forEach(eachProductTotalPriceDiv => {
        subtotal += parseFloat(eachProductTotalPriceDiv.innerText)
    });
    let taxPrice = subtotal * localStorage.getItem("taxRate");
    let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0);
    let cartTotal = subtotal + taxPrice + shipping;
    console.log(cartTotal);

    document.querySelector("#cart-subtotal p:nth-child(2").innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shipping.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = cartTotal.toFixed(2);
}