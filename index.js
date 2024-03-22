// Mostrar o menu em celulares
function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        document.querySelector('.mobile-icon-img').src = "assets/menu-icon.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.mobile-icon-img').src = "assets/menu-icon-2.png";
    }
}
// Funcionalidades do menu tab na tag main
const tabs = document.querySelectorAll('.tab-btn');
const tabClicked = (tab) => {
    // Botões do menu tab
    tabs.forEach(tab => tab.classList.remove('active')); // Deixar todos inativos por padrão
    tab.classList.add('active');
    
    // Menu tab e content
    const contents = document.querySelectorAll('.content');

    contents.forEach(content => content.classList.remove('show')); // Remove a classe show de todos os contents

    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId); // Seleciona as divs em si

    content.classList.add('show');
}
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)))