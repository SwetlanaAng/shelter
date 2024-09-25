`use strict`;
document.addEventListener("DOMContentLoaded", function(){
  const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo';
  const container = document.querySelector('.container'),
  cross = document.querySelector('.cross_loupe'),
  input = document.querySelector('.search>input'),
  body = document.querySelector('body'),
  wrapper = document.querySelector('.wrapper');
  let arrData = [];
  const getIdToShowModel = () => {
    const images = document.querySelectorAll('.image');
    images.forEach((item) => {
      item.addEventListener('click', (event) => {
        showModal(event.target.id);
      })
    })
  }
  const showModal = (id) => {
    arrData.forEach((item) => {
      if(item.id === id){
        const modalBg = document.createElement('div');
        modalBg.classList.add('modal_bg');
        modalBg.classList.add('hide');
        wrapper.append(modalBg);
        modalBg.style.top = `${document.documentElement.scrollTop}px`;
        const element = document.createElement('div');
        element.classList.add('modal_image'); 
        modalBg.classList.toggle('hide');
        body.style.overflow = 'hidden';
        element.innerHTML = `<div class="modal_info">
            <div class="modal_text">Author: ${item.user.name}</div>
            <div class="modal_cross">x</div>
        </div><div class="i"><img src="${item.urls.regular}" alt=""></div>`;
        modalBg.append(element);
        const modalCross = document.querySelector('.modal_cross');
        modalCross.addEventListener('click', closeModal);
        modalBg.addEventListener('click', (e) => {
          console.log(e)
          if (e.target.nodeName !== 'IMG') closeModal();
        });
      }
    })
  }
  const closeModal = () => {
      wrapper.innerHTML = '';
      body.style.overflow = 'auto';
  }

  const pushImgOnPage = (item) => {
        const element = document.createElement('div');
        element.classList.add('image');
        element.id = item.id;
        element.style.backgroundImage = `url("${item.urls.regular}")`;
        container.append(element);
    }
  async function getData(path) {
      const res = await fetch(path);
      const data = await res.json();
      arrData = data.results;
      data.results.forEach((item) => pushImgOnPage(item));
      getIdToShowModel();
    }
  getData(url);

  input.addEventListener('input', () => {
    if (cross.innerHTML === '' & input.value === '') cross.innerHTML = '<img src="./img/694985.png" alt="loupe"></img>';
    else cross.innerHTML = '';
  })

  input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13){
      container.innerHTML = '';
      const url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=30&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo`;
      getData(url);
    }
  })
})
console.log(`Ваша оценка - 70 баллов 
Отзыв по пунктам ТЗ:
Выполненные пункты:
1) на странице есть несколько фото и строка поиска 

2) в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс 

3) При загрузке приложения на странице отображаются полученные от API изображения 

4) Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API 

5) при открытии приложения курсор находится в поле ввода 

6) есть placeholder 

7) автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) 

8) поисковый запрос можно отправить нажатием клавиши Enter 

9) после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода 

10) в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder 

11) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения 

`)

