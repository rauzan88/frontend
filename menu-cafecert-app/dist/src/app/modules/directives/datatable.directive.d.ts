import { ElementRef, Renderer2 } from '@angular/core';
export declare class DatatableDirective {
    private elRef;
    private renderer;
    options: any;
    data: Array<any>;
    rows: Array<any>;
    listRowSize: Array<number>;
    itemsPerPage: number;
    minRow: number;
    maxRow: number;
    paginationList: Array<number>;
    selectedPage: number;
    maxPage: number;
    tableHeight: number;
    minPageShow: number;
    pageLength: number;
    maxPageShow: number;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    createDataTable(): void;
    createShow(): any;
    createTable(): void;
    createPaginator(): any;
    pagination(pag: number): void;
    createPagination(lista: Array<any>): void;
    onChangePag(value: number): void;
}
