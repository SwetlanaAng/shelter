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
                createNewClickEventMain()
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
        console.log(leftS);
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
                        console.log('hi')           
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
    
    click.forEach((el)=>{
        el.addEventListener('click', (event)=>{
            console.log(event.target.classList[1]);
            const name = event.target.classList[1];
            for(let i = 0; i<arrPets.length; i++){
                if(arrPets[i].name === name){
                    createPopUp(i);
                }
            }
            popUpBg.style.top = `${document.documentElement.scrollTop}px`;
            document.body.classList.toggle('scroll_blocked');
            popUpBg.classList.toggle('hide');
            createPopUp();
        }) 
    })
    function createNewClickEventMain(){
        click = document.querySelectorAll('.click');
        click.forEach((el)=>{
            el.addEventListener('click', (event)=>{
                console.log(event.target.classList[1]);
                const name = event.target.classList[1];
                for(let i = 0; i<arrPets.length; i++){
                    if(arrPets[i].name === name){
                        createPopUp(i);
                    }
                }
                popUpBg.style.top = `${document.documentElement.scrollTop}px`;
                document.body.classList.toggle('scroll_blocked');
                popUpBg.classList.toggle('hide');
                createPopUp();
            }) 
        })
    }
    popUpBg.addEventListener('click', (event)=>{
        console.log(event.target.className);
        if(event.target.className === 'pop_up_bg' || event.target.className === 'close'){
            document.body.classList.toggle('scroll_blocked');
            popUpBg.innerHTML = '';
            popUpBg.classList.toggle('hide');
        }
    })
})


