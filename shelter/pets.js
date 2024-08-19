document.addEventListener("DOMContentLoaded", function(){
    const burger = document.querySelector(".nav");
    
    const menu = document.querySelector(".menu");
    const menuBackground = document.querySelector(".menu_background");
    menuBackground.classList.add('hide');

    function openCloseBurger(){
        menuBackground.classList.toggle('hide');
        
        burger.classList.toggle('burger_rotate');
        document.body.classList.toggle('scroll_blocked');
        menu.classList.toggle('menu_show');
    }
    burger.addEventListener('click', openCloseBurger);
    menuBackground.addEventListener('click', openCloseBurger)
    menu.addEventListener('click', (event)=>{
        if(event.target.nodeName == 'A'){
            openCloseBurger();
        }
    })
})
