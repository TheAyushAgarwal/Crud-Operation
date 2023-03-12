import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 

  }
  addEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/EmployeeForm/",data);
  }
  getEmployee(){
    console.log(this.http.get<any>("http://localhost:3000/EmployeeForm/"));
    return this.http.get<any>("http://localhost:3000/EmployeeForm/");
  }
  EditEmployee(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/EmployeeForm/"+id,data);
  }
  DeleteEmpolyee(id:number){
    return this.http.delete<any>("http://localhost:3000/EmployeeForm/"+id);
  }
}
