import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { AngularDelegate } from '@ionic/angular';
import { Employee } from '../Employee.model';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.page.html',
  styleUrls: ['./view-employee.page.scss'],
})
export class ViewEmployeePage implements OnInit {
  employData: any;
  employNo: any;
  deleteSts: any;
  dataFromService: any;
  constructor(public apiService:ApiService, private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.employData = JSON.parse(params.special);
        this.employNo = this.employData.EmpNo;
      }
    });
  }

  ngOnInit() {
  }

  returnToHome(){
    this.router.navigate(['home']);
  }
  
  deleteEmploy(){
    this.apiService.deleteEmploy(this.employData.EmpNo)
    .then(data =>{
      this.deleteSts = data;
      console.log(this.deleteSts);
      this.router.navigate(['home']);
    });
  }

  saveEmploy(){
    console.log(this.employData);
         this.apiService.addEditEmploy(this.employData).subscribe(
        (dataReturnFromService)=> {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.router.navigate(['home']);
        })
}

}
