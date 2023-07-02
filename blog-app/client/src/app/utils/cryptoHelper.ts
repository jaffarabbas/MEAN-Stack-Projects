import * as CryptoJS from "crypto-js";

export class CryptoHelper{
  private key = 'my-secret-key'; // Replace with your own secret key
  protected encrypt(value: any): string {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), this.key);
    return encrypted.toString();
  }

  protected decrypt(encryptedValue: string): any {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, this.key);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}
