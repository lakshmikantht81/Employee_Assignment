import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Employee } from '../Employee.model';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  employData: Employee;
  dataFromService: any;
  constructor(public apiService:ApiService, public router: Router) { }

  ngOnInit() {
    this.employData = new Employee();
  }

  backToHome(){
    this.router.navigate(['home']);
  }

  AddEmploy(){
      console.log(this.employData);
        this.apiService.addEditEmploy(this.employData).subscribe(
          (dataReturnFromService)=> {
          this.dataFromService = JSON.stringify
          (dataReturnFromService);
          this.router.navigate(['home']);
          })
  }

}
