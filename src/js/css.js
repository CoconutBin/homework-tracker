function setItemListWidth(){
    document.querySelector(':root').style.setProperty('--listItem-width', `${(window.innerWidth/Math.round(window.innerWidth/375))-40}px`);

    if(window.innerWidth < 385){
        document.getElementById('logo').innerText = 'wrkd.'
    } else if(document.querySelector('title').textContent == 'Homework Tracker'){
        document.getElementById('logo').innerText = 'Homework Tracker'
    } else {
            document.getElementById('logo').innerText = 'Archived Homeworks'
        }
}

setItemListWidth()
window.onresize = setItemListWidth;