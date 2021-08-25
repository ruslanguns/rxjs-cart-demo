import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  find,
  map,
  tap,
} from 'rxjs/operators';

export interface ICart {
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
  {
    productId: 2,
    productName: 'Frijoles',
    productPrice: 25,
    productQty: 2,
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
    const products = this.subject.value;
    const productIndex = products.findIndex(
      (x) => x.productId === item.productId
    );
    const productExist = productIndex !== -1;

    if (productExist) {
      products[productIndex].productQty++;
      this.subject.next(products);
      return;
    }
    this.subject.next([...products, { ...item, productQty: 1 }]);
  }

  removeItem(productId: number) {
    const products = this.subject.value.filter(
      (x) => x.productId !== productId
    );
    this.subject.next(products);
  }

  updateItem(qty: number, productId: number) {
    const products = this.subject.value;
    const productIndex = products.findIndex((x) => x.productId === productId);
    const productExist = productIndex !== -1;

    if (productExist) {
      products[productIndex].productQty = qty;
    }
    return;
  }
}
