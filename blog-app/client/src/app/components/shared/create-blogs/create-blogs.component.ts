import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-blogs',
  templateUrl: './create-blogs.component.html',
  styleUrls: ['./create-blogs.component.scss']
})
export class CreateBlogsComponent {
  postForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateBlogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    const formData = this.postForm.value;
    this.dialogRef.close(formData);
  }
}
