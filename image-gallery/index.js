'use strict';
const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=kIfrDzIphvPoB_0dfSwSdjpJWmj1aSRA3Jp-0n-sDZo';
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }
  getData();