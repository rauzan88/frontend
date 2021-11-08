import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, HostListener } from '@angular/core';
var NumberDirective = /** @class */ (function () {
    function NumberDirective(el) {
        this.el = el;
        this.decimals = 0;
        this.specialKeys = [
            'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
        ];
        this.aux = 0;
    }
    NumberDirective.prototype.check = function (value, decimals) {
        if (decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        }
        else {
            var regExpString = "^\\s*((\\d+(\\.\\d{0," + decimals + "})?)|((\\d*(\\.\\d{1," + decimals + "}))))\\s*$";
            return String(value).match(new RegExp(regExpString));
        }
    };
    NumberDirective.prototype.onKeyDown = function (event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        var current = this.el.nativeElement.value;
        var next = current.concat(event.key);
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
    };
    NumberDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return NumberDirective;
}());
export { NumberDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21lbnUtY2FmZWNlcnQtYXBwLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2RpcmVjdGl2ZXMvbnVtYmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszRTtJQWlCRSx5QkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFmZixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBV2hDLGdCQUFXLEdBQUc7WUFDcEIsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsUUFBUTtTQUN2RSxDQUFDO1FBS0YsUUFBRyxHQUFXLENBQUMsQ0FBQztJQUZoQixDQUFDO0lBZE8sK0JBQUssR0FBYixVQUFjLEtBQWEsRUFBRSxRQUFnQjtRQUMzQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDakIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNMLElBQUksWUFBWSxHQUFHLHVCQUF1QixHQUFHLFFBQVEsR0FBRyx1QkFBdUIsR0FBRyxRQUFRLEdBQUcsWUFBWSxDQUFBO1lBQ3pHLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQVdELG1DQUFTLEdBQVQsVUFBVSxLQUFvQjtRQUM1QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxJQUFJLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQzVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDM0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDUjtRQUVELDJDQUEyQztRQUMzQyxvQkFBb0I7UUFDcEIsa0NBQWtDO1FBQ2xDLDRGQUE0RjtRQUM1RixrQkFBa0I7UUFDbEIsTUFBTTtRQUNOLElBQUk7UUFHSixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNSO2FBQU07WUFDTCwwQkFBMEI7WUFDMUIsNEJBQTRCO1lBQzVCLGlEQUFpRDtZQUNqRCw0Q0FBNEM7WUFDNUMsMENBQTBDO1lBQzFDLE1BQU07WUFDTixLQUFLO1NBQ047SUFDSCxDQUFDOztnQkEzQ3VCLFVBQVU7O0lBZmY7UUFBbEIsS0FBSyxDQUFDLFVBQVUsQ0FBQztxREFBc0I7SUFvQnhDO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29EQXVDbkM7SUE1RFUsZUFBZTtRQUgzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztTQUN0QixDQUFDO09BQ1csZUFBZSxDQThEM0I7SUFBRCxzQkFBQztDQUFBLEFBOURELElBOERDO1NBOURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW251bWVyaWNdJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnZGVjaW1hbHMnKSBkZWNpbWFsczogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIGNoZWNrKHZhbHVlOiBzdHJpbmcsIGRlY2ltYWxzOiBudW1iZXIpIHtcbiAgICBpZiAoZGVjaW1hbHMgPD0gMCkge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkubWF0Y2gobmV3IFJlZ0V4cCgvXlxcZCskLykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVnRXhwU3RyaW5nID0gXCJeXFxcXHMqKChcXFxcZCsoXFxcXC5cXFxcZHswLFwiICsgZGVjaW1hbHMgKyBcIn0pPyl8KChcXFxcZCooXFxcXC5cXFxcZHsxLFwiICsgZGVjaW1hbHMgKyBcIn0pKSkpXFxcXHMqJFwiXG4gICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS5tYXRjaChuZXcgUmVnRXhwKHJlZ0V4cFN0cmluZykpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3BlY2lhbEtleXMgPSBbXG4gICAgJ0JhY2tzcGFjZScsICdUYWInLCAnRW5kJywgJ0hvbWUnLCAnQXJyb3dMZWZ0JywgJ0Fycm93UmlnaHQnLCAnRGVsZXRlJ1xuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIGF1eDogbnVtYmVyID0gMDtcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLnNwZWNpYWxLZXlzLmluZGV4T2YoZXZlbnQua2V5KSAhPT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnQ6IHN0cmluZyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBsZXQgbmV4dDogc3RyaW5nID0gY3VycmVudC5jb25jYXQoZXZlbnQua2V5KTtcblxuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PSAwICYmIG5leHQgPT0gJzAnICYmIHRoaXMuZGVjaW1hbHMgPT0gMCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCA9PSAnMCcgJiYgZXZlbnQua2V5ICE9ICcuJyAmJiB0aGlzLmRlY2ltYWxzID4gMCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBsZXQgcG9zaXRpb24gPSBjdXJyZW50Lmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgICAvLyBpZihwb3NpdGlvbiA+IDApe1xuICAgIC8vICAgaWYodGhpcy5hdXggPCB0aGlzLmRlY2ltYWxzKXtcbiAgICAvLyAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gY3VycmVudC5zdWJzdHIoMCwgcG9zaXRpb24gKyAxICsgdGhpcy5hdXgpICsgZXZlbnQua2V5O1xuICAgIC8vICAgICB0aGlzLmF1eCsrO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICBcblxuICAgIGlmIChuZXh0ICYmICF0aGlzLmNoZWNrKG5leHQsIHRoaXMuZGVjaW1hbHMpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiAoZXZlbnQua2V5ID09ICcuJykge1xuICAgICAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBjdXJyZW50ICsgXCIuXCI7XG4gICAgICAvLyAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRlY2ltYWxzOyBpKyspe1xuICAgICAgLy8gICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSArPSAnMCc7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0gXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==