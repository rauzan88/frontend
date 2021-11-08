import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, HostListener } from '@angular/core';
let NumberDirective = class NumberDirective {
    constructor(el) {
        this.el = el;
        this.decimals = 0;
        this.specialKeys = [
            'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
        ];
        this.aux = 0;
    }
    check(value, decimals) {
        if (decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        }
        else {
            let regExpString = "^\\s*((\\d+(\\.\\d{0," + decimals + "})?)|((\\d*(\\.\\d{1," + decimals + "}))))\\s*$";
            return String(value).match(new RegExp(regExpString));
        }
    }
    onKeyDown(event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current = this.el.nativeElement.value;
        let next = current.concat(event.key);
        if (current.length == 0 && next == '0' && this.decimals == 0) {
            event.preventDefault();
            return;
        }
        if (current == '0' && event.key != '.' && this.decimals > 0) {
            event.preventDefault();
            return;
        }
        // let position = current.lastIndexOf(".");
        // if(position > 0){
        //   if(this.aux < this.decimals){
        //     this.el.nativeElement.value = current.substr(0, position + 1 + this.aux) + event.key;
        //     this.aux++;
        //   }
        // }
        if (next && !this.check(next, this.decimals)) {
            event.preventDefault();
            return;
        }
        else {
            // if (event.key == '.') {
            //   event.preventDefault();
            //   this.el.nativeElement.value = current + ".";
            //   for(let i = 0; i < this.decimals; i++){
            //     this.el.nativeElement.value += '0';
            //   }
            // } 
        }
    }
};
NumberDirective.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input('decimals')
], NumberDirective.prototype, "decimals", void 0);
tslib_1.__decorate([
    HostListener('keydown', ['$event'])
], NumberDirective.prototype, "onKeyDown", null);
NumberDirective = tslib_1.__decorate([
    Directive({
        selector: '[numeric]'
    })
], NumberDirective);
export { NumberDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21lbnUtY2FmZWNlcnQtYXBwLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2RpcmVjdGl2ZXMvbnVtYmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszRSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBaUIxQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWZmLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFXaEMsZ0JBQVcsR0FBRztZQUNwQixXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxRQUFRO1NBQ3ZFLENBQUM7UUFLRixRQUFHLEdBQVcsQ0FBQyxDQUFDO0lBRmhCLENBQUM7SUFkTyxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQzNDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxZQUFZLEdBQUcsdUJBQXVCLEdBQUcsUUFBUSxHQUFHLHVCQUF1QixHQUFHLFFBQVEsR0FBRyxZQUFZLENBQUE7WUFDekcsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBV0QsU0FBUyxDQUFDLEtBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlDLE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNsRCxJQUFJLElBQUksR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDNUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUMzRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNSO1FBRUQsMkNBQTJDO1FBQzNDLG9CQUFvQjtRQUNwQixrQ0FBa0M7UUFDbEMsNEZBQTRGO1FBQzVGLGtCQUFrQjtRQUNsQixNQUFNO1FBQ04sSUFBSTtRQUdKLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1I7YUFBTTtZQUNMLDBCQUEwQjtZQUMxQiw0QkFBNEI7WUFDNUIsaURBQWlEO1lBQ2pELDRDQUE0QztZQUM1QywwQ0FBMEM7WUFDMUMsTUFBTTtZQUNOLEtBQUs7U0FDTjtJQUNILENBQUM7Q0FFRixDQUFBOztZQTdDeUIsVUFBVTs7QUFmZjtJQUFsQixLQUFLLENBQUMsVUFBVSxDQUFDO2lEQUFzQjtBQW9CeEM7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0RBdUNuQztBQTVEVSxlQUFlO0lBSDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO0tBQ3RCLENBQUM7R0FDVyxlQUFlLENBOEQzQjtTQTlEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tudW1lcmljXSdcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ2RlY2ltYWxzJykgZGVjaW1hbHM6IG51bWJlciA9IDA7XG5cbiAgcHJpdmF0ZSBjaGVjayh2YWx1ZTogc3RyaW5nLCBkZWNpbWFsczogbnVtYmVyKSB7XG4gICAgaWYgKGRlY2ltYWxzIDw9IDApIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLm1hdGNoKG5ldyBSZWdFeHAoL15cXGQrJC8pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlZ0V4cFN0cmluZyA9IFwiXlxcXFxzKigoXFxcXGQrKFxcXFwuXFxcXGR7MCxcIiArIGRlY2ltYWxzICsgXCJ9KT8pfCgoXFxcXGQqKFxcXFwuXFxcXGR7MSxcIiArIGRlY2ltYWxzICsgXCJ9KSkpKVxcXFxzKiRcIlxuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkubWF0Y2gobmV3IFJlZ0V4cChyZWdFeHBTdHJpbmcpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNwZWNpYWxLZXlzID0gW1xuICAgICdCYWNrc3BhY2UnLCAnVGFiJywgJ0VuZCcsICdIb21lJywgJ0Fycm93TGVmdCcsICdBcnJvd1JpZ2h0JywgJ0RlbGV0ZSdcbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBhdXg6IG51bWJlciA9IDA7XG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5zcGVjaWFsS2V5cy5pbmRleE9mKGV2ZW50LmtleSkgIT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50OiBzdHJpbmcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgbGV0IG5leHQ6IHN0cmluZyA9IGN1cnJlbnQuY29uY2F0KGV2ZW50LmtleSk7XG5cbiAgICBpZiAoY3VycmVudC5sZW5ndGggPT0gMCAmJiBuZXh0ID09ICcwJyAmJiB0aGlzLmRlY2ltYWxzID09IDApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnQgPT0gJzAnICYmIGV2ZW50LmtleSAhPSAnLicgJiYgdGhpcy5kZWNpbWFscyA+IDApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbGV0IHBvc2l0aW9uID0gY3VycmVudC5sYXN0SW5kZXhPZihcIi5cIik7XG4gICAgLy8gaWYocG9zaXRpb24gPiAwKXtcbiAgICAvLyAgIGlmKHRoaXMuYXV4IDwgdGhpcy5kZWNpbWFscyl7XG4gICAgLy8gICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGN1cnJlbnQuc3Vic3RyKDAsIHBvc2l0aW9uICsgMSArIHRoaXMuYXV4KSArIGV2ZW50LmtleTtcbiAgICAvLyAgICAgdGhpcy5hdXgrKztcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgXG5cbiAgICBpZiAobmV4dCAmJiAhdGhpcy5jaGVjayhuZXh0LCB0aGlzLmRlY2ltYWxzKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgKGV2ZW50LmtleSA9PSAnLicpIHtcbiAgICAgIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gY3VycmVudCArIFwiLlwiO1xuICAgICAgLy8gICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kZWNpbWFsczsgaSsrKXtcbiAgICAgIC8vICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgKz0gJzAnO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9IFxuICAgIH1cbiAgfVxuXG59XG4iXX0=