import { Component, OnInit } from "@angular/core";
import { ReportService } from "@/_services";
import { Report } from "@/model/report";
import * as fileSaver from 'file-saver';
import { ReportFilter } from "@/model/report-filter";

@Component({
    selector: 'report',
    templateUrl: 'report.component.html'
})
export class ReportComponent implements OnInit {

    public reportId: number = 0;
    public report: Report = new Report();
    public reports: Array<Report> = [];
    public palabra: string = "Hola mundo"; 

    constructor(private reportService: ReportService) {
    }

    ngOnInit() {
        this.reportService.getAll().subscribe(
            (reports) => {
                this.reports = reports;
                console.log(this.reports);
            }
        );
    }

    onChangeReport() {
        this.report = this.reports.filter(q => q.cdReport == this.reportId)[0];
        if (typeof this.report != 'undefined') {
            console.log(this.report);
            this.initValues();
        } else {
            this.report = new Report();
        }
    }

    download() {
        this.reportService.downloadReport(this.report).subscribe(
            (response) => {
                if (response.byteLength > 0) {
                    let blob: any = new Blob([response], { type: 'application/vnd.ms-excel' });
                    const url = window.URL.createObjectURL(blob);
                    //window.open(url);
                    fileSaver.saveAs(blob, `${this.report.txName}.xls`);
                } else {
                    console.log("Ocurrió un error al descargar el archivo");
                }
            }
        );
    }

    validateReport(): boolean {
        let isValid = true;
        try {
            this.report.reportFilters.forEach(
                (reportFilter) => {
                    if (reportFilter.required == 'S') {
                        if (reportFilter.txInputType == 'checkbox' || reportFilter.txInputType == 'select-multiple') {
                            if (typeof reportFilter.txValues == 'undefined' || reportFilter.txValues.length == 0) {
                                isValid = false;
                            }
                        }
                        else {
                            if (reportFilter.txValue == null || reportFilter.txValue == '') {
                                isValid = false;
                            }
                        }
                    }
                }
            );
        } catch (error) {
            isValid = false;
        }
        return isValid;
    }

    initValues() {
        this.report.reportFilters.forEach(
            (reportFilter) => {
                reportFilter.txValue = null;
            }
        );
    }

    onChangeFilter(reportFilter: ReportFilter, valueId: string, event) {
        try {
            let txValues = reportFilter.txValues;
            if (txValues == null || typeof txValues == 'undefined') {
                txValues = [];
            }
            let target = event.target;
            if (target.checked) {
                txValues.push(valueId);
            } else {
                const index = txValues.indexOf(valueId);
                if (index > -1) {
                    txValues.splice(index, 1);
                }
            }

            reportFilter.txValues = txValues;
        } catch (error) {

        }
    }
}