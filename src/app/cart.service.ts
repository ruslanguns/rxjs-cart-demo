import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface ICart {
  productId: number;
  productName: string;
  productPrice: number;
  productQty: number;
}

const initialState: ICart[] = [
  {
    productId: 1,
    productName: 'Arroz',
    productPrice: 12,
    productQty: 1,
  },
];

@Injectable()
export class CartService {
  private subject = new BehaviorSubject<ICart[]>(initialState);
  private store$ = this.subject.asObservable();

  getCart() {
    return this.store$;
  }

  addItem(item: ICart) {
    const product = this.subject.value.find(
      (x) => x.productId === item.productId
    );
    if (product) {
      this.removeItem(product.productId);
      this.subject.next([
        ...this.subject.value,
        {
          ...product,
          productQty: (product.productQty || 0) + 1,
        },
      ]);
      return;
    }
    this.subject.next([...this.subject.value, { ...item, productQty: 1 }]);
  }

  removeItem(productId: number) {
    const products = this.subject.value.filter(
      (x) => x.productId !== productId
    );
    this.subject.next(products);
  }

  updateItem(qty: number, productId: number) {
    const product = this.subject.value.find((x) => x.productId === productId);

    if (product) {
      this.removeItem(product.productId);
      this.subject.next([
        ...this.subject.value,
        {
          ...product,
          productQty: qty,
        },
      ]);

      return;
    }
  }
}
