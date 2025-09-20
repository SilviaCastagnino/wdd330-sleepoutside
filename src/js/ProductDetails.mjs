import { getLocalStorage, setLocalStorage, setContent, qs } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    setContent("#productName", product.Brand.Name);
    setContent("#productNameWithoutBrand", product.NameWithoutBrand);
    qs("#productImage").setAttribute("src", product.Image)
    qs("#productImage").setAttribute("alt", product.NameWithoutBrand)
    setContent("#productFinalPrice", product.finalPrice);
    setContent("#productColorName", product.Colors[0].ColorName);
    setContent("#productDescriptionHtmlSimple", product.DescriptionHtmlSimple);
    qs("#addToCart").setAttribute("data-id", product.Id);
}