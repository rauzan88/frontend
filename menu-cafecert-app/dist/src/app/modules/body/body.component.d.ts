import { OnInit } from '@angular/core';
export declare class BodyComponent implements OnInit {
    sessionId: string;
    toggleButton: boolean;
    date: Date;
    constructor();
    ngOnInit(): void;
    onResize(event: any): void;
    onToggleButton(): void;
}
