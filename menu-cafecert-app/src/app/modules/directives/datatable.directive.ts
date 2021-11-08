import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[datatable]'
})
export class DatatableDirective {

  @Input() options: any = {};

  @Input() data: Array<any> = [];
  rows: Array<any> = [];

  public listRowSize: Array<number> = [10, 25, 50, 100];
  public itemsPerPage: number = this.listRowSize[0];
  public minRow: number = 0;
  public maxRow: number = this.itemsPerPage;
  public paginationList: Array<number> = [];
  public selectedPage: number = 0;
  public maxPage: number = 0;
  public tableHeight: number = 0;
  public minPageShow: number = 0;
  public pageLength: number = 8;
  public maxPageShow: number = this.pageLength;


  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterContentInit() {
    let el = this.elRef.nativeElement.children;
    let tBodyT = el[1];
    this.rows = Array.prototype.slice.call(tBodyT.children);
    this.data = this.rows;
  }

  ngAfterViewInit() {
    this.createDataTable();
  }

  public createDataTable() {
    this.createTable();
    let parent = this.elRef.nativeElement.parentNode;

    let divElement = this.renderer.createElement("div");
    this.renderer.insertBefore(parent, divElement, this.elRef.nativeElement);
    this.renderer.removeChild(parent, this.elRef.nativeElement);
    this.renderer.appendChild(divElement, this.elRef.nativeElement);

    /* VALIDACIÓN ITEMS POR PÁGINA */
    let validateSelect = false;
    try {
      let selectList = parent.firstChild.firstChild.children;

      if (selectList[1].nodeName == 'SELECT') {
        // Ya existe
        validateSelect = true;
      }
    } catch (error) {

    }
    if (validateSelect) {
      this.renderer.removeChild(parent, parent.firstChild);
    }
    this.renderer.insertBefore(divElement, this.createShow(), this.elRef.nativeElement);

    /* VALIDACIÓN PAGINADOR */
    let validateUl = false;
    try {
      let ulList = parent.lastChild.lastChild;
      if (ulList.nodeName == 'UL') {
        // Ya existe
        validateUl = true;
      }
    } catch (error) {

    }
    if (validateUl) {
      this.renderer.removeChild(parent, parent.lastChild);
    }
    this.renderer.appendChild(divElement, this.createPaginator());
  }

  public createShow(): any {
    let divPanelShowList = this.renderer.createElement("div");
    this.renderer.addClass(divPanelShowList, 'row');

    let divShowList = this.renderer.createElement("div");
    this.renderer.setStyle(divShowList, 'padding', '20px 0px 10px 50px');
    this.renderer.addClass(divShowList, 'col');

    let labelShow = this.renderer.createElement('label');
    this.renderer.setStyle(labelShow, 'padding-right', '10px');
    let textShow = this.renderer.createText("Mostrar");

    this.renderer.appendChild(labelShow, textShow);
    this.renderer.appendChild(divShowList, labelShow);

    let selectShowList = this.renderer.createElement('select');
    this.renderer.setStyle(selectShowList, 'height', '20px');
    this.listRowSize.forEach(value => {
      let option = this.renderer.createElement('option');
      option.value = String(value);
      if (value == this.itemsPerPage) {
        option.selected = true;
      }
      let textOption = this.renderer.createText(String(value));
      // this.renderer.setValue(option, String(value));
      this.renderer.appendChild(option, textOption);
      this.renderer.appendChild(selectShowList, option);
      // this.renderer.listen(option, 'click', (event) => this.onChangePag(event));
    });

    this.renderer.appendChild(divShowList, selectShowList);

    let labelRegisterShow = this.renderer.createElement('label');
    this.renderer.setStyle(labelRegisterShow, 'padding-left', '10px');
    let textRegisterShow = this.renderer.createText("registros");

    this.renderer.appendChild(labelRegisterShow, textRegisterShow);
    this.renderer.appendChild(divShowList, labelRegisterShow);

    this.renderer.appendChild(divPanelShowList, divShowList);
    this.renderer.listen(selectShowList, 'change', (event) => this.onChangePag(event.target.value));
    return divPanelShowList;
  }

  public createTable() {
    let tHeadT = null;
    let tBodyT = null;
    let el = this.elRef.nativeElement.children;
    if (el.length > 0) {

      try {
        tHeadT = el[0];
        tBodyT = el[1];
      } catch (error) {

      }

      if (tHeadT != null) {
        this.renderer.addClass(tHeadT, 'table-header');
        this.renderer.addClass(tHeadT, 'text-center');
      }

      let i: number = 0;
      this.createPagination(this.data);
      let rows = Array.prototype.slice.call(tBodyT.children);

      rows
        .forEach((row: any) => {
          this.renderer.addClass(row, 'table-row');
          if (i % 2 == 0) {
            this.renderer.addClass(row, 'pair');
          } else {
            this.renderer.addClass(row, 'odd');
          }

          if (i >= this.minRow && i <= this.maxRow - 1) {
            this.renderer.setStyle(row, 'display', '');
          } else {
            this.renderer.setStyle(row, 'display', 'none');
          }
          i++;
        });
    }
  }

  public createPaginator(): any {
    /* PAGINATOR CREATION */
    let ulPaginator = this.renderer.createElement('ul');
    this.renderer.addClass(ulPaginator, "pagination");

    if (this.paginationList.length > 0) {
      let liPreviousPaginator = this.renderer.createElement('li');
      this.renderer.addClass(liPreviousPaginator, "page-item");
      this.renderer.addClass(liPreviousPaginator, "text-center");
      if (this.selectedPage === 0) {
        this.renderer.addClass(liPreviousPaginator, 'disabled');
      }
      this.renderer.setStyle(liPreviousPaginator, 'min-width', '45px');

      let aPreviousPaginator = this.renderer.createElement('a');
      this.renderer.addClass(aPreviousPaginator, 'page-link');
      this.renderer.addClass(aPreviousPaginator, 'pagination-pages');
      this.renderer.setStyle(aPreviousPaginator, 'background-color', '#da9292');
      this.renderer.setStyle(aPreviousPaginator, 'border-color', '#881010');
      let textPreviousPaginator = this.renderer.createText('Anterior');

      this.renderer.appendChild(aPreviousPaginator, textPreviousPaginator);
      this.renderer.appendChild(liPreviousPaginator, aPreviousPaginator);

      this.renderer.appendChild(ulPaginator, liPreviousPaginator);
      this.renderer.listen(aPreviousPaginator, 'click', () => this.pagination(this.selectedPage - 1));

      this.paginationList.slice(this.minPageShow, this.maxPageShow).forEach(
        (page: any) => {
          let liPaginator = this.renderer.createElement('li');
          this.renderer.addClass(liPaginator, "page-item");
          this.renderer.addClass(liPaginator, "text-center");
          this.renderer.setStyle(liPaginator, 'min-width', '45px');

          let aPaginator = this.renderer.createElement('a');
          this.renderer.addClass(aPaginator, 'page-link');
          this.renderer.addClass(aPaginator, 'pagination-pages');
          if (this.selectedPage == page) {
            this.renderer.addClass(aPaginator, 'active-pagination');
          }
          let textLiPaginator = this.renderer.createText(page + 1);

          this.renderer.appendChild(aPaginator, textLiPaginator);

          this.renderer.appendChild(liPaginator, aPaginator);

          this.renderer.appendChild(ulPaginator, liPaginator);
          this.renderer.listen(aPaginator, 'click', () => this.pagination(page));
        });

      if (this.paginationList.length > this.pageLength && 
        ((this.maxPage - this.maxPageShow) > 0|| this.maxPageShow == this.pageLength)) {
        let liManyPaginator = this.renderer.createElement('li');
        this.renderer.addClass(liManyPaginator, "page-item");
        this.renderer.addClass(liManyPaginator, "text-center");
        this.renderer.setStyle(liManyPaginator, 'min-width', '45px');

        let aManyPaginator = this.renderer.createElement('a');
        this.renderer.addClass(aManyPaginator, 'page-link');
        this.renderer.addClass(aManyPaginator, 'pagination-pages');
        this.renderer.setStyle(aManyPaginator, 'background-color', '#da9292');
        this.renderer.setStyle(aManyPaginator, 'border-color', '#881010');
        let textManyPaginator = this.renderer.createText('...');

        this.renderer.appendChild(aManyPaginator, textManyPaginator);
        this.renderer.appendChild(liManyPaginator, aManyPaginator);

        this.renderer.appendChild(ulPaginator, liManyPaginator);
      }

      let liNextPaginator = this.renderer.createElement('li');
      this.renderer.addClass(liNextPaginator, "page-item");
      this.renderer.addClass(liNextPaginator, "text-center");
      if (this.selectedPage === this.maxPage) {
        this.renderer.addClass(liNextPaginator, 'disabled');
      }
      this.renderer.setStyle(liNextPaginator, 'min-width', '45px');

      let aNextPaginator = this.renderer.createElement('a');
      this.renderer.addClass(aNextPaginator, 'page-link');
      this.renderer.addClass(aNextPaginator, 'pagination-pages');
      this.renderer.setStyle(aNextPaginator, 'background-color', '#da9292');
      this.renderer.setStyle(aNextPaginator, 'border-color', '#881010');
      let textNextPaginator = this.renderer.createText('Siguiente');

      this.renderer.appendChild(aNextPaginator, textNextPaginator);
      this.renderer.appendChild(liNextPaginator, aNextPaginator);

      this.renderer.appendChild(ulPaginator, liNextPaginator);
      this.renderer.listen(aNextPaginator, 'click', () => this.pagination(this.selectedPage + 1));
    }

    let divPaginator = this.renderer.createElement('div');
    this.renderer.addClass(divPaginator, "d-flex");
    this.renderer.addClass(divPaginator, "justify-content-center");
    this.renderer.appendChild(divPaginator, ulPaginator);
    return divPaginator;
  }

  public pagination(pag: number) {
    if (this.paginationList.length > this.pageLength) {
      let maxPerPage = this.pageLength / 2;
      if ((pag + 1 / 2) > (maxPerPage + 1)) {
        if (pag >= (this.maxPage - maxPerPage - 1)) {
          this.minPageShow = this.maxPage - this.pageLength;
          this.maxPageShow = this.minPageShow + this.pageLength + 1;
        } else {
          this.minPageShow = pag - maxPerPage;
          this.maxPageShow = this.minPageShow + this.pageLength;
        }
      } else {
        this.minPageShow = 0;
        this.maxPageShow = this.pageLength;
      }
    } else {
      this.minPageShow = 0;
      this.maxPageShow = this.pageLength;
    }

    this.minRow = this.itemsPerPage * pag;
    this.maxRow = this.itemsPerPage * (pag + 1);
    this.selectedPage = pag;
    this.createDataTable();
  }

  public createPagination(lista: Array<any>) {
    let maxPageSelect = this.listRowSize[this.listRowSize.length - 1];
    for (let i = 0; i <= this.listRowSize.length - 1; i++) {
      if (lista.length >= this.listRowSize[i] && lista.length <= this.listRowSize[i + 1]) {
        maxPageSelect = this.listRowSize[i + 1];
      }
    }
    let x = this.itemsPerPage;
    if (x > maxPageSelect) {
      x = maxPageSelect;
    }

    this.paginationList = [];
    let listaLength = lista.length / x;
    for (let k = 0; k < Math.ceil(listaLength); k++) {
      this.paginationList.push(k);
    }
    this.maxPage = Math.ceil(listaLength) - 1;

  }

  public onChangePag(value: number) {
    this.itemsPerPage = value;
    this.createPagination(this.data);
    this.pagination(0);
  }
}
