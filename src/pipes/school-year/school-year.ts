import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'schoolYear',
})
export class SchoolYearPipe implements PipeTransform {

    transform(value: string) {

        if (!value)
            return value;

        if (typeof value !== 'string')
            throw new Error(`Value '${value}' is invalid`);

        let currentYear: string = new Date().getFullYear().toString();
        let yearLenght: number = currentYear.length;
        let firstPartSchoolYear: string = value.substring(0, value.length - 1);
        let lastPartSchoolYear: string = value.substring(value.length - 1);
        let schoolYearLenght: number = firstPartSchoolYear.length;
        let firstPartYear: string = currentYear.substring(0, yearLenght - schoolYearLenght);
        let schoolYearformatted = firstPartYear + firstPartSchoolYear + '.' + lastPartSchoolYear;

        return schoolYearformatted;
    }
}
