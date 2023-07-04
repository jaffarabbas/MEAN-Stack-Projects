import { Injectable } from '@angular/core';
import { CryptoHelper } from '../utils/cryptoHelper';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService extends CryptoHelper{
  private expiryTime = 2 * 60 * 1000; // 2 minutes in milliseconds
  constructor() {
    super();
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  setItemWithOutEncryption(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getItemWithOutEncryption(key: string): any {
    return localStorage.getItem(key);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    
    return this.decrypt(encryptedValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  removeItemAfterDelay(key: string) {
    setTimeout(() => {
      console.log('removing item from local storage');
      localStorage.removeItem(key);
    }, this.expiryTime); // 3 minutes in milliseconds
  }
}
