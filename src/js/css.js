function setItemListWidth(){
    document.querySelector(':root').style.setProperty('--listItem-width', `${(window.innerWidth/Math.round(window.innerWidth/375))-20}px`);
}


window.onresize = setItemListWidth;
