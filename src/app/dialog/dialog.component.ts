import { Component ,Inject,OnInit} from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  actionBtn:String="Save"
  EmployeeForm!: FormGroup;
constructor(private formBuilder:FormBuilder,
  private dialogRef:MatDialogRef<DialogComponent>,
  private api: ApiService,
  @Inject(MAT_DIALOG_DATA) public editData:any){
   
}

ngOnInit(): void {
    this.EmployeeForm=this.formBuilder.group({
      EmployeeID:['',Validators.required],
      EmployeeName:['',Validators.required],
      EmployeeSalary:[,Validators.required],
      EmployeeAddress:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update"
      this.EmployeeForm.controls['EmployeeID'].setValue(this.editData.EmployeeID);
      this.EmployeeForm.controls['EmployeeName'].setValue(this.editData.EmployeeName);
      this.EmployeeForm.controls['EmployeeSalary'].setValue(this.editData.EmployeeSalary);
      this.EmployeeForm.controls['EmployeeAddress'].setValue(this.editData.EmployeeAddress);
    }
}

addEmployee(){
  if(!this.editData){
    if(this.EmployeeForm.valid){
      this.api.addEmployee(this.EmployeeForm.value)
      .subscribe({
        next:(res)=>{
          alert("Employee Added Successfully");
          this.EmployeeForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Please Enter valid Input");
        }
        
      })
    }
  
  }
  else{
    this.updateEmployee()
  }
  
  
}
updateEmployee(){
  this.api.EditEmployee(this.EmployeeForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Employee update Successfully");
      this.EmployeeForm.reset();
      this.dialogRef.close('Update');
    },
    error:()=>{
      alert("404 Error on Update")
    }
  })
}

}
