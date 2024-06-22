const archiveList = document.getElementById("list")

if(archivedHomeworks.length > 0) {
    for(let homeworkObject of archivedHomeworks) {
        addArchiveListItem(homeworkObject)
    }
}

function addArchiveListItem(homeworkObject: Homework["homeworkObject"]): void {

    // Display Management (Initial)

    const listItem = document.createElement("div")
    const displayDiv = document.createElement("div")
    const subjectNameContainer = document.createElement("div")
    const isImportant = addElement("p")
    const subjectName = addElement("p", homeworkObject.subject.name)
    const dueDate = addElement("p", `Due: ${new Date(homeworkObject.dueDate).toDateString()}`)
    const timeUsed = addElement("p", `Homework finished in ${convertToTime(homeworkObject.timeEnded - homeworkObject.timeStarted)}`)
    subjectNameContainer.classList.add("subjectNameContainer")
    subjectName.classList.add("subjectNameText")
    isImportant.classList.add("isImportantIsGroupWork")
    isImportant.classList.add("material-symbols-outlined")
    subjectNameContainer.appendChild(isImportant)
    subjectNameContainer.appendChild(subjectName)
    displayDiv.appendChild(subjectNameContainer)
    displayDiv.appendChild(timeUsed)
    if(homeworkObject.isGroupWork){
        isImportant.innerText = "group"
    } else{
        isImportant.innerText = "person"
    }
    if (new Date(homeworkObject.dueDate).toDateString() != "Invalid Date") {
        displayDiv.appendChild(dueDate)
    }
    listItem.classList.add("listItem")
    displayDiv.classList.add("listItemDisplay")

    // Details Display Management

    const detailsModal = document.createElement("div")
    const detailsDisplay = document.createElement("div")
    const detailsDiv = document.createElement("div")

    const detailsSubject = addElement("h2", homeworkObject.subject.name)
    const detailsSubjectDetails = document.createElement("p")
    const detailsSubjectID = addElement("span", homeworkObject.subject.id)
    const detailsSubjectType = addElement("span", homeworkObject.subject.type)
    const detailsIsGroupWork = addElement("p", homeworkObject.isGroupWork ? "Group Work" : "Not Group Work")
    const detailsDueDate = addElement("p", `Due Date: `)
    const detailsDueDateTime = addElement("span", `${new Date(homeworkObject.dueDate).toDateString() == "Invalid Date" ? "None" : new Date(homeworkObject.dueDate).toDateString()}`)
    const detailsPointsNumber = addElement("span", `${parseInt(homeworkObject.points) > 0 ? homeworkObject.points : "None"}`)
    const detailsPoints = addElement("p", `Points: `)
    detailsPoints.appendChild(detailsPointsNumber)
    detailsDueDate.appendChild(detailsDueDateTime)

    const detailsDescriptionText = homeworkObject.description.length > 0? addElement("p", homeworkObject.description):addElement("p", "No details")
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
        enableScroll();
    })

    //Display Management (Final)
    const detailsDeleteButton = addButton("Custom", null, "Delete")
    detailsDeleteButton.addEventListener("click", () => {
        if(!confirm("Are you sure?")) return
        ManageLocalStorage.deleteArchived(homeworkObject)
        listItem.remove();
    })
    detailsDiv.style.display = "none"
    detailsDiv.appendChild(detailsDisplay)
    detailsDiv.appendChild(detailsModal)
    detailsDisplay.appendChild(detailsDeleteButton)
    detailsDisplay.appendChild(addButton("Close", detailsDiv))
    listItem.appendChild(displayDiv)
    listItem.appendChild(detailsDiv)

    //Clicking for Details
    displayDiv.addEventListener("click", () => {
            detailsDiv.style.display = "flex";
            detailsModal.style.display = "flex";
            detailsDisplay.style.display = "block";
            disableScroll()
    });

    //appending to list element
    list.appendChild(listItem)
}