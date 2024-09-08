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
  ]
document.addEventListener("DOMContentLoaded", function(){
    const burger = document.querySelector(".nav");
    const menu = document.querySelector(".menu");
    const menuBackground = document.querySelector(".menu_background");
    menuBackground.classList.add('hide');
    const cardsWrapper = document.querySelector(".cards_wrapper"); //лента
    const cardsWindow = document.querySelector(".cards_window"); // окошко
    const width = window.getComputedStyle(cardsWindow).width;
    const arrowNext = document.querySelector(".arrow_next>.arrow");
    const arrowPrev = document.querySelector(".arrow_prev>.arrow");
    const ourFriendsContainer = document.querySelector(".our_friends_container");

    let arrShowCards = [];
    let arrPetsInWrapper = [];

    //burger

    function openCloseBurger(){
        if (document.documentElement.clientWidth < 768) {
            menuBackground.classList.toggle('hide');
            burger.classList.toggle('burger_rotate');
            document.body.classList.toggle('scroll_blocked');
            menu.classList.toggle('menu_show');
        }
        
    }
    burger.addEventListener('click', openCloseBurger);
    menuBackground.addEventListener('click', openCloseBurger)
    menu.addEventListener('click', (event)=>{
        if(event.target.nodeName == 'A'){
            openCloseBurger();
        }
    })

    //slider
    let numCards =0;
    let leftSide = 0;
    function referNumCards(){
        if(document.documentElement.clientWidth>=1231){
            numCards = 3;
            leftSide = 1080;
        }else if (document.documentElement.clientWidth<1231 && document.documentElement.clientWidth>767){
            numCards = 2;
            leftSide = 632;
        }
        else {
            numCards = 1;
            leftSide = 282;}
    }
    
    referNumCards();
    initial(numCards, leftSide) ;
     window.addEventListener('resize', () => {
            let oldNumCards = numCards;
            referNumCards();
            if (oldNumCards!=numCards){
                cardsWrapper.innerHTML = '';
                initial(numCards, leftSide) ;
                createNewClickEventMain();
            }
      }); 
     
    function createArrShowCards(iC){
        arrShowCards = [];
        for(let i = 0; i< iC; i++){
            arrShowCards.push(arrPets[i]);
        }
    }

    function initial(imageCount, leftS){
        arrPets = arrPets.sort(() => Math.random() - 0.5);
        createArrShowCards(imageCount);
        arrPetsInWrapper = [genCards(arrPets, arrShowCards), arrShowCards, genCards(arrPets, arrShowCards)];
        putCardInEnd(0, arrPetsInWrapper.flat().length);
        let size = 1280;
        if(imageCount ===2){
            size = 767;
        }
        if(imageCount ===1){
            size = 319;
        }
        ourFriendsContainer.style.width = `${size}px`;
        cardsWrapper.style.left = `-${leftS}px`;
    }
 
    function createCard(index) {
        const cardSource = arrPetsInWrapper.flat()[index];
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add(`${cardSource.name}`);
            card.innerHTML = `
            <div class="click ${cardSource.name}"></div>
            <div class="card_img"><img src="${cardSource.img}" alt="${cardSource.name}"></div>
                        <h4>${cardSource.name}</h4>
                        <button class="light_button">Learn more</button>`          
            return card;
    }

    function putCardInEnd(from, to){
        for(let i = from; i<to; i++){
            cardsWrapper.append(createCard(i));
        } 
    }

    function putCardInBeginning(from, to){
        for(let i = from; i<to; i++){
            cardsWrapper.prepend(createCard(i));
        } 
    }

    function genCards(arrInitial, arrMiddleCards){
        let genedArr = [];
        let i = 0;
        let flag = false;
        arrInitial = arrInitial.sort(() => Math.random() - 0.5);
        while (genedArr.length<arrMiddleCards.length){
            for(let j = 0; j<arrMiddleCards.length; j++){
                if(arrInitial[i]===arrMiddleCards[j]){
                    i++;
                    flag = false;
                    break; 
                }else flag = true;  
            }
            if(flag ===true){
                genedArr.push(arrInitial[i]);
                i++;
            }  
        }
        return genedArr;
      }

      arrowNext.addEventListener('click', ()=>{
        cardsWrapper.style.transitionDuration = '0s';
        for(let i = 0; i<arrShowCards.length; i++){
            cardsWrapper.children[0].remove();
        }
        cardsWrapper.style.left = '0px';
        arrShowCards = arrPetsInWrapper[2];
        arrPetsInWrapper.push(genCards(arrPets, arrShowCards));
        arrPetsInWrapper.splice(0, 1);
        putCardInEnd(numCards*2, numCards*3);
        createNewClickEventMain();
        setTimeout(()=>{
            cardsWrapper.style.transitionDuration = '0.5s';
            cardsWrapper.style.left = `-${leftSide}px`;  
        }, 0);
      })

      arrowPrev.addEventListener('click', ()=>{
        cardsWrapper.style.transitionDuration = '0s';
        for(let i = 0; i<arrShowCards.length; i++){
            cardsWrapper.children[cardsWrapper.children.length-1].remove();
        }
        cardsWrapper.style.left = `-${leftSide*2}px`;
        arrShowCards = arrPetsInWrapper[0];
        arrPetsInWrapper.unshift(genCards(arrPets, arrShowCards));
        arrPetsInWrapper.splice(3, 1);
        putCardInBeginning(0, arrShowCards.length);
        createNewClickEventMain();
        
        setTimeout(()=>{
            cardsWrapper.style.transitionDuration = '0.5s';
            cardsWrapper.style.left = `-${leftSide}px`;
        }, 0);
      })
      // pop up
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
                <li><span><b>Age:</b> ${cardSource.age}</span></li>
                <li><span><b>Inoculations:</b> ${cardSource.inoculations}</span></li>
                <li><span><b>Diseases:</b> ${cardSource.diseases}</span></li>
                <li><span><b>Parasites:</b> ${cardSource.parasites}</span></li>
            </ul>
        </div>`;          
        popUpBg.append(card);
    }
    const popUpBg = document.querySelector('.pop_up_bg');
    let click = document.querySelectorAll('.click');
    function clickEvent(event){
        const name = event.target.classList[1];
            for(let i = 0; i<arrPets.length; i++){
                if(arrPets[i].name === name){
                    createPopUp(i);
                }
            }
            popUpBg.style.top = `${document.documentElement.scrollTop}px`;
            document.body.classList.toggle('scroll_blocked');
            popUpBg.classList.toggle('hide');
            
    }
    
    click.forEach((el)=>{
        el.addEventListener('click', clickEvent) 
    })
    function createNewClickEventMain(){
        click = document.querySelectorAll('.click');
       
        click.forEach((el)=>{
            el.addEventListener('click', clickEvent) 
        })
    }
    popUpBg.addEventListener('click', (event)=>{
        if(event.target.className === 'pop_up_bg' || event.target.className === 'close'){
            document.body.classList.toggle('scroll_blocked');
            popUpBg.innerHTML = '';
            popUpBg.classList.toggle('hide');
        }
    })
})
let mark = `Оценка 110 баллов\n
Реализация burger menu на обеих страницах: +26\n
при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2\n
при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px,\n бургер-иконка плавно поворачивается на 90 градусов: +4\n
высота адаптивного меню занимает всю высоту экрана: +2\n
при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство \n(оба варианта должны быть реализованы) адаптивное меню плавно скрывается уезжая за правую часть экрана,\n бургер-иконка плавно поворачивается на 90 градусов обратно: +4\n
бургер-иконка создана при помощи html+css, без использования изображений: +2\n
ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям,\n сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов\n меню: +2\n
при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2\n
расположение и размеры элементов в бургер-меню соответствует макету\n (центрирование по вертикали и горизонтали элементов меню, расположение иконки). \nПри этом на странице Pets цветовая схема может быть как темная, так и светлая: +2\n
область, свободная от бургер-меню, затемняется: +2\n
страница под бургер-меню не прокручивается: +4\n
Реализация слайдера-карусели на странице Main: +36\n
при нажатии на стрелки происходит переход к новому блоку элементов: +4\n
смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +4\n
слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4\n
при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4\n
каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:\n
в текущем блоке слайда карточки с питомцами не повторяются: +4\n
в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов,\n следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4\n
сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево,\n а потом два раза вправо, мы получим набор карточек, отличный от исходного: +4\n
при каждой перезагрузке страницы формируется новая последовательность карточек: +2\n
генерация наборов карточек происходит на основе 8 объектов с данными о животных: +2\n
при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается \nи работает без перезагрузки страницы (набор карточек при этом может как изменяться,\n так и оставаться тем же, скрывая лишнюю или добавляя недостающую, \nи сохраняя при этом описанные для слайдера требования): +4\n
Реализация пагинации на странице Pets: +36\n
при перезагрузке страницы всегда открывается первая страница пагинации: +2\n
при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2\n
при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2\n
при открытии первой страницы кнопки << и < неактивны: +2\n
при открытии последней страницы кнопки > и >> неактивны: +2\n
в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2\n
каждая страница пагинации содержит псевдослучайный набор питомцев,\n т.е. формируется из исходных объектов в случайном порядке со следующими условиями:\n
при загрузке страницы формируется массив из 48 объектов питомцев.\n Каждый из 8 питомцев должен встречаться ровно 6 раз: +4\n
при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4\n
карточки питомцев не должны повторяться на одной странице: +4\n
при переключении страницы данные меняются (для >1280px меняется порядок карточек, \nдля остальных - меняется набор и порядок карточек): +4\n
при неизменных размерах области пагинации, в том числе размерах окна браузера,\n и без перезагрузки страницы, возвращаясь на страницу под определенным номером,\n контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, \nчто и были до перехода на другие страницы: +2\n
общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
при изменении ширины экрана (от 1280px до 320px и обратно), \nпагинация перестраивается и работает без перезагрузки страницы \n(страница может оставаться той же или переключаться,\n при этом сформированный массив - общая последовательность карточек - не обновляется, \nсохраняются все остальные требования к пагинации): +4\n
Реализация попап на обеих страницах: +12\n
попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2\n
часть страницы вне попапа затемняется: +2\n
при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2\n
при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается \n(оба варианта должны быть реализованы), при этом при нажатии на сам попап ничего \nне происходит: +2\n
кнопка с крестиком интерактивная: +2\n
окно попапа (не считая кнопку с крестиком) центрировано по всем осям, \nразмеры элементов попапа и их расположение совпадают с макетом: +2\n
`;
console.log(mark);


