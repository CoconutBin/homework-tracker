function setItemListWidth(){
    document.querySelector(':root').style.setProperty('--listItem-width', `${(window.innerWidth/Math.round(window.innerWidth/375))-40}px`);
    if(window.innerWidth < 385){
        document.getElementById('logo').innerText = 'wrkd.'
    } else {
        document.getElementById('logo').innerText = 'Homework Tracker'
    }
    
}

setItemListWidth()
window.onresize = setItemListWidth;