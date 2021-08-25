import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  cart$ = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  deleteItem(productId: number) {
    return this.cartService.removeItem(productId);
  }

  addItem(product: any) {
    return this.cartService.addItem(product);
  }

  updateItem(qty: number, productId: number) {
    this.cartService.updateItem(qty, productId);
  }
}
