const inputSubject = document.getElementById("inputSubject") as HTMLInputElement;
const inputSubjectID = document.getElementById("inputSubjectID") as HTMLInputElement;
const inputSubjectType = document.getElementById("inputSubjectType") as HTMLInputElement;
const inputIsGroupWork = document.getElementById("inputIsGroupWork") as HTMLInputElement;
const inputIsImportant = document.getElementById("inputIsImportant") as HTMLInputElement;
const inputDueDate = document.getElementById("inputDueDate") as HTMLInputElement;
const inputPoints = document.getElementById("inputPoints") as HTMLInputElement;
const inputDescription = document.getElementById("inputDescription") as HTMLTextAreaElement;
const allInputs = [inputSubject, inputSubjectID, inputSubjectType, inputIsGroupWork, inputDueDate, inputPoints, inputDescription]
const inputDiv = document.getElementById("inputform")
const list = document.getElementById("list")
const listContents: Homework["homeworkObject"][] = []
const localStorageListContents: Homework["homeworkObject"][] = JSON.parse(localStorage.getItem("listContents"))
const addListItemButton = document.getElementById("addListItemButton") as HTMLElement;
const editModal = document.getElementById("editModal")
const logo = document.getElementById("logo")
let localStorageLock = true

if (Storage == null) {
    alert("Your browser does not support local storage, so list items won't save when you exit the tab");
}

if (localStorageListContents != undefined && localStorageListContents.length > 0 && localStorageLock) {
    localStorageLock = false
    try {
        for (let listContent of localStorageListContents) {
            addListItem(listContent);
        }
    }
    catch {
        localStorage.setItem("listContents", null)
    }
}

addListItemButton.addEventListener("click", function () {
    inputDiv.style.display = "flex"
})

document.getElementById("inputFormCloseButton").addEventListener("click", function () {
    inputDiv.style.display = "none"
})

document.getElementById("inputFormModalBackground").addEventListener("click", function () {
    inputDiv.style.display = "none"
})


/**
 * Handles different types of input elements and returns the appropriate value.
 *
 * @param {HTMLElement} element - The input element to handle.
 * @return {string|number|boolean|Date|null} The value of the input element, or null if it is empty.
 */
function inputHandler(element) {
    switch (element.type) {
        case "text":
        case "textarea":
            return element.value != "" ? element.value : null
        case "number":
            return element.value != "" ? element.value : null
        case "checkbox":
            return element.checked
        case "date":
            return element.value != "" ? new Date(element.value) : null
        default:
            console.error("Invalid Input")
    }
}

inputDiv.addEventListener(
    "submit", function (event) {
        event.preventDefault();
        if (inputSubject.value) {
            const inputHomework = new Homework(
                {
                    name: inputHandler(inputSubject),
                    id: inputHandler(inputSubjectID),
                    type: inputHandler(inputSubjectType)
                },
                inputHandler(inputIsGroupWork),
                inputHandler(inputDueDate),
                inputHandler(inputPoints),
                inputHandler(inputDescription)
            )
            inputHomework.isImportant = inputHandler(inputIsImportant)
            for (let inputs of allInputs) {
                inputs.value = "";
                (inputs as HTMLInputElement).checked = false
            }
            addListItem(inputHomework.homeworkObject)
            inputDiv.style.display = "none"
        }
    }
)
/**
 * 
 * @param {Homework.homeworkObject} homeworkObject
 * 
 * @description adds a list item and attaches it with a details, delete and edit button
 * 
 */
function addListItem(homeworkObject: Homework["homeworkObject"]): void {

    // Homework Class Management
    /*

    const homeworkObject = homeworkClass.homeworkObject
    console.log(homeworkObject)

    */

    let homeworkStarted = homeworkObject.timeStarted != undefined ? true : false


    // List Management (Initial)

    listContents.push(homeworkObject)
    let index = listContents.indexOf(homeworkObject)
    ManageLocalStorage.update()

    // Display Management (Initial)

    const listItem = document.createElement("div")
    const displayDiv = document.createElement("div")
    const subjectNameContainer = document.createElement("div")
    const isImportant = addElement("p")
    const subjectName = addElement("p", homeworkObject.subject.name)
    const dueDate = addElement("p", `Due: ${new Date(homeworkObject.dueDate).toDateString()}`)
    const timeStarted = addElement("p", `Started ${convertToTime(Date.now() - homeworkObject.timeStarted)} ago`)
    const startHomeworkButton = addButton("Custom", null, `${homeworkStarted ? "End" : "Start"}`)
    const detailsButton = addButton("Custom", null, "Details")
    subjectName.classList.add("subjectNameText")
    isImportant.classList.add("isImportantIsGroupWork")
    isImportant.classList.add("material-symbols-outlined")
    subjectNameContainer.appendChild(isImportant)
    subjectNameContainer.appendChild(subjectName)
    displayDiv.appendChild(subjectNameContainer)
    displayDiv.appendChild(timeStarted)
    timeStarted.style.display = "none"
    if(homeworkObject.isGroupWork){
        isImportant.innerText = "group"
    } else{
        isImportant.innerText = "person"
    }
    if (new Date(homeworkObject.dueDate).toDateString() != "Invalid Date") {
        displayDiv.appendChild(dueDate)
    }
    if (homeworkObject.timeStarted > 0 && homeworkObject.timeEnded == undefined) {
        timeStarted.style.display = "block"
    }
    if (homeworkObject.timeEnded > 0) {
        timeStarted.innerText = `Finished homework in ${convertToTime(homeworkObject.timeEnded - homeworkObject.timeStarted)}`
        startHomeworkButton.value = "Archive"

        timeStarted.style.display = "block"
    }
    listItem.classList.add("listItem")
    displayDiv.classList.add("listItemDisplay")
    

    // Display Subject Name Clicking

    //Unknown Bug: homeworkObject keeps resetting



    subjectName.addEventListener("click", () => {
        switch (settings.betaFeatures.subjectNameClick) {
            case "markImportant":
                subjectName.contentEditable = "false"
                if (homeworkObject.isImportant) {
                    homeworkObject.isImportant = false
                    isImportant.style.color = "var(--text)"
                    ManageLocalStorage.replace(index, homeworkObject)
                } else {
                    homeworkObject.isImportant = true
                    isImportant.style.color = "gold"
                    ManageLocalStorage.replace(index, homeworkObject)
                }
                break;
            case "editSubjectName":
                subjectName.contentEditable = "true"
                subjectName.spellcheck = false
                subjectName.addEventListener("input", function editSubjectNameFunctionality() {
                    homeworkObject.subject.name = subjectName.textContent
                    detailsSubject.textContent = homeworkObject.subject.name
                    ManageLocalStorage.replace(index, homeworkObject)
                });
                break;
            default:
                subjectName.contentEditable = "false"
                detailsDiv.style.display = "flex";
                detailsModal.style.display = "flex";
                detailsDisplay.style.display = "block";
                break;
        }
    })


    // Start Button Functionality

    startHomeworkButton.addEventListener("click", () => {
        if (homeworkStarted == false && startHomeworkButton.value != "Archive") {
            homeworkStarted = true
            homeworkObject.timeStarted = Date.now()
            ManageLocalStorage.update()
            startHomeworkButton.value = "End"
            timeStarted.style.display = "block"
        }
        else if (homeworkStarted == true && startHomeworkButton.value != "Archive") {
            homeworkObject.timeEnded = Date.now()
            clearInterval(liveUpdateTimer)
            ManageLocalStorage.update()
            timeStarted.innerText = `Finished homework in ${convertToTime(homeworkObject.timeEnded - homeworkObject.timeStarted)}`
            startHomeworkButton.value = "Archive"
        }
        else if (startHomeworkButton.value == "Archive") {
            ManageLocalStorage.deleteListItem(homeworkObject)
            archivedHomeworks.push(homeworkObject)
            listItem.remove()
            ManageLocalStorage.update()
        }
    })

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
    if (homeworkObject.isImportant) {
        subjectName.appendChild(isImportant)
    }
    detailsPoints.appendChild(detailsPointsNumber)
    detailsDueDate.appendChild(detailsDueDateTime)

    let detailsDescriptionText
    if (homeworkObject.description.length > 0) {
        detailsDescriptionText = addElement("p", homeworkObject.description)
    }
    else {
        detailsDescriptionText = document.createElement("textarea")
        detailsDescriptionText.placeholder = "type some details here.."
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

    const detailsDeleteButton = addButton("Custom", null, "Delete")
    detailsDeleteButton.addEventListener("click", () => {
        if (!confirm("Are you sure?")) return
        ManageLocalStorage.deleteListItem(homeworkObject)
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
    displayDiv.addEventListener("click", (event) => {
        if (event.target != subjectName && event.target != startHomeworkButton) {
            detailsDiv.style.display = "flex";
            detailsModal.style.display = "flex";
            detailsDisplay.style.display = "block";
        }
    });

    detailsButton.addEventListener("click", () => {
        detailsDiv.style.display = "flex";
        detailsModal.style.display = "flex";
        detailsDisplay.style.display = "block";
    })

    //Edit Functionality

    // Subject Name
    detailsSubject.classList.add("detailsSubjectText")
    detailsSubject.contentEditable = "true"
    detailsSubject.spellcheck = false
    detailsSubject.addEventListener("input", () => {
        homeworkObject.subject.name = detailsSubject.textContent
        subjectName.textContent = homeworkObject.subject.name
        ManageLocalStorage.replace(index, homeworkObject)
    });

    //SubjectID
    detailsSubjectID.contentEditable = "true"
    detailsSubjectID.spellcheck = false
    detailsSubjectID.addEventListener("input", () => {
        homeworkObject.subject.id = detailsSubjectID.textContent
        ManageLocalStorage.replace(index, homeworkObject)
    });

    //SubjectType
    detailsSubjectType.contentEditable = "true"
    detailsSubjectType.spellcheck = false
    detailsSubjectType.addEventListener("input", () => {
        homeworkObject.subject.type = detailsSubjectType.textContent
        ManageLocalStorage.replace(index, homeworkObject)
    });

    // Due Date
    const dueDateInput = document.createElement("input")
    dueDateInput.type = "date"
    dueDateInput.style.display = "none"
    detailsDueDateTime.parentElement.appendChild(dueDateInput)
    detailsDueDateTime.addEventListener("click", () => {
        dueDateInput.style.display = "block"
        dueDateInput.addEventListener("change", () => {
            homeworkObject.dueDate = new Date(dueDateInput.value).toDateString()
            detailsDueDateTime.textContent = new Date(homeworkObject.dueDate).toDateString()
            ManageLocalStorage.replace(index, homeworkObject)
            dueDateInput.style.display = "none"
        })
    })

    // isGroupWork
    detailsIsGroupWork.addEventListener("click", () => {
        detailsIsGroupWork.textContent = (detailsIsGroupWork.textContent == "Group Work") ? "Not Group Work" : "Group Work"
        homeworkObject.isGroupWork = !homeworkObject.isGroupWork
        ManageLocalStorage.replace(index, homeworkObject)
        if (homeworkObject.isGroupWork) {
            detailsIsGroupWork.style.color = "var(--success)"
            detailsIsGroupWork.style.userSelect = "none"
        }
        else {
            detailsIsGroupWork.style.color = "var(--error)";
            detailsIsGroupWork.style.userSelect = "none"
        }
    })

    // Points
    detailsPointsNumber.contentEditable = "true"
    detailsPointsNumber.addEventListener("input", () => {
        if (detailsPointsNumber.textContent.length > 0 && !isNaN(parseInt(detailsPointsNumber.textContent))) {
            homeworkObject.points = detailsPointsNumber.textContent
            ManageLocalStorage.replace(index, homeworkObject)
        }
        else if (detailsPointsNumber.textContent.length == 0 || detailsPointsNumber.textContent == "") {
            homeworkObject.points = "0"
            ManageLocalStorage.replace(index, homeworkObject)
        }
        else {
            detailsPointsNumber.textContent = homeworkObject.points
        }

    })


    // Description
    if (detailsDescriptionText.nodeName == "TEXTAREA") {
        detailsDescriptionText.addEventListener("input", () => {
            homeworkObject.description = detailsDescriptionText.value
            ManageLocalStorage.replace(index, homeworkObject)
        })
    }
    else {
        detailsDescriptionText.contentEditable = "true"
        detailsDescriptionText.addEventListener("input", () => {
            homeworkObject.description = detailsDescriptionText.textContent
            ManageLocalStorage.replace(index, homeworkObject)
        });
    }

    //updating time
    const liveUpdateTimer = setInterval(() => {
        timeStarted.innerText = `Started ${convertToTime(Date.now() - homeworkObject.timeStarted)} ago`
    }, 1000)

    if (homeworkObject.timeEnded != undefined) {
        clearInterval(liveUpdateTimer)
    }

    //appending to list element
    displayDiv.appendChild(startHomeworkButton)
    displayDiv.appendChild(detailsButton)
    list.appendChild(listItem)
}

function clearList() {
    listContents.splice(0, listContents.length);
    localStorage.setItem("listContents", JSON.stringify(listContents));
    list.innerHTML = `<div class="listItem" id="addListItemButton">
            <div class="listItemDisplay"><h1><span class="material-symbols-outlined" style="font-size: 48px;">add</span></h1></div>
        </div>`;
}

