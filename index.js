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