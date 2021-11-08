import { ReportFilterValue } from "./report-filter-value";

export class ReportFilter {
    public txInputType: string;
	public txLabel: string;
	public txJasperName: string;
	public required: string;
	public reportFilterValues: Array<ReportFilterValue>;
	public txValue: string;
	public txValues: Array<String>;
}