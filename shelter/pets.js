document.addEventListener("DOMContentLoaded", function(){
    const burger = document.querySelector(".nav");
    const menu = document.querySelector(".menu");
    const menuBackground = document.querySelector(".menu_background");
    menuBackground.classList.add('hide');

    function openCloseBurger(){
        if (document.documentElement.clientWidth < 768) {
            menuBackground.classList.toggle('hide');
            burger.classList.toggle('burger_rotate');
            document.body.classList.toggle('scroll_blocked');
            menu.classList.toggle('menu_show');
        }   
    }
    burger.addEventListener('click', openCloseBurger);
    menuBackground.addEventListener('click', openCloseBurger);
    menu.addEventListener('click', (event) => {
        if (event.target.nodeName == 'A') {
            openCloseBurger();
        }
    })
    //pagination
    let arrPets = [
        {
            "name": "Katrine",
            "img": "./img/katrine.png",
            "type": "Cat",
            "breed": "British Shorthair",
            "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
            "age": "6 months",
            "inoculations": ["panleukopenia"],
            "diseases": ["none"],
            "parasites": ["none"]
        },
        {
        "name": "Jennifer",
        "img": "./img/jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
        },
        {
        "name": "Sophia",
        "img": "./img/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
        },
        {
        "name": "Woody",
        "img": "./img/woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
        },
        {
        "name": "Scarlett",
        "img": "./img/scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
        },
        
        {
        "name": "Timmy",
        "img": "./img/timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
        },
        {
        "name": "Freddie",
        "img": "./img/freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
        },
        {
        "name": "Charly",
        "img": "./img/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
        },
    ];
  const sliderPets = document.querySelector('.slider_pets');
  const arrowRight = document.querySelector('.arrow_right_pets');
  const doubleArrowRight = document.querySelector('.double_arrow_right_pets');
  const arrowLeft = document.querySelector('.arrow_left_pets');
  const doubleArrowLeft = document.querySelector('.double_arrow_left_pets');
  const page = document.querySelector('.page_pets');
  let mainArr = [];
  let pageNumber = 1;
  let numCards = 8;
  let maxPage = 15;
  
  mainArr.push(...createArr());
  mainArr.push(...createArr());
  function initial(start, end) {
    sliderPets.innerHTML = '';
    for (let i = start; i < end; i++) {
        createCard(i);
    }
    page.innerHTML = pageNumber;
  }

  function createCard(index) {
    const cardSource = mainArr[index];
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="click" id="${cardSource.name}"></div>
    <div class="card_img"><img src="${cardSource.img}" alt="${cardSource.name}"></div>
                <h4>${cardSource.name}</h4>
                <button class="light_button light_button_pets">Learn more</button>`;          
    sliderPets.append(card);
}
defineNumCards();
initial(0, numCards);

function createArr(){
    let arr = [];
    let tempVar;
    arrPets = arrPets.sort(() => Math.random() - 0.5);
    arr.push(...arrPets);
    arrPets = arrPets.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 4; i ++) {
        if (arrPets[i] === arr[arr.length - 1] || arrPets[i] === arr[arr.length - 2]) {
            tempVar = arrPets[4];
            arrPets[4] = arrPets[i];
            arrPets[i] = arrPets[arrPets.length - 1];
            arrPets[arrPets.length - 1] = tempVar;
            if(i != 3) i = i - 1; 
        }
    }
    arr.push(...arrPets);
    arrPets = arrPets.sort(() => Math.random() - 0.5);
    for (let i =  11; i < 15; i ++) {
        if (arr[i] === arrPets[0]) {
            tempVar = arrPets[2];
            arrPets[2] = arrPets[0];
            arrPets[0] = arrPets[arrPets.length - 1];
            arrPets[arrPets.length - 1] = tempVar;
            if(i != 3) i = i - 1;   
        } else if(arr[i] === arrPets[1]) {
            tempVar = arrPets[2];
            arrPets[2] = arrPets[1];
            arrPets[1] = arrPets[arrPets.length - 1];
            arrPets[arrPets.length - 1] = tempVar; 
            if(i != 3) i = i - 1;  
        }
    }
    arr.push(...arrPets);
    return arr;
}
function defineNumCards(){
    if (document.documentElement.clientWidth >= 1231) {
        numCards = 8;
        maxPage = 5;
    }else if (document.documentElement.clientWidth < 1231 && document.documentElement.clientWidth > 767) {
        numCards = 6;
        maxPage = 7;
    }
    else{
        numCards = 3;
        maxPage = 15;
    }
}

window.addEventListener('resize', () => {
    let oldNumCards = numCards;
    defineNumCards();
    if (oldNumCards != numCards){
        initial(0, numCards) ;
        page.innerHTML = 1;
        pageNumber = 1;
        arrowLeft.classList.add('disabled');
        doubleArrowLeft.classList.add('disabled');
        arrowRight.classList.remove('disabled');
        doubleArrowRight.classList.remove('disabled');
        createNewClickEvent();
    }
}); 

arrowRight.addEventListener('click', () => {
    arrowLeft.classList.remove('disabled');
    doubleArrowLeft.classList.remove('disabled');

    if (pageNumber < maxPage) page.innerHTML = ++pageNumber;
    else {
        page.innerHTML = ++pageNumber;
        arrowRight.classList.add('disabled');
        doubleArrowRight.classList.add('disabled');
    }
    initial((pageNumber-1)*numCards, pageNumber*numCards);
    createNewClickEvent();
})
arrowLeft.addEventListener('click', () => {
    arrowRight.classList.remove('disabled');
    doubleArrowRight.classList.remove('disabled');
    if(pageNumber > 2) page.innerHTML = --pageNumber;
    else {
        page.innerHTML = --pageNumber;
        arrowLeft.classList.add('disabled');
        doubleArrowLeft.classList.add('disabled');
    }
    initial((pageNumber-1)*numCards, pageNumber*numCards); 
    createNewClickEvent();
})
doubleArrowRight.addEventListener('click', () => {
    pageNumber = maxPage + 1;
    page.innerHTML = pageNumber;
    initial((pageNumber - 1) * numCards, pageNumber * numCards)
    arrowRight.classList.add('disabled');
    doubleArrowRight.classList.add('disabled');
    arrowLeft.classList.remove('disabled');
    doubleArrowLeft.classList.remove('disabled');
    createNewClickEvent();
})
doubleArrowLeft.addEventListener('click', () => {
    initial(0, numCards) ;
    page.innerHTML = 1;
    pageNumber = 1;
    arrowLeft.classList.add('disabled');
    doubleArrowLeft.classList.add('disabled');
    arrowRight.classList.remove('disabled');
    doubleArrowRight.classList.remove('disabled');
    createNewClickEvent();
})

// popUp
function createPopUp(index){
    const cardSource = arrPets[index];
        const card = document.createElement('div');
        card.classList.add('pop_up_card');
        card.innerHTML = `
        <div class="close"></div>
        <div class="pop_img"><img src="${cardSource.img}" alt="${cardSource.name}"></div>
        <div class="pop_info">
            <h3 class="h3">${cardSource.name}</h3>
            <h4 class="h4 pop_subheader">${cardSource.type} - ${cardSource.breed}</h4>
            <div class="pop_text">${cardSource.description}</div>
            <ul class="pop_list">
                <li><span>Age: ${cardSource.age}</span></li>
                <li><span>Inoculations: ${cardSource.inoculations}</span></li>
                <li><span>Diseases: ${cardSource.diseases}</span></li>
                <li><span>Parasites: ${cardSource.parasites}</span></li>
            </ul>
        </div>`;      
        popUpBg.append(card);
}
const popUpBg = document.querySelector('.pop_up_bg');

function createNewClickEvent(){
    click = document.querySelectorAll('.click');

    click.forEach((el) => {
        el.addEventListener('click', (event) => {
                const name = event.target.id;
                for (let i = 0; i < arrPets.length; i ++) {
                    if (arrPets[i].name === name) {
                        createPopUp(i);
                    }
                }
                popUpBg.style.top = `${document.documentElement.scrollTop}px`;
                document.body.classList.toggle('scroll_blocked');
                popUpBg.classList.toggle('hide');
        }) 
})
}
let click = document.querySelectorAll('.click');

click.forEach((el) => {
    el.addEventListener('click', (event) => {
        const name = event.target.id;
        for (let i = 0; i < arrPets.length; i ++) {
            if (arrPets[i].name === name) {
                createPopUp(i);
            }
        }
        popUpBg.style.top = `${document.documentElement.scrollTop}px`;
        document.body.classList.toggle('scroll_blocked');
        popUpBg.classList.toggle('hide');
        
    }) 
})
popUpBg.addEventListener('click', (event) => {
    if (event.target.className === 'pop_up_bg' || event.target.className === 'close') {
        document.body.classList.toggle('scroll_blocked');
        popUpBg.innerHTML = '';
        popUpBg.classList.toggle('hide');
    }
})
})
