import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:6075/api';
  public items: any = [];

  constructor(public http:HttpClient) { }


  getEmployee(pageNo, pageSize){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Employee/' + pageNo + "/" + pageSize).subscribe(data => {
        resolve(data);
      }, err =>{
        console.log(err);
      });
      });
  }

  addEditEmploy(employInfo){
        return this.http.put(this.apiUrl + '/Employee', employInfo,
          {  headers:new HttpHeaders(
            {"content-type":"application/json"})
          });
  }

  deleteEmploy(empNo){
       return new Promise(resolve => {
        this.http.delete(this.apiUrl+'/Employee/' + empNo).subscribe(data => {
          resolve(data);
          
        }, err =>{
          console.log(err);
        });
        });
  }
    
}

