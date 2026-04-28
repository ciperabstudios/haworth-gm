type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type GetRequiredProps<T> = Pick<T, RequiredKeys<T>>;


export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};


/* Paso a paso
- U extends any ? (k: U) => void : never
    Se está creando una función anónima para cada miembro de la unión U.
    Si U = A | B, esto se descompone en dos funciones:
        (k: A) => void -> función con parámetro tipo A.
        (k: B) => void -> función con parámetro tipo B.

    Por efecto de condicional distributivo en tipos, este paso genera:
    (k: A) => void | (k: B) => void
    Es decir, una unión de funciones.

(U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
    Ahora intenta que esa unión de funciones sea compatible con una función de tipo (k: infer I) => void.
    TypeScript usa inferencia de tipo (infer I) para intentar obtener un tipo que sea compatible con todos los posibles parámetros k.

    — El parámetro de función en TypeScript es contravariable, lo que significa que para que la función que
    recibe k: I pueda aceptar las funciones (k: A) => void y (k: B) => void, el tipo I debe ser una
    intersección de A y B (porque solo así puede ser "compatible" con ambos).

    Por eso I termina siendo la intersección A & B.
*/

/* Resumen más práctico
 * Unión original: A | B.
 * Se convierte en unión de funciones: (k: A) => void | (k: B) => void.
 * Se infiere un único tipo I tal que (k: I) => void sea compatible con la unión anterior.
 * Por regla de contravarianza, I es la intersección A & B.
 */

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;


export type Brand<T, B> = T & { readonly __brand: B };