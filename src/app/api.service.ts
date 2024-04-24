import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiService {

    BASE_URL = "http://localhost:3000";

    constructor(
        private httpClient: HttpClient,
    ) { }

    resizeAndUpload(files: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.httpClient.post<any>(
            `${this.BASE_URL}/resizeAndUpload`,
            files, { headers: headers }
        );
    }
}
