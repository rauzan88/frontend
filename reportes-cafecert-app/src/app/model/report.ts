import { ReportFilter } from "./report-filter";

export class Report {
    public cdReport: number;
	public txName: string;
	public txUrl: string;
	public parameterized: string;
	public reportFilters: Array<ReportFilter>;
}