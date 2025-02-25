/**
 * Calcula o nível do usuário baseado no seu xp.
 * 
 * @param {number} userXp Total de EXP do usuário
 * @returns {number} Nível atual do usuário (com aproximação decimal)
 */
export default function calculateUserLvl(userXp) {
    // Essa é a função que faz o cálculo maluco
    // Ela retorna o xp total em função do nível n
    function f(n) {
        return (6/5) * Math.pow(n, 3) - 15 * Math.pow(n, 2) + 100 * n - 140 - userXp;
    }

    // Eu definitivamente não sei o que é pra ser isso
    function fDerivada(n) {
        return (18/5) * Math.pow(n, 2) - 30 * n + 100;
    }

    let n = 1;
    let precisao = 0.0001;
    let lvlMax = 100;

    for (let i = 0; i < lvlMax; i++) {
        let f_n = f(n);
        let f_n_derivada = fDerivada(n);
        
        if (Math.abs(f_n) < precisao) break;

        // Não me pergunte nada, apenas funciona
        n = n - f_n / f_n_derivada;
    }

    return n;
}