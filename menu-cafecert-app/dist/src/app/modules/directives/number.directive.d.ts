import { ElementRef } from '@angular/core';
export declare class NumberDirective {
    private el;
    decimals: number;
    private check;
    private specialKeys;
    constructor(el: ElementRef);
    aux: number;
    onKeyDown(event: KeyboardEvent): void;
}
