`use strict`;
const createNewMatrix = () =>{
    let matrix = [new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),
    new Array(11).fill(0),

    ]

    matrix.forEach(() => {matrix[Math.floor(Math.random() * 9)+1][Math.floor(Math.random() * 9)+1] = -9});
    for(let i = 1; i<10; i++){
        matrix[0][0] = 1;
        matrix[i][0] = 1;
        matrix[i][10] = 1;
        matrix[0][10] = 1;
        for(let j = 1; j<10; j++){
            matrix[0][j]=1;
            matrix[10][j]= 1;
            matrix[10][10]= 1;
            matrix[10][0]=1;
            if(matrix[i][j] <0){
                matrix[i][j-1]++;
                matrix[i][j+1]++;
                matrix[i-1][j-1]++;
                matrix[i-1][j]++;
                matrix[i-1][j+1]++;
                matrix[i+1][j-1]++;
                matrix[i+1][j]++;
                matrix[i+1][j+1]++;
            }
            
        }
    }
    return matrix;
}
//console.log(matrix)
document.addEventListener("DOMContentLoaded", function(){
    let counter = 0;
    let start;
    let fail = false;
    let storageKey = 0;
    let pauseTimer = false;
 const matrix = createNewMatrix();
 
 const field = document.querySelector('.playing_field'),
 hidingField= document.querySelector('.hiding_field'),
 hours = document.querySelector('.hours'),
 minutes = document.querySelector('.minutes'),
 seconds = document.querySelector('.seconds'),
 finish = document.querySelector('.finish'),
 startOver = document.querySelector('.start_over'),
 pause = document.querySelector('.pause'),
 rules = document.querySelector('.rules'),
 rulesText = document.querySelector('.rules_text'),
 score = document.querySelector('.score'),
 scoreInfo = document.querySelector('.score_info');
 const renderNewField = (arr) =>{
    arr.forEach((item, i) => {
        if(i!=0&&i!=10)
        for(let j = 1; j<10; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(`c${i}${j}`);
            if(item[j] != 0) cell.innerHTML = `${item[j]}`;
            if(item[j] < 0) cell.innerHTML = '<img width="19px" src="./img/explosion_5512962.png" alt="explosion">';////
            field.append(cell);

            const hideCell = document.createElement('div');
            hideCell.classList.add('hiding_cell');
            hideCell.id = `c${i}${j}`;
            
            hidingField.append(hideCell);
        }
    })
 }
 const addZero = (number) =>{
    if(number <10) return '0'+number;
    return number;
 }
 const setTimer = () =>{
    function updateTimer(){
        const time = getTime();
        hours.innerHTML = `${addZero(time.hours)}:`;
        minutes.innerHTML = `${addZero(time.minutes)}:`;
        seconds.innerHTML = `${addZero(time.seconds)}`;
        if (fail === true) clearInterval(timerInterval);
    }
    const timerInterval = setInterval(updateTimer, 1000);
 }
 const getTime = (timeArg) =>{
    let time = Date.parse(new Date()) - start;
    if(timeArg) {time =  timeArg}
    if(timeArg === 0){
        return {
            'time': 0,
            'seconds': 00,
            'minutes': 00,
            'hours': 00
        };
    }
    const seconds = Math.floor((time/1000)%60),
    minutes = Math.floor((time/1000/60)%60),
    hours = Math.floor((time/(1000*60*60))%60);
    return {
        'time': time,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours
    };

 }
 const putInQ = (queue, i,j) =>{
        queue.push([i,j+1]);
        queue.push([i, j-1])
        queue.push([i+1, j])
        queue.push([i+1,j+1])
        queue.push([i+1,j-1])
        queue.push([i-1,j-1])
        queue.push([i-1,j])
        queue.push([i-1,j+1])
    }
 const formQ = (queue) =>{
    while(queue.length!=0){
        if(queue[0][0]<10 && queue[0][0]>0 && queue[0][1]<10 && queue[0][1]>0){
            const hidingCell = document.querySelector(`#c${queue[0][0]}${queue[0][1]}`);
            if( hidingCell.style.backgroundColor !== 'rgba(255, 227, 194, 0)'){
                hidingCell.style.backgroundColor = 'rgba(255, 227, 194, 0)';
                if(matrix[queue[0][0]][queue[0][1]] === 0) {
                    putInQ(queue, queue[0][0], queue[0][1]);
                } 
            }
            
        }
        queue.shift();    
        
    }
 } 
 const findArea = (i,j) => {
    let queue = [[i,j]];
    formQ(queue); 
    
 }
 const setDataToLocalStorage = () => {
    myStorage = window.localStorage;
    const duration = Date.parse(new Date()) - start;
    console.log(duration);
    const results = {'duration': duration,
        'steps': counter
    }
            if(Object.keys(myStorage).length>9){
                let keys = Object.keys(myStorage);
                console.log(keys);
                myStorage.removeItem(`${Math.min(...keys)}`);
;            }
            storageKey = Date.parse(new Date());
            myStorage.setItem(`${storageKey}`, JSON.stringify(results))
 }
 //localStorage.clear();
 renderNewField(matrix);
 console.log(matrix)
 const hidingCells = document.querySelectorAll('.hiding_cell');
 hidingField.addEventListener('click', (e) => {
    if(e.shiftKey){
        if(e.target.alt === "flag"){
            const clickedCell = document.querySelector(`#${e.target.parentElement.id}`);
            clickedCell.innerHTML = '';
        }else {
            const clickedCell = document.querySelector(`#${e.target.id}`);
            clickedCell.innerHTML ='<img width="19px" src="./img/map_13899955.png" alt="flag">'
        }
        
    }else {
         if(counter ===0){
        start = Date.parse(new Date());
        setTimer();
    } 
    counter++;
    //console.log(e.target)
    if(e.target.id){
        const clickedCell = document.querySelector(`#${e.target.id}`);
        const underCell = document.querySelector(`.${e.target.id}`);
        if (Number(underCell.innerHTML) > 0 && underCell.innerHTML != '' ) clickedCell.style.backgroundColor = 'rgba(255, 227, 194, 0)';
        else if (underCell.innerHTML === ''){
            const cells = document.querySelectorAll('.cell');
            let ij = e.target.id.slice(1);
            findArea(+ij[0], +ij[1]);
        }else if (underCell.innerHTML ==='<img width="19px" src="./img/explosion_5512962.png" alt="explosion">'){
            hidingCells.forEach((item) => {item.style.backgroundColor = 'rgba(255, 227, 194, 0)';});
            fail = true;
            finish.classList.toggle('hide');
            finish.innerHTML = `sorry! You have lost! <br> time : ${Date.parse(new Date()) - start}
            <br> steps: ${counter}`
            setDataToLocalStorage()
            
        }
    }
     
    }
  
 })
 startOver.addEventListener('click', ()=>{
    if (start && !fail){
        setDataToLocalStorage();

    }
     window.location.reload();
 })
  let pauseInterval;
 pause.addEventListener('click', ()=>{
   
    if(!pauseTimer){
        pauseTimer = true;
        hidingField.style.pointerEvents = 'none';
        hidingField.style.cursor = 'not-allowed';
        start = start + 1000;
        pauseInterval = setInterval(()=>{
        start = start + 1000;
    }, 1000);
    } else {
        pauseTimer = false;
        hidingField.style.pointerEvents = 'auto';
        hidingField.style.cursor = 'pointer';
        clearInterval(pauseInterval);
    }
    
 })
 rules.addEventListener('click', ()=>{
    rulesText.classList.toggle('hide');
 });
 score.addEventListener('click', ()=>{
    scoreInfo.classList.toggle('hide');
    let gameNumber = 1;
    const myStorage = window.localStorage;
    let keys = Object.keys(myStorage);
    
    keys.forEach((item)=>{
        console.log(JSON.parse(myStorage.getItem(`${item}`)).duration);
        const timeData = getTime(JSON.parse(myStorage.getItem(`${item}`)).duration);
        const element = document.createElement("div");
        element.classList.add('game_info');
        element.innerHTML = `<h4>game ${gameNumber}</h4>
        <span>продолжительность игры: ${addZero(timeData.hours)}:${addZero(timeData.minutes)}:${addZero(timeData.seconds)} </span>
        <span>steps: ${JSON.parse(myStorage.getItem(`${item}`)).steps}</span></div>`;
        gameNumber++;
        scoreInfo.append(element);
    })
 })
 window.addEventListener("load", (event) => {
    /* if (PerformanceNavigation.type == 
        performance.navigation.TYPE_RELOAD) {
        console.info( "This page is reloaded" );
      } */
      if(start) setDataToLocalStorage();

 });
})
