import { Colors } from "./constants";


export const argbToHex = (argb: number) => {

    // Convert decimal color to hexadecimal string
    const hexString = argb.toString(16).toUpperCase();

    // Remove the alpha channel if it's present
    const hexColor = hexString.length > 6 ? hexString.slice(0, -2) : hexString;

    // Pad the hexadecimal string to ensure it has a length of 6 characters
    const paddedHexString = hexColor.padStart(6, '0');

    return `${paddedHexString}`;

};


export const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
    // Asegurarse de que el valor de la opacidad esté en el rango [0, 100]
    const alpha = Math.max(0, Math.min(100, a));
  
    // Calcular el valor de opacidad en formato hexadecimal
    const alphaHex = Math.floor((alpha / 100) * 255).toString(16).padStart(2, '0');
  
    // Calcular el color RGB en formato hexadecimal
    const colorHex = (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  
    // Combinar el color RGB y la opacidad en un solo valor hexadecimal
    return `#${colorHex}${alphaHex}`;
};


export const hexToRgb = (hex: string) => hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    ?.map(x => parseInt(x, 16));

  

export const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0')).join('')


export const subtractLight = function(color: string, amount: number){
    const cc = parseInt(color,16) - amount;
    let c: string | number = (cc < 0) ? 0 : (cc);
    c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
};


export const Darken = (color: string, amount: number) =>{
    color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
    amount = parseInt(`${(255*amount)/100}`);
    return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
};

export const setStringColor = (str: any, color: keyof typeof Colors, defaultColor?: number) => {
    const _color = Colors[color] as number;

    const Message = `{${argbToHex(_color)}}${str}{${argbToHex(defaultColor || _color)}}`

    return Message;
};


export const validateColor = (input: string) => {
    // Expresiones regulares para detectar colores en formato HEX y RGBA
    const HEX_REGEX = /^#([0-9a-f]{3}){1,2}$/i;
    const RGBA_REGEX = /^0x([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/i;

    // Limpiar la entrada eliminando el prefijo (# o 0x)
    const cleanedInput = input.replace(/^#|^0x/i, "");

    // Validar si la entrada es un HEX válido (3 o 6 caracteres)
    if (HEX_REGEX.test(input)) {
        return cleanedInput.length === 3
            ? cleanedInput.split("").map(c => c + c).join("")  // Expandir 3 caracteres a 6
            : cleanedInput;  // Devolver el HEX de 6 caracteres
    }

    // Validar si la entrada es un RGBA válido
    const rgbaMatch = input.match(RGBA_REGEX);
    if (rgbaMatch) {
        // Convertir a HEX (solo los primeros 6 caracteres de los primeros dos grupos de RGBA)
        const hexColor = rgbaMatch[1];
        return hexColor.length === 6 ? hexColor : null;
    }

    // Si no es un valor válido de HEX o RGBA
    return null;
};


export const isValidRgbNumber = (n: number): boolean => !isNaN(+n) && n >= 0 && n <= 255;



export const redString = (content: string, finalColor: string = "C3C3C3") => {
    return `{FF6359}${content}{${finalColor}}`;
}