const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo';
const container = document.querySelector('.container'),
cross = document.querySelector('.cross_loupe'),
input = document.querySelector('.search>input'),
logoImg = document.querySelector('.logo_img'),
body = document.querySelector('body'),
wrapper = document.querySelector('.wrapper');
let arrData = [];
const getId = () => {
  const images = document.querySelectorAll('.image');
  console.log(images)
  images.forEach((item) => {
    item.addEventListener('click', (event)=>{
      console.log(event);
      showModal(event.target.id);
    })
  })
}
const showModal = (id) => {
  arrData.forEach((item)=>{
    if(item.id === id){
      const modalBg = document.createElement('div');
       modalBg.classList.add('modal_bg');
       modalBg.classList.add('hide');
       wrapper.append(modalBg);
      const element = document.createElement('div');
        element.classList.add('modal_image'); 
        modalBg.classList.toggle('hide');
        body.style.overflow = 'hidden';
        element.innerHTML = `<div class="modal_info">
            <div class="modal_text">Author: ${item.user.name}</div>
            <div class="modal_cross">x</div>
        </div><img src="${item.urls.regular}" alt="">
        `;
        wrapper.append(element);
        const modalCross = document.querySelector('.modal_cross');
        modalCross.addEventListener('click', closeModal);
        modalBg.addEventListener('click', closeModal);
    }
  })
}
const closeModal = () => {
    wrapper.innerHTML = '';
    //modalBg.classList.toggle('hide');
    body.style.overflow = 'auto';
}


const pushImgOnPage = (item) =>{
        const element = document.createElement('div');
        element.classList.add('image');
        element.id = item.id;
        element.style.backgroundImage = `url("${item.urls.regular}")`;
        container.append(element);
  }
async function getData(path) {
    const res = await fetch(path);
    const data = await res.json();
    console.log(data);
    arrData = data.results;
    data.results.forEach((item)=>pushImgOnPage(item));
    getId();
  }
  getData(url);

input.addEventListener('change', () =>{
  cross.innerHTML = '';
  //logoImg.innerHTML = '<img src="./img/cross.svg" alt="cross">';
})
input.addEventListener('keypress',  (e) =>{
  if (e.keyCode === 13){
    
    container.innerHTML = '';
    const url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=30&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo`;
    getData(url);
  }
})
cross.addEventListener('click', () =>{});


