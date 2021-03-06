import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@/_components/modal.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;
    public type: string = '';
    public value: string = '';

    constructor(private router: Router, public dialog: MatDialog) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        if (message != null) {
            this.keepAfterRouteChange = keepAfterRouteChange;
            this.subject.next({ type: 'success', text: message });
        }
    }

    error(message: string, keepAfterRouteChange = false) {
        if (message != null) {
            this.keepAfterRouteChange = keepAfterRouteChange;
            this.subject.next({ type: 'error', text: message });
        }
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    openDialog(data: any): any {
        return this.dialog.open(ModalComponent, {
            /*height: '400px',
            width: '600px',*/
            panelClass: 'modal-style',
            data: data
        });
    }
}