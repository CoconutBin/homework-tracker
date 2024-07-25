function setItemListWidth(){
    document.querySelector(':root').style.setProperty('--listItem-width', `${(window.innerWidth/Math.round(window.innerWidth/375))-40}px`);
}

setItemListWidth()
window.onresize = setItemListWidth;
