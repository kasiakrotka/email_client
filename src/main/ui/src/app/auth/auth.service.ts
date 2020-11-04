import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    id: string;
    expiresIn: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('localhost:8080',
            {
                email: email,
                password: password
            })
            .pipe(
                tap(respData => {
                    const user = new User(
                        respData.email,
                        respData.id,
                        respData.expiresIn
                    );
                    this.user.next(user);
                })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('localhost:8080',
            {
                email: email,
                password: password
            }).pipe(tap(resData => {
                this.handleAuth(
                    resData.email, 
                    resData.id, 
                    resData.expiresIn
                    );
                }
            ));
    }

    private handleAuth(email: string, id: string, expiresIn: string) {
        const user = new User(
            email,
            id,
            expiresIn
        );
        this.user.next(user);
    }
}