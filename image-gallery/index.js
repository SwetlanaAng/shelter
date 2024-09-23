'use strict';
const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo';
const container = document.querySelector('.container');
const pushImgOnPage = (item) =>{
        const element = document.createElement('div');
        element.classList.add('image');
        element.innerHTML = `<img src="${item.urls.regular}" alt="${item.alt_description}">`;
        console.log(element);
        container.append(element);
  }
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    data.results.forEach((item)=>pushImgOnPage(item));
  }
  getData();
  