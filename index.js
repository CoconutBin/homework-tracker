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
const storedlistContents = JSON.parse(localStorage.getItem("listContents")) ?? []
const editModal = document.getElementById("editModal")
const editSubject = document.getElementById("editSubject")
const editSubjectID = document.getElementById("editSubjectID")
const editSubjectType = document.getElementById("editSubjectType")
const editIsGroupWork = document.getElementById("editIsGroupWork")
const editDueDate = document.getElementById("editDueDate")
const editPoints = document.getElementById("editPoints")
const editDescription = document.getElementById("editDescription")
const allEdits = [editSubject, editSubjectID, editSubjectType, editIsGroupWork, editDueDate, editPoints, editDescription]


if (Storage == null) {
    alert("Your browser does not support local storage, so list items won't save when you exit the tab");
}

if (localStorage.getItem("version") !== "2.1b") {
    localStorage.clear()
}

localStorage.setItem("version", "2.1b")

if (storedlistContents != null && storedlistContents.length > 0) {
    for (let i = 0; i < storedlistContents.length; i++) {
        addListItem(storedlistContents[i]);
    }
}

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

function closeModal(element) {
    element.style.display = "none"
}

inputDiv.addEventListener(
    "submit", function (event) {
        event.preventDefault();
        if (inputSubject.value) {
            const inputHomework = new Homework(
                inputHandler(inputSubject),
                inputHandler(inputSubjectID),
                inputHandler(inputSubjectType),
                inputHandler(inputIsGroupWork),
                inputHandler(inputDueDate),
                inputHandler(inputPoints),
                inputHandler(inputDescription)
            )
            for (inputs of allInputs) {
                inputs.value = ""
                inputs.checked = false
            }
            listContents.push(inputHomework.homeworkObject)
            ManageLocalStorage.update()
            addListItem(inputHomework.homeworkObject)
        }
    }
)

class ManageLocalStorage {
    static update() {
        localStorage.setItem("listContents", JSON.stringify(listContents))
    }
    static delete(listItem) {
        listContents.splice(listContents.indexOf(listItem), 1)
        ManageLocalStorage.update()
    }

    static replace(index, updatedListItem) {
        listContents.splice(index, 1, updatedListItem)
        ManageLocalStorage.update()
    }
}
/**
 * 
 * @param {homework.homeworkObject} homeworkObject 
 * 
 * @description adds a list item and attaches it with a details, delete and edit button
 * 
 */
function addListItem(homeworkObject) {
    const listItem = document.createElement("div")
    const displayDiv = document.createElement("div")
    const subjectName = document.createElement("h1")
    const subjectID = document.createElement("h2")
    const subjectType = document.createElement("h2")
    const dueDate = document.createElement("h3")
    const points = document.createElement("h3")
    const isGroupWork = document.createElement("h3")
    const description = document.createElement("p")
    const detailsButton = document.createElement("input")
    const deleteButton = document.createElement("input")
    const editButton = document.createElement("input")
    const closeDetailButton = document.createElement("input")
    let listItemIndex

    //Main Div
    listItem.classList.add("listItem")

    //Displaying Text Item
    subjectName.textContent = homeworkObject.subject.name
    displayDiv.appendChild(subjectName)
    displayDiv.classList.add("listItem")
    subjectID.textContent = homeworkObject.subject.id
    subjectType.textContent = homeworkObject.subject.type
    dueDate.textContent = homeworkObject.dueDate
    points.textContent = homeworkObject.points
    isGroupWork.textContent = homeworkObject.isGroupWork == true ? "Group Work" : "Not Group Work"
    description.textContent = homeworkObject.description

    //Delete Button
    deleteButton.type = "button"
    deleteButton.classList.add("button")
    deleteButton.value = "Delete"
    deleteButton.addEventListener(
        "click", function () {
            ManageLocalStorage.delete(homeworkObject)
            listItem.remove()
        }
    )
    listItem.appendChild(deleteButton)

    //Edit Modal
    editModal.addEventListener(
        "submit", function (event) {
            event.preventDefault();
            if (editSubject.value != "") {
                subjectName.textContent = editSubject.value
                homeworkObject.subject.name = editSubject.value
                homeworkObject.subject.id = editSubjectID.value
                homeworkObject.subject.type = editSubjectType.value
                homeworkObject.isGroupWork = editIsGroupWork.value
                homeworkObject.dueDate = editDueDate.value
                homeworkObject.points = editPoints.value
                homeworkObject.description = editDescription.value
                ManageLocalStorage.replace(listItemIndex, homeworkObject)
                ManageLocalStorage.update()
                editModal.style.display = "none"
            }

        }
    )


    //Edit Button
    editButton.type = "button"
    editButton.classList.add("button")
    editButton.value = "Edit"
    editButton.addEventListener(
        "click", function () {
            editModal.style.display = "flex"
            editSubject.value = homeworkObject.subject.name
            editSubjectID.value = homeworkObject.subject.id ?? ""
            editSubjectType.value = homeworkObject.subject.type ?? ""
            editIsGroupWork.value = homeworkObject.isGroupWork ?? ""
            editDueDate.value = homeworkObject.dueDate ?? ""
            editPoints.value = homeworkObject.points ?? ""
            editDescription.value = homeworkObject.description ?? ""
            listItemIndex = listContents.indexOf(homeworkObject)
        }
    )
    listItem.appendChild(editButton)
    listItem.appendChild(editModal)

    //Details Modal
    const detailsModal = document.createElement("div")
    const detailsDisplay = document.createElement("div")
    let subjectSubData
    if (homeworkObject.subject.id != undefined && homeworkObject.subject.type != undefined) {
        subjectSubData = `${homeworkObject.subject.id}/${homeworkObject.subject.type}`
    }
    else if (homeworkObject.subject.id || homeworkObject.subject.type) {
        if (homeworkObject.subject.id) {
            subjectSubData = homeworkObject.subject.id
        }
        else {
            subjectSubData = homeworkObject.subject.type
        }
    }
    else {
        subjectSubData = null
    }

    closeDetailButton.type = "button"
    closeDetailButton.value = "Close"
    closeDetailButton.classList.add("button")
    closeDetailButton.addEventListener(
        "click", function () {
            closeModal(closeDetailButton.parentElement)
        }
    )
    detailsModal.classList.add("modal")
    detailsDisplay.classList.add("listItem")
    detailsDisplay.innerHTML =
        `
    <h1>${homeworkObject.subject.name}</h1>
    ${subjectSubData != undefined ? "<p>" + subjectSubData + "</p>" : ""}
    <p>Due: ${homeworkObject.dueDate}</p>
    <p>${homeworkObject.points > 0 ? homeworkObject.points : "No"} Points</p>
    <p>${homeworkObject.isGroupWork == true ? "Group Work" : "Not Group Work"}</p>
    <p>Details:<p>
    <p>${homeworkObject.description}</p><br>
        `
    detailsModal.appendChild(detailsDisplay)
    detailsModal.appendChild(editButton)
    detailsModal.appendChild(deleteButton)
    detailsModal.appendChild(closeDetailButton)
    listItem.appendChild(detailsModal)
    listItem.appendChild(displayDiv)

    //Clicking for Details
    displayDiv.addEventListener("click", function (event) {
        // Check if clicked element is the close button
        if (event.target !== closeDetailButton) {
          // Your desired action for clicking listItem (e.g., open details)
          detailsModal.style.display = "flex";
        }
      });

    listContents.push(homeworkObject)

    //appending to list element
    list.appendChild(listItem)
}

function clearList() {
    listContents.splice(0, listContents.length);
    localStorage.setItem("listContents", JSON.stringify(listContents));
    list.innerHTML = "";
}

//To do: Changing the to-do list to a homework list
class Homework {
    constructor(subjectName = null, subjectID, subjectType, isGroupWork, dueDate, points, description) {
        this.subjectName = subjectName ?? undefined
        this.subjectID = subjectID ?? undefined
        this.subjectType = subjectType ?? undefined
        this.isGroupWork = isGroupWork ?? false
        this.dueDate = dueDate ?? "Unknown"
        this.description = description ?? ""
        this.points = points ?? undefined
    }

    start() {
        this.timeStarted = Date.now()
    }

    get subject() {
        return {
            id: this.subjectID,
            name: this.subjectName,
            type: this.subjectType,
        };
    }

    get homeworkObject() {
        return {
            subject: this.subject,
            isGroupWork: this.isGroupWork,
            dueDate: this.dueDate,
            description: this.description,
            points: this.points,
            timeStarted: this.timeStarted
        }
    }

    set homeworkObject(obj) {
        this.subject = obj.subject
        this.isGroupWork = obj.isGroupWork
        this.dueDate = obj.dueDate
        this.description = obj.description
        this.points = obj.points
        this.timeStarted = obj.timeStarted
    }

    set subject(obj) {
        this.subjectID = obj.id
        this.subjectName = obj.name
        this.subjectType = obj.type
    }
}

/*
{
    "subject": {
        "id": "",
        "name": "",
        "type": "",
    }
    "isGroupWork": false,
    "dueDate": "",
    "description": "",
    "points": ""
}
*/


// To do: a lot