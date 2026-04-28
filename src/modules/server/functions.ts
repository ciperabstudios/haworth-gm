export const getTickCountDifference = (newtick: number, oldtick: number): number => {
    const cellmax = Number.MAX_SAFE_INTEGER;
    const cellmin = Number.MIN_SAFE_INTEGER;

    return (oldtick < 0 && newtick >= 0) ? newtick - oldtick :
           (oldtick >= 0 && (newtick < 0 || oldtick > newtick)) ? (cellmax - oldtick + 1) - (cellmin - newtick) :
           newtick - oldtick;
};


export const cmToFeetAndInches = (cm: number): { feet: number, inches: number } => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
};


export const kgToLb = (kg: number) => kg * 2.205; 


export const getValueInRange = (value: number, range: number) => {
    const minValue = value - range;
    const maxValue = value + range;

    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};


export const moneyFormat = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


// Sirve para calcular las nuevas coordenadas de un punto en un plano 2D 
// después de moverlo una cierta distancia en una dirección específica
export const getXYInFrontOfPoint = (x: number, y: number, angle: number, distance: number): { x: number, y: number } => {
    const radians = (angle: number): number => angle * (Math.PI / 180);
    x += distance * Math.sin(radians(-angle));
    y += distance * Math.cos(radians(-angle));
    return { x, y };
};


type Coord = {
    x: number;
    y: number;
    z: number;
}

export const IsPointInRange = (coord: Coord, point: Coord, range: number): boolean => {
    const distance = Math.sqrt(
        Math.pow(coord.x - point.x, 2) + 
        Math.pow(coord.y - point.y, 2) + 
        Math.pow(coord.z - point.z, 2)
    );

    return distance <= range;
};


export const GetDistanceBetweenPoints2D = (x: number, y: number, xx: number, yy: number) => {

    const newX = (xx - x) ** 2;
    const newY = (yy - y) ** 2;

    return (newX + newY) ** 0.5;
};


export const GetDistanceBetweenPoints3D = (x: number, y: number, z: number, xx: number, yy: number, zz: number) => {

    const newX = (xx - x) ** 2;
    const newY = (yy - y) ** 2;
    const newZ = (zz - z) ** 2;

    return (newX + newY + newZ) ** 0.5;
};


export const AngleBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => {
    return -(90 - Math.atan2(y1 - y2, x1 - x2));
};