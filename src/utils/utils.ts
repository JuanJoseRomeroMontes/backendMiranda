interface ErrorInterface {
    status:number;
    safe:boolean;
}

export class APIError extends Error implements ErrorInterface{
    status: number;
    safe: boolean;

    constructor(message:string, status:number, safe = false){
        super(message);
        this.status = status;
        this.safe = safe;
    }
}

export function TrimDateString(date:string){
    return date.slice(0,6)
}

export function DateToString(date: Date){
    return date.toString().slice(0,6)
}

export function StringToDate(string: string){
    return JSON.parse(string, reviveDate)
}

function reviveDate(value: string) {
    // Matches strings like "2022-08-25T09:39:19.288Z"
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  
    return typeof value === 'string' && isoDateRegex.test(value) ? new Date(value) : value
}