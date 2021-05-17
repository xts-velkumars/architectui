import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 
//import * as fileSaver from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {

    validateFormControl(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateFormControl(control);
            }
        });
    }

    //saveFile = (blobContent: Blob, fileName: string, fileType: string) => {
    //    const blob = new Blob([blobContent], { type: fileType });
    //    fileSaver.saveAs(blob, fileName);
    //};
}