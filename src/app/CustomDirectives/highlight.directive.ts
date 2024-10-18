import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private ele : ElementRef) {

    this.ele.nativeElement.style.backgroundColor= 'white' ;
  }

  @HostListener ('mouseover') over (){
    this.ele.nativeElement.style.backgroundColor= 'gold' ;
  }

  @HostListener ('mouseout') out (){
    this.ele.nativeElement.style.backgroundColor= 'white' ;
  }

}
