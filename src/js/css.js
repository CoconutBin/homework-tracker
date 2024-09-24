function setItemListWidth(){
    document.querySelector(':root').style.setProperty('--listItem-width', `${(window.innerWidth/Math.round(window.innerWidth/375))-40}px`);

    if(window.innerWidth < 455){
        if(window.innerWidth < 380){
            document.getElementById('sort').style.display = 'none';
        } else { document.getElementById('sort').style.display = 'block'; }
        document.getElementById('logo').innerText = 'wrkd.'
    } else if(document.querySelector('title').textContent == 'Homework Tracker'){
        document.getElementById('logo').innerText = 'Homework Tracker'
    } else {
            document.getElementById('logo').innerText = 'Archived Homeworks'
        }
}

setItemListWidth()
setNoArchivedHomeworksMessage()
window.onresize = setItemListWidth;

function setNoArchivedHomeworksMessage(){
    if(archivedHomeworks.length == 0 && document.querySelector('title').textContent != 'Homework Tracker'){
        const noArchivedHomeworksMessage = document.createElement('h1')
        noArchivedHomeworksMessage.textContent = "There are no archived homeworks"
        noArchivedHomeworksMessage.style.fontSize = "30px"
        noArchivedHomeworksMessage.style.textAlign = "center"
        noArchivedHomeworksMessage.style.alignContent = "center"
        noArchivedHomeworksMessage.style.margin = "auto"
        noArchivedHomeworksMessage.style.padding = "10px"
        noArchivedHomeworksMessage.style.color = "var(--text)"
        noArchivedHomeworksMessage.style.opacity = "0.7"
        document.getElementById('list').appendChild(noArchivedHomeworksMessage)
        document.getElementById('list').style.height = "calc(90vh - 20px)"
    }

    if(listContents.length == 0 && document.querySelector('title').textContent != 'Homework Tracker (Archived Homeworks)'){
        const noHomeworksMessage = document.createElement('h1')
        noHomeworksMessage.textContent = "There are no homeworks"
        noHomeworksMessage.style.fontSize = "30px"
        noHomeworksMessage.style.textAlign = "center"
        noHomeworksMessage.style.alignContent = "center"
        noHomeworksMessage.style.margin = "auto"
        noHomeworksMessage.style.padding = "10px"
        noHomeworksMessage.style.color = "var(--text)"
        noHomeworksMessage.style.opacity = "0.7"
        noHomeworksMessage.id = "noHomeworksMessage"
        document.getElementById('list').appendChild(noHomeworksMessage)
        document.getElementById('list').style.height = "calc(90vh - 20px)"
    }
}