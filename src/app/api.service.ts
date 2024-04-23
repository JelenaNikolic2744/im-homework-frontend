import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiService {
    
    BASE_URL = "http://localhost:3000";
    formData = new FormData();
    temp :any[]= [] 
    constructor(
        private httpClient: HttpClient,
    ) { }


    resizeAndUpload(files: any): Observable<any> {
        
        
        for (let i = 0; i < files[0].length; i++) {
           
           
            this.temp.push(files[0][i])
        }
        
        this.temp.forEach((file:any) => 
        { this.formData.append('files[]', file); });

        console.log(this.formData);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.httpClient.post<any>(
            `${this.BASE_URL}/resizeAndUpload`,
            this.formData, {headers: headers}
        );
    }
}
