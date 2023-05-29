import {Directive, ElementRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document: keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number = 0;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) { }

  ngOnInit(): void{}

  ngAfterViewInit() {
    this.activeElementIndex = 0;

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
      }
    } else {
      throw Error('not selector pass')
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    },200)
  }
  updateItems(): void {
    console.log("Updated");

    const newItems = this.el.nativeElement.querySelectorAll(this.selector);
    this.items = this.el.nativeElement.querySelectorAll(this.selector);

    if(Array.isArray(newItems) && newItems.length){
          this.items = newItems

          this.index = 0

          if (this.items[0]) {
            (this.items[0] as HTMLElement)
            .classList.add('ng_selected')



          }
    }

  }
  initKeyUp(ev: KeyboardEvent): void{
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      (this.items[this.index] as HTMLElement)
      .classList.remove('ng_selected')
    }

    if (ev.key === 'ArrowRight') {
      if (this.index < this.items.length - 1) {
        this.index++
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement)
.classList.add('ng_selected')
      }
    } else if (ev.key === 'ArrowLeft') {
      if (this.index > 0) {
        this.index--
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement)
        .classList.add('ng_selected')
      }
    } else if (ev.key === 'ArrowDown') {
      if (this.index < this.items.length - 3) {
        this.index = this.index + 3
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement)
        .classList.add('ng_selected')
      }
    } else if (ev.key === 'ArrowUp') {
      if (this.index > 2) {
        this.index = this.index - 3
      } else this.index = 0;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement)
        .classList.add('ng_selected')
      }
    }
    const rect = this.items[this.index].getBoundingClientRect()
    window.scroll({top:rect.top})
    this.activeElementIndex = this.index
  }
  initStyle(index: number) {
    this.index = index

    if (this.items[index]) {
      (this.items[index] as HTMLElement)
      .classList.add('ng_selected')
    }
  }

}
