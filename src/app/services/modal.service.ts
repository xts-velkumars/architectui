import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalComponent } from "../shared/component/modalcomponent/confirmationmodal.component";
import { GenericMessageModalComponent } from "../shared/component/modalcomponent/genericmessagemodal.component";



@Injectable()
export class ModalService {

    constructor(private modalService: NgbModal) {
    }

    messageModal(title: string, message: string, backdrop = true) {
        const modalRef = this.modalService.open(GenericMessageModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static'
            }
        );

        modalRef.componentInstance.title = title;
        modalRef.componentInstance.body = message;
        return modalRef;
    }

    questionModal(title: string, message: string, backdrop = true) {
        const modalRef = this.modalService.open(ConfirmationModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static'
            }
        );
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.body = message;
        return modalRef;
    }
}