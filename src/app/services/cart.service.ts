import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open("One item Added To Cart", "Ok"), { duration: 3000 };
    console.log(this.cart.value);
  }
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared", "Ok", {
      duration: 3000,
    });
  }

  removeItem(elem: CartItem): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== elem.id
    );
    this.cart.next({ items: filteredItems });
    this._snackBar.open("1 item Removed from Cart", "OK", { duration: 3000 });
    return filteredItems;
  }

  removeQuantity(ele: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let alteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === ele.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });
    if (itemForRemoval) {
      alteredItems = this.removeItem(itemForRemoval);
    }
    this.cart.next({ items: alteredItems });
  }
}
