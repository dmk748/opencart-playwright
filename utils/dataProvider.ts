import fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider {
    static getJsonData(filePath: string): any {
        const rawData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(rawData);
    }

    static getCsvData(filePath: string): any[] {
        const data = parse(fs.readFileSync(filePath, "utf-8"), {
            columns: true,
            skip_empty_lines: true,
        });
        return data;
    }
}
