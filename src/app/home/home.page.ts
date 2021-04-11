import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
//import { setTimeout } from 'node:timers';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  EmployList : any=[];
  EmployPageList : any =[];
  term = '';
  filteredItems = [];
  pageSize = 5;
  pageNo = 1;

  constructor(public apiService:ApiService, public router: Router) {
    this.getEmployList(this.pageNo, this.pageSize);
  }

  loadData(event){
      setTimeout(() =>{
      this.getEmployList(this.pageNo, this.pageSize);
      if(this.pageNo > 0){
          event.target.complete();
      }
      else{
        event.target.disabled = true;
      }
    }, 500);
  }

  getEmployList(pageNo, pageSize){
    this.EmployPageList=[];
    this.apiService.getEmployee(pageNo, pageSize)
    .then(data =>{
      this.EmployPageList = data;
      for (let i = 0; i < this.EmployPageList.length; i++) {
        this.EmployList.push(this.EmployPageList[i]);
      }

      if(this.EmployPageList.length < pageSize){
          this.pageNo = 0;
      }
      else{
        this.pageNo = this.pageNo + 1 ;
      }
    
      this.assignCopy();
    });
  }

  selectEmploy(selectedEmp){
        let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(selectedEmp)
      }
    };
    this.router.navigate(['view-employee'], navigationExtras);
  }

  AddNewEmploy(){
    this.router.navigate(['add-employee']);
  }

  assignCopy(){
    this.filteredItems = Object.assign([], this.EmployList);
 }

 filterItem(value){
  if(!value){
      this.assignCopy();
  } // when nothing has typed
  this.filteredItems = Object.assign([], this.EmployList).filter(
    item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

//when you fetch collection from server.

}
