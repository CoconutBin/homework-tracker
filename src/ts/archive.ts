const archiveList = document.getElementById("list")
const archiveCountElement = document.getElementById("archiveCount");
const archiveTime = document.getElementById("archiveTime");
const archiveGroupRatio = document.getElementById("archiveGroupRatio");

if (archivedHomeworks.length > 0) {
    for (let homeworkObject of archivedHomeworks) {
        addArchiveListItem(homeworkObject)
    }
}

function updateArchiveCount() {
    archiveCountElement.textContent = archivedHomeworks.length.toString();
}
updateArchiveCount();

function updateArchiveTime() {
    let archiveAddedTime = 0
    for(let homeworkObject of archivedHomeworks) {
        archiveAddedTime += homeworkObject.timeEnded - homeworkObject.timeStarted;
    } 
    archiveTime.textContent = convertToTime(archiveAddedTime/archivedHomeworks.length)
}
updateArchiveTime();

function updateArchiveGroupRatio() {
    let groupCount = 0
    let personCount = 0
    for (let homeworkObject of archivedHomeworks) {
        if (homeworkObject.isGroupWork) {
            groupCount++
        } else {
            personCount++
        }
    }
    archiveGroupRatio.textContent = `${groupCount}:${groupCount + personCount}`
}
updateArchiveGroupRatio();

function addArchiveListItem(homeworkObject: Homework["homeworkObject"]): void {
    // Display Management (Initial)

    const listItem = document.createElement("div")
    const displayDiv = document.createElement("div")
    const subjectNameContainer = document.createElement("div")
    const isImportant = addElement("p")
    const subjectName = addElement("p", homeworkObject.subject.name)
    const dueDate = addElement("p", `Due: ${new Date(homeworkObject.dueDate).toDateString()}`)
    const timeStarted = addElement("p", `Started ${convertToTime(Date.now() - homeworkObject.timeStarted)} ago`)
    subjectNameContainer.classList.add("subjectNameContainer")
    subjectName.classList.add("subjectNameText")
    isImportant.classList.add("isImportantIsGroupWork")
    isImportant.classList.add("material-symbols-outlined")
    subjectNameContainer.appendChild(isImportant)
    subjectNameContainer.appendChild(subjectName)
    displayDiv.appendChild(subjectNameContainer)
    displayDiv.appendChild(timeStarted)
    timeStarted.style.display = "none"
    if (homeworkObject.isGroupWork) {
        isImportant.innerText = "group"
    } else {
        isImportant.innerText = "person"
    }
    if (homeworkObject.isImportant) {
        isImportant.style.color = "var(--accent)"
    }
    if (new Date(homeworkObject.dueDate).toDateString() != "Invalid Date") {
        displayDiv.appendChild(dueDate)
    }
    if (homeworkObject.timeStarted > 0 && homeworkObject.timeEnded == undefined) {
        timeStarted.style.display = "block"
    }
    if (homeworkObject.timeEnded > 0) {
        timeStarted.innerText = `Finished homework in ${convertToTime(homeworkObject.timeEnded - homeworkObject.timeStarted)}`
        timeStarted.style.display = "block"
    }
    listItem.classList.add("listItem")
    displayDiv.classList.add("listItemDisplay")
    

// Function to add a new archived homework item


    // Details Display Management

    const detailsModal = document.createElement("div")
    const detailsDisplay = document.createElement("div")
    const detailsDiv = document.createElement("div")

    const detailsSubject = addElement("p", homeworkObject.subject.name)
    const detailsSubjectDetails = document.createElement("p")
    const detailsSubjectID = addElement("span", homeworkObject.subject.id)
    const detailsSubjectType = addElement("span", homeworkObject.subject.type)
    const detailsIsGroupWork = addElement("p", homeworkObject.isGroupWork ? "Group Work" : "Not Group Work")
    const detailsDueDate = addElement("p", `Due Date: `)
    const detailsDueDateTime = addElement("span", `${new Date(homeworkObject.dueDate).toDateString() == "Invalid Date" ? "None" : new Date(homeworkObject.dueDate).toDateString()}`)
    const detailsPointsNumber = addElement("span", `${parseInt(homeworkObject.points) > 0 ? homeworkObject.points : "None"}`)
    const detailsPoints = addElement("p", `Points: `)
    detailsPoints.appendChild(detailsPointsNumber)
    detailsSubject.classList.add("detailsSubjectNameText")
    detailsDueDate.appendChild(detailsDueDateTime)

    const detailsDescriptionText = addElement("p", homeworkObject.description)
    if (homeworkObject.description.length < 0 || homeworkObject.description == undefined) {
        detailsDescriptionText.innerText = "No Details"
    }
    const detailsDescription = addElement("p", `Details:`)
    detailsDescription.appendChild(document.createElement("br"))
    detailsDescription.appendChild(detailsDescriptionText)

    if (homeworkObject.subject.id != undefined && homeworkObject.subject.type != undefined) {
        detailsSubjectDetails.append(detailsSubjectID, "/", detailsSubjectType)
    }
    else if (homeworkObject.subject.id != undefined) {
        detailsSubjectDetails.appendChild(detailsSubjectID)
    }
    else if (homeworkObject.subject.type != undefined) {
        detailsSubjectDetails.appendChild(detailsSubjectType)
    }
    else {
        detailsSubjectDetails.innerHTML = null
    }

    //Details Modal

    detailsModal.classList.add("modal")
    detailsDisplay.classList.add("detailsDisplay")
    detailsDisplay.appendChild(detailsSubject)
    if (detailsSubjectDetails.innerHTML != null && detailsSubjectDetails.innerHTML.length > 0) {
        detailsDisplay.appendChild(detailsSubjectDetails)
    }
    detailsDisplay.appendChild(detailsDueDate)
    detailsDisplay.appendChild(detailsIsGroupWork)
    detailsDisplay.appendChild(detailsPoints)
    detailsDisplay.appendChild(detailsDescription)

    detailsModal.addEventListener("click", () => {
        detailsModal.style.display = "none";
        detailsDisplay.style.display = "none";
        detailsDiv.style.display = "none";
    })

    //Display Management (Final)

    const restoreButton = addButton("Custom", null, "Restore")
    restoreButton.addEventListener("click", () => {
        if(!confirm("Do you want to restore this homework?")) return
        let listContents = (JSON.parse(localStorage.getItem("listContents")))
        listContents.push(homeworkObject)
        localStorage.setItem("listContents", JSON.stringify(listContents))
        ManageLocalStorage.deleteArchived(homeworkObject)
        listItem.remove();
        updateArchiveCount();
    })

    const detailsDeleteButton = addButton("Custom", null, "Delete")
    detailsDeleteButton.addEventListener("click", () => {
        if (!confirm("Are you sure?")) return
        ManageLocalStorage.deleteArchived(homeworkObject)
        listItem.remove();
        updateArchiveCount();
    })
    detailsDiv.style.display = "none"
    detailsDiv.appendChild(detailsDisplay)
    detailsDiv.appendChild(detailsModal)
    detailsDisplay.appendChild(detailsDeleteButton)
    detailsDisplay.appendChild(restoreButton)
    detailsDisplay.appendChild(addButton("Close", detailsDiv))
    listItem.appendChild(displayDiv)
    listItem.appendChild(detailsDiv)

    //Clicking for Details
    displayDiv.addEventListener("click", (event) => {
        if (event.target != subjectName) {
            detailsDiv.style.display = "flex";
            detailsModal.style.display = "flex";
            detailsDisplay.style.display = "block";
        }
    });

    //appending to list element
    list.appendChild(listItem)
    updateArchiveCount();
}

function clearArchiveList() {
    if(confirm("Are you sure you want to delete all archived homeworks?")){
        archivedHomeworks.splice(0, archivedHomeworks.length);
        localStorage.setItem("archivedHomeworks", JSON.stringify(archivedHomeworks));
        list.innerHTML = ``;
        updateArchiveCount();
    }
}

