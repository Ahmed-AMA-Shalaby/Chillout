import { environment } from 'environments/environment';
import { User } from '../models/user.model';

export class AppStorageService {
    public storeUser(user: User): void {
        sessionStorage.setItem(environment.entities.User, JSON.stringify(user));
    }

    public removeUser(): void {
        sessionStorage.removeItem(environment.entities.User);
    }

    public loadUser(): User {
        return JSON.parse(sessionStorage.getItem(environment.entities.User));
    }
}