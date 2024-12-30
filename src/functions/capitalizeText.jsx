/**
 * Deixar a primeira letra de cada palavra maiúscula 
 * de qualquer string.
 * 
 * @example
 * // retorna "Ivo Junior"
 * capitalizeText("ivo junior")
 * 
 * @param {string} string String antes de ser capitalizada
 * @returns String capitalizada
 */
export default function capitalizeText(string) {
    return string.toLowerCase().split(" ").map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join(" ");
}