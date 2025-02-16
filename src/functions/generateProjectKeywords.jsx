import { stopWords } from "./stopWords";

function isChar(val) {
    return val != "";
}

/**
 * Gerador de palavras-chave para o sistema de busca
 * (uso específico para os posts)
 * 
 * @param {string} titulo titulo do projeto
 * @param {string} descricao descrição do projeto
 */
export default function generateProjectKeywords (titulo, descricao = "", tags) {
    const keywords = [];

    // Separando cada palavra em um array
    const tituloWords = titulo.toLowerCase().split(" ");
    const descricaoWords = descricao.toLowerCase().split(" ");

    // Retirando palavras desnecessárias
    tituloWords.forEach((word) => keywords.push(word));
    descricaoWords.forEach((word) => keywords.push(word));

    const removeStopWords = (texto) => texto.replace(stopWords, ''); // Função pra tirar as stop words
    const removedStopWords = keywords.map(removeStopWords);

    let removedDuplicates = [...new Set(removedStopWords)];
    removedDuplicates = removedDuplicates.filter(isChar); // remover caractere vazio
    removedDuplicates = removedDuplicates.map(function(word) {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    });
    return removedDuplicates.concat(tags);
}