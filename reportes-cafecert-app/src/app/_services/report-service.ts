import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from '@/model/report';


@Injectable({ providedIn: 'root' })
export class ReportService {
    constructor(private http: HttpClient) { }

    public getAll(): Observable<Report[]> {
        return this.http.get<Report[]>(`${process.env.reportesbusiness}` + '/cafecert/getAllReports/');
    }

    public downloadReport(report: Report): Observable<any> {
        // return this.http.post<ArrayBuffer>(`${process.env.reportesbusiness}` + '/cafecert/downloadReport/', report, 
        //{observe: 'response', responseType: 'arraybuffer'}
        // );
        return this.http.post(`${process.env.reportesbusiness}` + '/cafecert/downloadReport/', report, { responseType: 'arraybuffer' });
    }
}