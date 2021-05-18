import { Directive, Input, EventEmitter , HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appCollar]'
})
export class HighLight {

    @Output() itch: EventEmitter<any> = new EventEmitter();
    
    @HostListener('onClick') onClick() {
    
        this.itch.emit('itch itch itch');
    }
}