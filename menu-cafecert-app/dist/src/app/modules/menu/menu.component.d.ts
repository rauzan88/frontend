import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export declare class MenuComponent implements OnInit {
    private http;
    sessionId: string;
    toggleButton: boolean;
    menu: Array<any>;
    showLogoutButton: boolean;
    role: string;
    user: string;
    constructor(http: HttpClient);
    ngOnInit(): void;
    chooseMenu(url: string): void;
    validateSession(sessionId: string): Observable<any>;
    getMenuByRole(sessionId: string, txRole: string): Observable<any>;
    logout(): void;
}
