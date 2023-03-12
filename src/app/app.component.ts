import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';
  displayedColumns: string[] = ['EmployeeID', 'EmployeeName', 'EmployeeSalary', 'EmployeeAddress','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private api:ApiService){}
  ngOnInit(): void {
    this.getAllEmpolyee();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%',
      
    }).afterClosed().subscribe(val=>{
      if(val=='Save'){
        this.getAllEmpolyee();
      }
    })
  }
  editEmployee(row:any){
    this.dialog.open(DialogComponent,{
      width:'40%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllEmpolyee();
      }
    })
  }
  getAllEmpolyee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:()=>{
        alert("404 Error");
      }
      
    })
    
  }
  deleteEmployee(id:number){
    this.api.DeleteEmpolyee(id)
    .subscribe({
      next:(res)=>{
        alert("Delete Successfully")
        this.getAllEmpolyee();
      },
      error:()=>{
        alert("404 Error on Delete")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
