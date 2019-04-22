import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'zipCode',
})
export class ZipCodePipe implements PipeTransform {

    transform(value: string) {

        if (!value)
            return value;

        if (typeof value !== 'string')
            throw new Error(`Value '${value}' is invalid`);

        value = value.replace(/\-/, "");
        
        let zipCodePart1 = value.substring(0, 5);
        let zipCodePart2 = value.substring(5);
        let zipCodeFormatted = `${zipCodePart1}-${zipCodePart2}`;

        return zipCodeFormatted;
    }
}
