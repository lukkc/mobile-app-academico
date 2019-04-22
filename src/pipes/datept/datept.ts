import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'datePt',
})
export class DatePtPipe implements PipeTransform {

    transform(value: string, type: string) {

        if (!value) return value;

        if (typeof value !== 'string')
            throw new Error(`Value '${value}' is invalid`);

        let date: Date = new Date();

        if (type === "full")
            date = new Date(value);

        let daysWeek: string[] = [
            "domingo",
            "segunda",
            "terça",
            "quarta",
            "quinta",
            "sexta",
            "sábado"
        ];
        let months: string[] = [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];
        let currentDay: number = date.getUTCDay();
        let currentDayWeekPt: string = daysWeek[currentDay];
        let today: number = date.getUTCDate();
        let currentMonth: number = date.getUTCMonth();
        let currentMonthPt: string = months[currentMonth];
        let currentYear: number = date.getUTCFullYear();

        if (!type)
            return `${currentDayWeekPt} - ${today} de ${currentMonthPt}`;


        if (type === "full")
            return `${today} de ${currentMonthPt} de ${currentYear}`;

    }
}
