/**
 * Gerador de keywords do usuário para busca.
 * 
 * @example
 * nome = "Ivo Junior";
 * keywords = ["ivo", "junior", "ivo junior"];
 * 
 * @param {string} nome Nome do usuário
 * @returns Lista de keywords
 */
export const generateUserKeywords = (nome) => {
    const keywords = [];
    const words = nome.toLowerCase().split(" ");

    // Separação de cada palavra
    words.forEach((word) => keywords.push(word));

    // Combinações possíveis
    for (let i = 0; i < words.length; i++) {
        for (let j = i; j < words.length; j++) {
            keywords.push(words.slice(i, j + 1).join(" "));
        }
    }

    return [...new Set(keywords)]; // Remove duplicatas
};