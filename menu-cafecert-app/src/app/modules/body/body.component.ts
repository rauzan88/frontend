import { Component, OnInit, Input, HostListener } from '@angular/core';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @Input() sessionId: string;
  public toggleButton: boolean = false;
  public date: Date = new Date();

  constructor() { 
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit() {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth > 850)
    this.toggleButton = false;
  }
  public onToggleButton() {
    this.toggleButton = !this.toggleButton;
  }
}
