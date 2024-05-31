const inputSubject = document.getElementById("inputSubject")
const inputSubjectID = document.getElementById("inputSubjectID")
const inputSubjectType = document.getElementById("inputSubjectType")
const inputIsGroupWork = document.getElementById("inputIsGroupWork")
const inputDueDate = document.getElementById("inputDueDate")
const inputPoints = document.getElementById("inputPoints")
const inputDescription = document.getElementById("inputDescription")
const allInputs = [inputSubject, inputSubjectID, inputSubjectType, inputIsGroupWork, inputDueDate, inputPoints, inputDescription]
const inputDiv = document.getElementById("inputform")
const list = document.getElementById("list")
const listContents = []
const localStorageListContents = JSON.parse(localStorage.getItem("listContents"))
const addListItemButton = document.getElementById("addListItemButton")
const editModal = document.getElementById("editModal")
const editSubject = document.getElementById("editSubject")
const editSubjectID = document.getElementById("editSubjectID")
const editSubjectType = document.getElementById("editSubjectType")
const editIsGroupWork = document.getElementById("editIsGroupWork")
const editDueDate = document.getElementById("editDueDate")
const editPoints = document.getElementById("editPoints")
const editDescription = document.getElementById("editDescription")
const allEdits = [editSubject, editSubjectID, editSubjectType, editIsGroupWork, editDueDate, editPoints, editDescription]
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
            for (inputs of allInputs) {
                inputs.value = ""
                inputs.checked = false
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
function addListItem(homeworkObject) {

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
    const subjectName = addElement("h2", homeworkObject.subject.name)
    const startHomeworkButton = addButton("Custom", null, `${homeworkStarted ? "End" : "Start"}`)
    subjectName.classList.add("subjectName")
    displayDiv.appendChild(subjectName)
    listItem.classList.add("listItem")
    displayDiv.classList.add("listItemDisplay")

    // Start Button Functionality

    startHomeworkButton.addEventListener("click", () => {
        console.log(homeworkStarted)
        if (homeworkStarted == false) {
            homeworkStarted = true
            homeworkObject.timeStarted = Date.now()
            ManageLocalStorage.update()
            startHomeworkButton.value = "End"
        }
        else if (homeworkStarted == true) {
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
    const detailsPointsNumber = addElement("span", `${homeworkObject.points > 0 ? homeworkObject.points : "None"}`)
    const detailsPoints = addElement("p", `Points: `)
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

    detailsDiv.style.display = "none"
    detailsDiv.appendChild(detailsDisplay)
    detailsDiv.appendChild(detailsModal)
    detailsDisplay.appendChild(addButton("Delete", listItem))
    detailsDisplay.appendChild(addButton("Close", detailsDiv))
    listItem.appendChild(displayDiv)
    listItem.appendChild(detailsDiv)

    //Clicking for Details
    displayDiv.addEventListener("click", (event) => {
        if (event.target != startHomeworkButton) {
            detailsDiv.style.display = "flex";
            detailsModal.style.display = "flex";
            detailsDisplay.style.display = "block";
        }
    });

    //Edit Functionality

    // Subject Name
    detailsSubject.classList.add("detailsSubjectText")
    detailsSubject.contentEditable = "true"
    detailsSubject.spellCheck = "false"
    detailsSubject.addEventListener("input", () => {
        homeworkObject.subject.name = detailsSubject.textContent
        subjectName.textContent = homeworkObject.subject.name
        ManageLocalStorage.replace(index, homeworkObject)
    });

    //SubjectID
    detailsSubjectID.contentEditable = "true"
    detailsSubjectID.spellCheck = "false"
    detailsSubjectID.addEventListener("input", () => {
        homeworkObject.subject.id = detailsSubjectID.textContent
        ManageLocalStorage.replace(index, homeworkObject)
    });

    //SubjectType
    detailsSubjectType.contentEditable = "true"
    detailsSubjectType.spellCheck = "false"
    detailsSubjectType.addEventListener("input", () => {
        homeworkObject.subject.type = detailsSubjectType.textContent
        ManageLocalStorage.replace(index, homeworkObject)
    });

    // Due Date
    detailsDueDateTime.addEventListener("click", () => {
        const dueDateInput = document.createElement("input")
        dueDateInput.type = "date"
        dueDateInput.style.display = "block"
        detailsDueDateTime.parentElement.appendChild(dueDateInput)
        dueDateInput.value = new Date(homeworkObject.dueDate).toDateString()
        dueDateInput.addEventListener("change", () => {
            homeworkObject.dueDate = new Date(dueDateInput.value).getTime()
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
            detailsIsGroupWork.style.color = "green"
            detailsIsGroupWork.style.userSelect = "none"
        }
        else {
            detailsIsGroupWork.style.color = "var(--error)";
            detailsIsGroupWork.style.userSelect = "none"
        }
    })

    // Points
    detailsPointsNumber.contentEditable = true
    detailsPointsNumber.addEventListener("input", () => {
        if (detailsPointsNumber.textContent > 0) {
            homeworkObject.points = detailsPointsNumber.textContent
            ManageLocalStorage.replace(index, homeworkObject)
        }
        else if (detailsPointsNumber.textContent == 0 || detailsPointsNumber.textContent == "") {
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


    //appending to list element
    displayDiv.appendChild(startHomeworkButton)
    list.appendChild(listItem)
}

function clearList() {
    listContents.splice(0, listContents.length);
    localStorage.setItem("listContents", JSON.stringify(listContents));
    list.innerHTML = "";
}

function addButton(type, affectedElement, customValue) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = type;
    switch (type) {
        case "Close":
            button.addEventListener("click", () => {
                affectedElement.style.display = "none"
            })
            break;
        case "Delete":
            button.addEventListener("click", () => {
                affectedElement.remove()
                ManageLocalStorage.delete(affectedElement)
            })
            break;
        case "Custom":
            break;
        default:
            console.error("Invalid Input")
    }

    if (customValue != undefined) {
        button.value = customValue
    }

    return button
}

function addElement(elementType, innerText) {
    let element = document.createElement(elementType)
    if (innerText != undefined) {
        element.textContent = innerText
    }
    return element
}