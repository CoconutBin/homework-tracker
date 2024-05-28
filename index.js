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
const addListItemButton = document.getElementById("addListItemButton")
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

if (storedlistContents != null && storedlistContents.length > 0) {
    for (listItem of storedlistContents) {
        addListItem(listItem);
    }
}

addListItemButton.addEventListener("click", function () {
    inputDiv.style.display = "flex"
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
            listContents.push(inputHomework.homeworkObject)
            for (inputs of allInputs) {
                inputs.value = ""
                inputs.checked = false
            }
            ManageLocalStorage.update()
            addListItem(inputHomework.homeworkObject)
        }
    }
)
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
    const subjectName = addElement("h1", homeworkObject.subject.name)
    const editButton = document.createElement("input")


    //Displaying Text Item
    displayDiv.appendChild(subjectName)
    displayDiv.classList.add("listItem")

    /*
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
    */

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

    detailsModal.classList.add("modal")
    detailsDisplay.classList.add("detailsDisplay")
    detailsDisplay.innerHTML =
        `
    <h1 contenteditable="true">${homeworkObject.subject.name}</h1>
    ${subjectSubData != undefined ? "<p>" + subjectSubData + "</p>" : ""}
    <p>Due: ${homeworkObject.dueDate}</p>
    <p>${homeworkObject.points > 0 ? homeworkObject.points : "No"} Points</p>
    <p>${homeworkObject.isGroupWork == true ? "Group Work" : "Not Group Work"}</p>
    <p>Details:<p>
    <p>${homeworkObject.description}</p><br>
        `

    detailsModal.addEventListener("click", () => {
        detailsModal.style.display = "none";
        detailsDisplay.style.display = "none";
    })

    const detailsCloseButton = addButton("Custom", null, "Close")

    detailsCloseButton.addEventListener("click", () => {
        detailsModal.style.display = "none";
        detailsDisplay.style.display = "none";
    })

    detailsDisplay.appendChild(addButton("Delete", listItem))
    detailsDisplay.appendChild(detailsCloseButton)
    listItem.appendChild(detailsModal)
    listItem.appendChild(displayDiv)
    listItem.appendChild(detailsDisplay)
    detailsModal.contentEditable = "true"

    //Clicking for Details
    displayDiv.addEventListener("click", () => {
          detailsModal.style.display = "flex";
          detailsDisplay.style.display = "block";
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

function addButton(type, affectedElement, customValue){
    let button = document.createElement("input");
    button.type = "button";
    button.value = type;
    switch(type) {
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

    if(customValue != undefined) {
        button.value = customValue
    }
    
    return button
}

function addElement(elementType, innerText){
    let element = document.createElement(elementType)
    if(innerText != undefined){
        element.textContent = innerText
    }
    return element
}