import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialFormModule } from '../../../module/angular-material-form.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupSubService } from '../../../service/group-sub.service';
import IGroupModel from '../../../model/customer/group.interface';

@Component({
  selector: 'app-update-group',
  standalone: true,
  imports: [MatDialogModule, AngularMaterialFormModule],
  templateUrl: './update-group.dialog.html',
  styleUrl: './update-group.dialog.scss'
})
export class UpdateGroupDialog implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    ref: [''],
    name: [''],
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private groupSubService: GroupSubService,
    public dialogRef: MatDialogRef<IGroupModel>,
    @Inject(MAT_DIALOG_DATA) public data: {groupModel: IGroupModel, path:string}
  ) {
    this.form.setValue(data.groupModel);
  }

  
  async submit(event: MouseEvent): Promise<void> {
    (event.target as HTMLButtonElement).disabled = true;
    let model: IGroupModel = {
      ref: this.form.get('ref')?.value,
      name: this.form.get('name')?.value,
    };
    let res = await this.groupSubService.create(model);
    this.dialogRef.close(res.success);
  }
  async cancel(): Promise<void> {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {
    this.groupSubService.Initialize(this.data.path)
  }
}
