import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'decimalPlaces',
})
export class DecimalPlacesPipe implements PipeTransform {

    transform(value: string, casasDecimais: number) {

        if (!value) 
            return value;

        if (typeof value !== 'string')
            throw new Error(`Value '${value}' is invalid`);
        

        if (typeof casasDecimais !== 'number') 
            throw new Error(`Param '${casasDecimais}' is invalid`);
        

        let percentage = value.replace(/\,/, ".");
        let partsPercentage = percentage.split(".");
        let percentagePart1: string = partsPercentage[0];
        let percentagePart2: string = "";

        if (!casasDecimais)
            return percentagePart1;
    

        if (partsPercentage.length > 1) {
            percentagePart2 = partsPercentage[1].substring(0, casasDecimais);

            return `${percentagePart1}.${percentagePart2}`;
        }

        return percentagePart1;
    }
}
