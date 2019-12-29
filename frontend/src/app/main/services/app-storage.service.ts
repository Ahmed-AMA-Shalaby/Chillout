import { environment } from '../../../environments/environment';


export class AppStorageService {
    public storeOnSessionStorage(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public removeFromSessionStorage(key: string): void {
        sessionStorage.removeItem(key);
    }

    public loadFromSessionStorage(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
    }   

    public clearStorage(){
        sessionStorage.clear();
    }
}