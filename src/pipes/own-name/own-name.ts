import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ownName',
})

export class OwnNamePipe implements PipeTransform {

    transform(value: string): string {

        if (!value)
            return value;

        if (typeof value !== 'string')
            throw new Error(`Value '${value}' is invalid`);

        let partsName: string[] = value.split(" ");
        
        let partsNameFormatted: string[] = partsName.map(partName => {

            if (/^(da|de|do|dos|das|des|e)$/.test(partName))
                return partName;

            if (/^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI|XXII|XXIII|XXIV|XXV|XXVI|XXVII|XXVIII|XXIX|XXX|XXXI|XXXII|XXXIII|XXXIV|XXXV|XXXVI|XXXVII|XXXVIII|XXXIX|XL|XLI|XLII|XLIII|XLIV|XLV|XLVI|XLVII|XLVIII|XLIX|L|LI|LII|LIII|LIV|LV|LVI|LVII|LVIII|LIX|LX|LXI|LXII|LXIII|LXIV|LXV|LXVI|LXVII|LXVIII|LXIX|LXX|LXXI|LXXII|LXXIII|LXXIV|LXXV|LXXVI|LXXVII|LXXVIII|LXXIX|LXXX|LXXXI|LXXXII|LXXXIII|LXXXIV|LXXXV|LXXXVI|LXXXVII|LXXXVIII|LXXXIX|XC|XCI|XCII|XCIII|XCIV|XCV|XCVI|XCVII|XCVIII|XCIX|C)$/i.test(partName))
                return partName.toUpperCase();

            return partName.charAt(0).toUpperCase() + partName.substring(1).toLowerCase();
        });

        return partsNameFormatted.join(" ");
    }
}
