import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
var DatatableDirective = /** @class */ (function () {
    function DatatableDirective(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.options = {};
        this.data = [];
        this.rows = [];
        this.listRowSize = [10, 25, 50, 100];
        this.itemsPerPage = this.listRowSize[0];
        this.minRow = 0;
        this.maxRow = this.itemsPerPage;
        this.paginationList = [];
        this.selectedPage = 0;
        this.maxPage = 0;
        this.tableHeight = 0;
        this.minPageShow = 0;
        this.pageLength = 8;
        this.maxPageShow = this.pageLength;
    }
    DatatableDirective.prototype.ngAfterContentInit = function () {
        var el = this.elRef.nativeElement.children;
        var tBodyT = el[1];
        this.rows = Array.prototype.slice.call(tBodyT.children);
        this.data = this.rows;
    };
    DatatableDirective.prototype.ngAfterViewInit = function () {
        this.createDataTable();
    };
    DatatableDirective.prototype.createDataTable = function () {
        this.createTable();
        var parent = this.elRef.nativeElement.parentNode;
        var divElement = this.renderer.createElement("div");
        this.renderer.insertBefore(parent, divElement, this.elRef.nativeElement);
        this.renderer.removeChild(parent, this.elRef.nativeElement);
        this.renderer.appendChild(divElement, this.elRef.nativeElement);
        /* VALIDACIÓN ITEMS POR PÁGINA */
        var validateSelect = false;
        try {
            var selectList = parent.firstChild.firstChild.children;
            if (selectList[1].nodeName == 'SELECT') {
                // Ya existe
                validateSelect = true;
            }
        }
        catch (error) {
        }
        if (validateSelect) {
            this.renderer.removeChild(parent, parent.firstChild);
        }
        this.renderer.insertBefore(divElement, this.createShow(), this.elRef.nativeElement);
        /* VALIDACIÓN PAGINADOR */
        var validateUl = false;
        try {
            var ulList = parent.lastChild.lastChild;
            if (ulList.nodeName == 'UL') {
                // Ya existe
                validateUl = true;
            }
        }
        catch (error) {
        }
        if (validateUl) {
            this.renderer.removeChild(parent, parent.lastChild);
        }
        this.renderer.appendChild(divElement, this.createPaginator());
    };
    DatatableDirective.prototype.createShow = function () {
        var _this = this;
        var divPanelShowList = this.renderer.createElement("div");
        this.renderer.addClass(divPanelShowList, 'row');
        var divShowList = this.renderer.createElement("div");
        this.renderer.setStyle(divShowList, 'padding', '20px 0px 10px 50px');
        this.renderer.addClass(divShowList, 'col');
        var labelShow = this.renderer.createElement('label');
        this.renderer.setStyle(labelShow, 'padding-right', '10px');
        var textShow = this.renderer.createText("Mostrar");
        this.renderer.appendChild(labelShow, textShow);
        this.renderer.appendChild(divShowList, labelShow);
        var selectShowList = this.renderer.createElement('select');
        this.renderer.setStyle(selectShowList, 'height', '20px');
        this.listRowSize.forEach(function (value) {
            var option = _this.renderer.createElement('option');
            option.value = String(value);
            if (value == _this.itemsPerPage) {
                option.selected = true;
            }
            var textOption = _this.renderer.createText(String(value));
            // this.renderer.setValue(option, String(value));
            _this.renderer.appendChild(option, textOption);
            _this.renderer.appendChild(selectShowList, option);
            // this.renderer.listen(option, 'click', (event) => this.onChangePag(event));
        });
        this.renderer.appendChild(divShowList, selectShowList);
        var labelRegisterShow = this.renderer.createElement('label');
        this.renderer.setStyle(labelRegisterShow, 'padding-left', '10px');
        var textRegisterShow = this.renderer.createText("registros");
        this.renderer.appendChild(labelRegisterShow, textRegisterShow);
        this.renderer.appendChild(divShowList, labelRegisterShow);
        this.renderer.appendChild(divPanelShowList, divShowList);
        this.renderer.listen(selectShowList, 'change', function (event) { return _this.onChangePag(event.target.value); });
        return divPanelShowList;
    };
    DatatableDirective.prototype.createTable = function () {
        var _this = this;
        var tHeadT = null;
        var tBodyT = null;
        var el = this.elRef.nativeElement.children;
        if (el.length > 0) {
            try {
                tHeadT = el[0];
                tBodyT = el[1];
            }
            catch (error) {
            }
            if (tHeadT != null) {
                this.renderer.addClass(tHeadT, 'table-header');
                this.renderer.addClass(tHeadT, 'text-center');
            }
            var i_1 = 0;
            this.createPagination(this.data);
            var rows = Array.prototype.slice.call(tBodyT.children);
            rows
                .forEach(function (row) {
                _this.renderer.addClass(row, 'table-row');
                if (i_1 % 2 == 0) {
                    _this.renderer.addClass(row, 'pair');
                }
                else {
                    _this.renderer.addClass(row, 'odd');
                }
                if (i_1 >= _this.minRow && i_1 <= _this.maxRow - 1) {
                    _this.renderer.setStyle(row, 'display', '');
                }
                else {
                    _this.renderer.setStyle(row, 'display', 'none');
                }
                i_1++;
            });
        }
    };
    DatatableDirective.prototype.createPaginator = function () {
        var _this = this;
        /* PAGINATOR CREATION */
        var ulPaginator = this.renderer.createElement('ul');
        this.renderer.addClass(ulPaginator, "pagination");
        if (this.paginationList.length > 0) {
            var liPreviousPaginator = this.renderer.createElement('li');
            this.renderer.addClass(liPreviousPaginator, "page-item");
            this.renderer.addClass(liPreviousPaginator, "text-center");
            if (this.selectedPage === 0) {
                this.renderer.addClass(liPreviousPaginator, 'disabled');
            }
            this.renderer.setStyle(liPreviousPaginator, 'min-width', '45px');
            var aPreviousPaginator = this.renderer.createElement('a');
            this.renderer.addClass(aPreviousPaginator, 'page-link');
            this.renderer.addClass(aPreviousPaginator, 'pagination-pages');
            this.renderer.setStyle(aPreviousPaginator, 'background-color', '#da9292');
            this.renderer.setStyle(aPreviousPaginator, 'border-color', '#881010');
            var textPreviousPaginator = this.renderer.createText('Anterior');
            this.renderer.appendChild(aPreviousPaginator, textPreviousPaginator);
            this.renderer.appendChild(liPreviousPaginator, aPreviousPaginator);
            this.renderer.appendChild(ulPaginator, liPreviousPaginator);
            this.renderer.listen(aPreviousPaginator, 'click', function () { return _this.pagination(_this.selectedPage - 1); });
            this.paginationList.slice(this.minPageShow, this.maxPageShow).forEach(function (page) {
                var liPaginator = _this.renderer.createElement('li');
                _this.renderer.addClass(liPaginator, "page-item");
                _this.renderer.addClass(liPaginator, "text-center");
                _this.renderer.setStyle(liPaginator, 'min-width', '45px');
                var aPaginator = _this.renderer.createElement('a');
                _this.renderer.addClass(aPaginator, 'page-link');
                _this.renderer.addClass(aPaginator, 'pagination-pages');
                if (_this.selectedPage == page) {
                    _this.renderer.addClass(aPaginator, 'active-pagination');
                }
                var textLiPaginator = _this.renderer.createText(page + 1);
                _this.renderer.appendChild(aPaginator, textLiPaginator);
                _this.renderer.appendChild(liPaginator, aPaginator);
                _this.renderer.appendChild(ulPaginator, liPaginator);
                _this.renderer.listen(aPaginator, 'click', function () { return _this.pagination(page); });
            });
            if (this.paginationList.length > this.pageLength &&
                ((this.maxPage - this.maxPageShow) > 0 || this.maxPageShow == this.pageLength)) {
                var liManyPaginator = this.renderer.createElement('li');
                this.renderer.addClass(liManyPaginator, "page-item");
                this.renderer.addClass(liManyPaginator, "text-center");
                this.renderer.setStyle(liManyPaginator, 'min-width', '45px');
                var aManyPaginator = this.renderer.createElement('a');
                this.renderer.addClass(aManyPaginator, 'page-link');
                this.renderer.addClass(aManyPaginator, 'pagination-pages');
                this.renderer.setStyle(aManyPaginator, 'background-color', '#da9292');
                this.renderer.setStyle(aManyPaginator, 'border-color', '#881010');
                var textManyPaginator = this.renderer.createText('...');
                this.renderer.appendChild(aManyPaginator, textManyPaginator);
                this.renderer.appendChild(liManyPaginator, aManyPaginator);
                this.renderer.appendChild(ulPaginator, liManyPaginator);
            }
            var liNextPaginator = this.renderer.createElement('li');
            this.renderer.addClass(liNextPaginator, "page-item");
            this.renderer.addClass(liNextPaginator, "text-center");
            if (this.selectedPage === this.maxPage) {
                this.renderer.addClass(liNextPaginator, 'disabled');
            }
            this.renderer.setStyle(liNextPaginator, 'min-width', '45px');
            var aNextPaginator = this.renderer.createElement('a');
            this.renderer.addClass(aNextPaginator, 'page-link');
            this.renderer.addClass(aNextPaginator, 'pagination-pages');
            this.renderer.setStyle(aNextPaginator, 'background-color', '#da9292');
            this.renderer.setStyle(aNextPaginator, 'border-color', '#881010');
            var textNextPaginator = this.renderer.createText('Siguiente');
            this.renderer.appendChild(aNextPaginator, textNextPaginator);
            this.renderer.appendChild(liNextPaginator, aNextPaginator);
            this.renderer.appendChild(ulPaginator, liNextPaginator);
            this.renderer.listen(aNextPaginator, 'click', function () { return _this.pagination(_this.selectedPage + 1); });
        }
        var divPaginator = this.renderer.createElement('div');
        this.renderer.addClass(divPaginator, "d-flex");
        this.renderer.addClass(divPaginator, "justify-content-center");
        this.renderer.appendChild(divPaginator, ulPaginator);
        return divPaginator;
    };
    DatatableDirective.prototype.pagination = function (pag) {
        if (this.paginationList.length > this.pageLength) {
            var maxPerPage = this.pageLength / 2;
            if ((pag + 1 / 2) > (maxPerPage + 1)) {
                if (pag >= (this.maxPage - maxPerPage - 1)) {
                    this.minPageShow = this.maxPage - this.pageLength;
                    this.maxPageShow = this.minPageShow + this.pageLength + 1;
                }
                else {
                    this.minPageShow = pag - maxPerPage;
                    this.maxPageShow = this.minPageShow + this.pageLength;
                }
            }
            else {
                this.minPageShow = 0;
                this.maxPageShow = this.pageLength;
            }
        }
        else {
            this.minPageShow = 0;
            this.maxPageShow = this.pageLength;
        }
        this.minRow = this.itemsPerPage * pag;
        this.maxRow = this.itemsPerPage * (pag + 1);
        this.selectedPage = pag;
        this.createDataTable();
    };
    DatatableDirective.prototype.createPagination = function (lista) {
        var maxPageSelect = this.listRowSize[this.listRowSize.length - 1];
        for (var i = 0; i <= this.listRowSize.length - 1; i++) {
            if (lista.length >= this.listRowSize[i] && lista.length <= this.listRowSize[i + 1]) {
                maxPageSelect = this.listRowSize[i + 1];
            }
        }
        var x = this.itemsPerPage;
        if (x > maxPageSelect) {
            x = maxPageSelect;
        }
        this.paginationList = [];
        var listaLength = lista.length / x;
        for (var k = 0; k < Math.ceil(listaLength); k++) {
            this.paginationList.push(k);
        }
        this.maxPage = Math.ceil(listaLength) - 1;
    };
    DatatableDirective.prototype.onChangePag = function (value) {
        this.itemsPerPage = value;
        this.createPagination(this.data);
        this.pagination(0);
    };
    DatatableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    tslib_1.__decorate([
        Input()
    ], DatatableDirective.prototype, "options", void 0);
    tslib_1.__decorate([
        Input()
    ], DatatableDirective.prototype, "data", void 0);
    DatatableDirective = tslib_1.__decorate([
        Directive({
            selector: '[datatable]'
        })
    ], DatatableDirective);
    return DatatableDirective;
}());
export { DatatableDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21lbnUtY2FmZWNlcnQtYXBwLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2RpcmVjdGl2ZXMvZGF0YXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt4RTtJQW9CRSw0QkFBb0IsS0FBaUIsRUFBVSxRQUFtQjtRQUE5QyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWxCekQsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUVsQixTQUFJLEdBQWUsRUFBRSxDQUFDO1FBQy9CLFNBQUksR0FBZSxFQUFFLENBQUM7UUFFZixnQkFBVyxHQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLGlCQUFZLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ25DLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsZ0JBQVcsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBSTdDLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFDRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDM0MsSUFBSSxNQUFNLEdBQUcsRUFB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QUF6VEQsSUF5VEM7U0F6VFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkYXRhdGFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueSA9IHt9O1xuXG4gIEBJbnB1dCgpIGRhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgcm93czogQXJyYXk8YW55PiA9IFtdO1xuXG4gIHB1YmxpYyBsaXN0Um93U2l6ZTogQXJyYXk8bnVtYmVyPiA9IFsxMCwgMjUsIDUwLCAxMDBdO1xuICBwdWJsaWMgaXRlbXNQZXJQYWdlOiBudW1iZXIgPSB0aGlzLmxpc3RSb3dTaXplWzBdO1xuICBwdWJsaWMgbWluUm93OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgbWF4Um93OiBudW1iZXIgPSB0aGlzLml0ZW1zUGVyUGFnZTtcbiAgcHVibGljIHBhZ2luYXRpb25MaXN0OiBBcnJheTxudW1iZXI+ID0gW107XG4gIHB1YmxpYyBzZWxlY3RlZFBhZ2U6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBtYXhQYWdlOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgdGFibGVIZWlnaHQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBtaW5QYWdlU2hvdzogbnVtYmVyID0gMDtcbiAgcHVibGljIHBhZ2VMZW5ndGg6IG51bWJlciA9IDg7XG4gIHB1YmxpYyBtYXhQYWdlU2hvdzogbnVtYmVyID0gdGhpcy5wYWdlTGVuZ3RoO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgbGV0IGVsID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xuICAgIGxldCB0Qm9keVQgPSBlbFsxXTtcbiAgICB0aGlzLnJvd3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0Qm9keVQuY2hpbGRyZW4pO1xuICAgIHRoaXMuZGF0YSA9IHRoaXMucm93cztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZURhdGFUYWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZURhdGFUYWJsZSgpIHtcbiAgICB0aGlzLmNyZWF0ZVRhYmxlKCk7XG4gICAgbGV0IHBhcmVudCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgbGV0IGRpdkVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUocGFyZW50LCBkaXZFbGVtZW50LCB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQocGFyZW50LCB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2RWxlbWVudCwgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgIC8qIFZBTElEQUNJw5NOIElURU1TIFBPUiBQw4FHSU5BICovXG4gICAgbGV0IHZhbGlkYXRlU2VsZWN0ID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWxlY3RMaXN0ID0gcGFyZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5jaGlsZHJlbjtcblxuICAgICAgaWYgKHNlbGVjdExpc3RbMV0ubm9kZU5hbWUgPT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgLy8gWWEgZXhpc3RlXG4gICAgICAgIHZhbGlkYXRlU2VsZWN0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgfVxuICAgIGlmICh2YWxpZGF0ZVNlbGVjdCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChwYXJlbnQsIHBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUoZGl2RWxlbWVudCwgdGhpcy5jcmVhdGVTaG93KCksIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAvKiBWQUxJREFDScOTTiBQQUdJTkFET1IgKi9cbiAgICBsZXQgdmFsaWRhdGVVbCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBsZXQgdWxMaXN0ID0gcGFyZW50Lmxhc3RDaGlsZC5sYXN0Q2hpbGQ7XG4gICAgICBpZiAodWxMaXN0Lm5vZGVOYW1lID09ICdVTCcpIHtcbiAgICAgICAgLy8gWWEgZXhpc3RlXG4gICAgICAgIHZhbGlkYXRlVWwgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICB9XG4gICAgaWYgKHZhbGlkYXRlVWwpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBwYXJlbnQubGFzdENoaWxkKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkaXZFbGVtZW50LCB0aGlzLmNyZWF0ZVBhZ2luYXRvcigpKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVTaG93KCk6IGFueSB7XG4gICAgbGV0IGRpdlBhbmVsU2hvd0xpc3QgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXZQYW5lbFNob3dMaXN0LCAncm93Jyk7XG5cbiAgICBsZXQgZGl2U2hvd0xpc3QgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkaXZTaG93TGlzdCwgJ3BhZGRpbmcnLCAnMjBweCAwcHggMTBweCA1MHB4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXZTaG93TGlzdCwgJ2NvbCcpO1xuXG4gICAgbGV0IGxhYmVsU2hvdyA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxhYmVsU2hvdywgJ3BhZGRpbmctcmlnaHQnLCAnMTBweCcpO1xuICAgIGxldCB0ZXh0U2hvdyA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChcIk1vc3RyYXJcIik7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxhYmVsU2hvdywgdGV4dFNob3cpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2U2hvd0xpc3QsIGxhYmVsU2hvdyk7XG5cbiAgICBsZXQgc2VsZWN0U2hvd0xpc3QgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2VsZWN0U2hvd0xpc3QsICdoZWlnaHQnLCAnMjBweCcpO1xuICAgIHRoaXMubGlzdFJvd1NpemUuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBsZXQgb3B0aW9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUgPT0gdGhpcy5pdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxldCB0ZXh0T3B0aW9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFN0cmluZyh2YWx1ZSkpO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRWYWx1ZShvcHRpb24sIFN0cmluZyh2YWx1ZSkpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChvcHRpb24sIHRleHRPcHRpb24pO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChzZWxlY3RTaG93TGlzdCwgb3B0aW9uKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyZXIubGlzdGVuKG9wdGlvbiwgJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLm9uQ2hhbmdlUGFnKGV2ZW50KSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdlNob3dMaXN0LCBzZWxlY3RTaG93TGlzdCk7XG5cbiAgICBsZXQgbGFiZWxSZWdpc3RlclNob3cgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsYWJlbFJlZ2lzdGVyU2hvdywgJ3BhZGRpbmctbGVmdCcsICcxMHB4Jyk7XG4gICAgbGV0IHRleHRSZWdpc3RlclNob3cgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoXCJyZWdpc3Ryb3NcIik7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxhYmVsUmVnaXN0ZXJTaG93LCB0ZXh0UmVnaXN0ZXJTaG93KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdlNob3dMaXN0LCBsYWJlbFJlZ2lzdGVyU2hvdyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdlBhbmVsU2hvd0xpc3QsIGRpdlNob3dMaXN0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihzZWxlY3RTaG93TGlzdCwgJ2NoYW5nZScsIChldmVudCkgPT4gdGhpcy5vbkNoYW5nZVBhZyhldmVudC50YXJnZXQudmFsdWUpKTtcbiAgICByZXR1cm4gZGl2UGFuZWxTaG93TGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVUYWJsZSgpIHtcbiAgICBsZXQgdEhlYWRUID0gbnVsbDtcbiAgICBsZXQgdEJvZHlUID0gbnVsbDtcbiAgICBsZXQgZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XG4gICAgaWYgKGVsLmxlbmd0aCA+IDApIHtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdEhlYWRUID0gZWxbMF07XG4gICAgICAgIHRCb2R5VCA9IGVsWzFdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgfVxuXG4gICAgICBpZiAodEhlYWRUICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0SGVhZFQsICd0YWJsZS1oZWFkZXInKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0SGVhZFQsICd0ZXh0LWNlbnRlcicpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgIHRoaXMuY3JlYXRlUGFnaW5hdGlvbih0aGlzLmRhdGEpO1xuICAgICAgbGV0IHJvd3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0Qm9keVQuY2hpbGRyZW4pO1xuXG4gICAgICByb3dzXG4gICAgICAgIC5mb3JFYWNoKChyb3c6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mocm93LCAndGFibGUtcm93Jyk7XG4gICAgICAgICAgaWYgKGkgJSAyID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mocm93LCAncGFpcicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJvdywgJ29kZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpID49IHRoaXMubWluUm93ICYmIGkgPD0gdGhpcy5tYXhSb3cgLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJvdywgJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocm93LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZVBhZ2luYXRvcigpOiBhbnkge1xuICAgIC8qIFBBR0lOQVRPUiBDUkVBVElPTiAqL1xuICAgIGxldCB1bFBhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHVsUGFnaW5hdG9yLCBcInBhZ2luYXRpb25cIik7XG5cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgbGlQcmV2aW91c1BhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlQcmV2aW91c1BhZ2luYXRvciwgXCJwYWdlLWl0ZW1cIik7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGxpUHJldmlvdXNQYWdpbmF0b3IsIFwidGV4dC1jZW50ZXJcIik7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFBhZ2UgPT09IDApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhsaVByZXZpb3VzUGFnaW5hdG9yLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobGlQcmV2aW91c1BhZ2luYXRvciwgJ21pbi13aWR0aCcsICc0NXB4Jyk7XG5cbiAgICAgIGxldCBhUHJldmlvdXNQYWdpbmF0b3IgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYVByZXZpb3VzUGFnaW5hdG9yLCAncGFnZS1saW5rJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFQcmV2aW91c1BhZ2luYXRvciwgJ3BhZ2luYXRpb24tcGFnZXMnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYVByZXZpb3VzUGFnaW5hdG9yLCAnYmFja2dyb3VuZC1jb2xvcicsICcjZGE5MjkyJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGFQcmV2aW91c1BhZ2luYXRvciwgJ2JvcmRlci1jb2xvcicsICcjODgxMDEwJyk7XG4gICAgICBsZXQgdGV4dFByZXZpb3VzUGFnaW5hdG9yID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KCdBbnRlcmlvcicpO1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGFQcmV2aW91c1BhZ2luYXRvciwgdGV4dFByZXZpb3VzUGFnaW5hdG9yKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobGlQcmV2aW91c1BhZ2luYXRvciwgYVByZXZpb3VzUGFnaW5hdG9yKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh1bFBhZ2luYXRvciwgbGlQcmV2aW91c1BhZ2luYXRvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUHJldmlvdXNQYWdpbmF0b3IsICdjbGljaycsICgpID0+IHRoaXMucGFnaW5hdGlvbih0aGlzLnNlbGVjdGVkUGFnZSAtIDEpKTtcblxuICAgICAgdGhpcy5wYWdpbmF0aW9uTGlzdC5zbGljZSh0aGlzLm1pblBhZ2VTaG93LCB0aGlzLm1heFBhZ2VTaG93KS5mb3JFYWNoKFxuICAgICAgICAocGFnZTogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IGxpUGFnaW5hdG9yID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlQYWdpbmF0b3IsIFwicGFnZS1pdGVtXCIpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlQYWdpbmF0b3IsIFwidGV4dC1jZW50ZXJcIik7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsaVBhZ2luYXRvciwgJ21pbi13aWR0aCcsICc0NXB4Jyk7XG5cbiAgICAgICAgICBsZXQgYVBhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYVBhZ2luYXRvciwgJ3BhZ2UtbGluaycpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYVBhZ2luYXRvciwgJ3BhZ2luYXRpb24tcGFnZXMnKTtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBhZ2UgPT0gcGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGFnaW5hdG9yLCAnYWN0aXZlLXBhZ2luYXRpb24nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHRleHRMaVBhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChwYWdlICsgMSk7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGFQYWdpbmF0b3IsIHRleHRMaVBhZ2luYXRvcik7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxpUGFnaW5hdG9yLCBhUGFnaW5hdG9yKTtcblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodWxQYWdpbmF0b3IsIGxpUGFnaW5hdG9yKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUGFnaW5hdG9yLCAnY2xpY2snLCAoKSA9PiB0aGlzLnBhZ2luYXRpb24ocGFnZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbkxpc3QubGVuZ3RoID4gdGhpcy5wYWdlTGVuZ3RoICYmIFxuICAgICAgICAoKHRoaXMubWF4UGFnZSAtIHRoaXMubWF4UGFnZVNob3cpID4gMHx8IHRoaXMubWF4UGFnZVNob3cgPT0gdGhpcy5wYWdlTGVuZ3RoKSkge1xuICAgICAgICBsZXQgbGlNYW55UGFnaW5hdG9yID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGxpTWFueVBhZ2luYXRvciwgXCJwYWdlLWl0ZW1cIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlNYW55UGFnaW5hdG9yLCBcInRleHQtY2VudGVyXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxpTWFueVBhZ2luYXRvciwgJ21pbi13aWR0aCcsICc0NXB4Jyk7XG5cbiAgICAgICAgbGV0IGFNYW55UGFnaW5hdG9yID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYU1hbnlQYWdpbmF0b3IsICdwYWdlLWxpbmsnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWFueVBhZ2luYXRvciwgJ3BhZ2luYXRpb24tcGFnZXMnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShhTWFueVBhZ2luYXRvciwgJ2JhY2tncm91bmQtY29sb3InLCAnI2RhOTI5MicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGFNYW55UGFnaW5hdG9yLCAnYm9yZGVyLWNvbG9yJywgJyM4ODEwMTAnKTtcbiAgICAgICAgbGV0IHRleHRNYW55UGFnaW5hdG9yID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KCcuLi4nKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGFNYW55UGFnaW5hdG9yLCB0ZXh0TWFueVBhZ2luYXRvcik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobGlNYW55UGFnaW5hdG9yLCBhTWFueVBhZ2luYXRvcik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh1bFBhZ2luYXRvciwgbGlNYW55UGFnaW5hdG9yKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGxpTmV4dFBhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlOZXh0UGFnaW5hdG9yLCBcInBhZ2UtaXRlbVwiKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobGlOZXh0UGFnaW5hdG9yLCBcInRleHQtY2VudGVyXCIpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQYWdlID09PSB0aGlzLm1heFBhZ2UpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhsaU5leHRQYWdpbmF0b3IsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsaU5leHRQYWdpbmF0b3IsICdtaW4td2lkdGgnLCAnNDVweCcpO1xuXG4gICAgICBsZXQgYU5leHRQYWdpbmF0b3IgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYU5leHRQYWdpbmF0b3IsICdwYWdlLWxpbmsnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYU5leHRQYWdpbmF0b3IsICdwYWdpbmF0aW9uLXBhZ2VzJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGFOZXh0UGFnaW5hdG9yLCAnYmFja2dyb3VuZC1jb2xvcicsICcjZGE5MjkyJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGFOZXh0UGFnaW5hdG9yLCAnYm9yZGVyLWNvbG9yJywgJyM4ODEwMTAnKTtcbiAgICAgIGxldCB0ZXh0TmV4dFBhZ2luYXRvciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCgnU2lndWllbnRlJyk7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYU5leHRQYWdpbmF0b3IsIHRleHROZXh0UGFnaW5hdG9yKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobGlOZXh0UGFnaW5hdG9yLCBhTmV4dFBhZ2luYXRvcik7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodWxQYWdpbmF0b3IsIGxpTmV4dFBhZ2luYXRvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhTmV4dFBhZ2luYXRvciwgJ2NsaWNrJywgKCkgPT4gdGhpcy5wYWdpbmF0aW9uKHRoaXMuc2VsZWN0ZWRQYWdlICsgMSkpO1xuICAgIH1cblxuICAgIGxldCBkaXZQYWdpbmF0b3IgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2UGFnaW5hdG9yLCBcImQtZmxleFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdlBhZ2luYXRvciwgXCJqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2UGFnaW5hdG9yLCB1bFBhZ2luYXRvcik7XG4gICAgcmV0dXJuIGRpdlBhZ2luYXRvcjtcbiAgfVxuXG4gIHB1YmxpYyBwYWdpbmF0aW9uKHBhZzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbkxpc3QubGVuZ3RoID4gdGhpcy5wYWdlTGVuZ3RoKSB7XG4gICAgICBsZXQgbWF4UGVyUGFnZSA9IHRoaXMucGFnZUxlbmd0aCAvIDI7XG4gICAgICBpZiAoKHBhZyArIDEgLyAyKSA+IChtYXhQZXJQYWdlICsgMSkpIHtcbiAgICAgICAgaWYgKHBhZyA+PSAodGhpcy5tYXhQYWdlIC0gbWF4UGVyUGFnZSAtIDEpKSB7XG4gICAgICAgICAgdGhpcy5taW5QYWdlU2hvdyA9IHRoaXMubWF4UGFnZSAtIHRoaXMucGFnZUxlbmd0aDtcbiAgICAgICAgICB0aGlzLm1heFBhZ2VTaG93ID0gdGhpcy5taW5QYWdlU2hvdyArIHRoaXMucGFnZUxlbmd0aCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5taW5QYWdlU2hvdyA9IHBhZyAtIG1heFBlclBhZ2U7XG4gICAgICAgICAgdGhpcy5tYXhQYWdlU2hvdyA9IHRoaXMubWluUGFnZVNob3cgKyB0aGlzLnBhZ2VMZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWluUGFnZVNob3cgPSAwO1xuICAgICAgICB0aGlzLm1heFBhZ2VTaG93ID0gdGhpcy5wYWdlTGVuZ3RoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pblBhZ2VTaG93ID0gMDtcbiAgICAgIHRoaXMubWF4UGFnZVNob3cgPSB0aGlzLnBhZ2VMZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5taW5Sb3cgPSB0aGlzLml0ZW1zUGVyUGFnZSAqIHBhZztcbiAgICB0aGlzLm1heFJvdyA9IHRoaXMuaXRlbXNQZXJQYWdlICogKHBhZyArIDEpO1xuICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gcGFnO1xuICAgIHRoaXMuY3JlYXRlRGF0YVRhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUGFnaW5hdGlvbihsaXN0YTogQXJyYXk8YW55Pikge1xuICAgIGxldCBtYXhQYWdlU2VsZWN0ID0gdGhpcy5saXN0Um93U2l6ZVt0aGlzLmxpc3RSb3dTaXplLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMubGlzdFJvd1NpemUubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBpZiAobGlzdGEubGVuZ3RoID49IHRoaXMubGlzdFJvd1NpemVbaV0gJiYgbGlzdGEubGVuZ3RoIDw9IHRoaXMubGlzdFJvd1NpemVbaSArIDFdKSB7XG4gICAgICAgIG1heFBhZ2VTZWxlY3QgPSB0aGlzLmxpc3RSb3dTaXplW2kgKyAxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHggPSB0aGlzLml0ZW1zUGVyUGFnZTtcbiAgICBpZiAoeCA+IG1heFBhZ2VTZWxlY3QpIHtcbiAgICAgIHggPSBtYXhQYWdlU2VsZWN0O1xuICAgIH1cblxuICAgIHRoaXMucGFnaW5hdGlvbkxpc3QgPSBbXTtcbiAgICBsZXQgbGlzdGFMZW5ndGggPSBsaXN0YS5sZW5ndGggLyB4O1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgTWF0aC5jZWlsKGxpc3RhTGVuZ3RoKTsgaysrKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25MaXN0LnB1c2goayk7XG4gICAgfVxuICAgIHRoaXMubWF4UGFnZSA9IE1hdGguY2VpbChsaXN0YUxlbmd0aCkgLSAxO1xuXG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2VQYWcodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gdmFsdWU7XG4gICAgdGhpcy5jcmVhdGVQYWdpbmF0aW9uKHRoaXMuZGF0YSk7XG4gICAgdGhpcy5wYWdpbmF0aW9uKDApO1xuICB9XG59XG4iXX0=