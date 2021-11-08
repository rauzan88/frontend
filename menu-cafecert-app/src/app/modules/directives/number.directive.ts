import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numeric]'
})
export class NumberDirective {

  @Input('decimals') decimals: number = 0;

  private check(value: string, decimals: number) {
    if (decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
    } else {
      let regExpString = "^\\s*((\\d+(\\.\\d{0," + decimals + "})?)|((\\d*(\\.\\d{1," + decimals + "}))))\\s*$"
      return String(value).match(new RegExp(regExpString));
    }
  }

  private specialKeys = [
    'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
  ];

  constructor(private el: ElementRef) {
  }

  aux: number = 0;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);

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
    } else {
      // if (event.key == '.') {
      //   event.preventDefault();
      //   this.el.nativeElement.value = current + ".";
      //   for(let i = 0; i < this.decimals; i++){
      //     this.el.nativeElement.value += '0';
      //   }
      // } 
    }
  }

}
