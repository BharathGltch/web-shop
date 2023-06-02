import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-page",
  templateUrl: `cart-page.component.html`,
  styles: [],
})
export class CartPageComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://placehold.co/150",
        name: "sneakers",
        price: 30,
        quantity: 2,
        id: 1,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedCols: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(element: CartItem): void {
    this.cartService.removeItem(element);
  }

  onAddQuantity(ele: CartItem): void {
    this.cartService.addToCart(ele);
  }
  onRemoveQuantity(ele: CartItem): void {
    this.cartService.removeQuantity(ele);
  }
}
