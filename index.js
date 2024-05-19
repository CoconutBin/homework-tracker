const input = document.getElementById("input")
const inputDiv = document.getElementById("inputform")
const list = document.getElementById("list")
const listContents = []
const storedlistContents = JSON.parse(localStorage.getItem("listContents")) || []

if (!typeof (Storage)) {
    alert("Your browser does not support local storage, so list items won't save when you exit the tab")
}

if (storedlistContents && storedlistContents.length > 0) {
    for (let i = 0; i < storedlistContents.length; i++) {
        addListItem(storedlistContents[i])
    }
}

inputDiv.addEventListener(
    "submit", function (event) {
        event.preventDefault();
        if (input.value) {
            addListItem(input.value)
            input.value = "" 
        }
    }
)

function addListItem(input) {
    const child = document.createElement("h1"); 
    const deleteButton = document.createElement("input")
    const editButton = document.createElement("input")
    const editModal = document.createElement("div")

    // Adds list item
    child.classList.add("listItem")
    child.textContent = input;
    list.appendChild(child);

    // Adds delete button
    deleteButton.type = "button"
    deleteButton.classList.add("button")
    deleteButton.value = "Delete"
    deleteButton.addEventListener(
        "click", function () {
            const deletedListContent = child.textContent; 
            listContents.splice(listContents.indexOf(deletedListContent), 1)
            child.remove()
            if (listContents) { localStorage.setItem("listContents", JSON.stringify(listContents)) }
        }
    )

    // Adds edit modal
    const editField = document.createElement("input")
    const editFieldSubmit = document.createElement("input")
    const editForm = document.createElement("form")
    editField.type = "text"
    editFieldSubmit.type = "submit"
    editFieldSubmit.classList.add("button")
    editModal.classList.add("modal")
    editForm.appendChild(editField)
    editForm.appendChild(editFieldSubmit)
    editField.value = input
    editForm.addEventListener(
        "submit", function (event) {
            event.preventDefault();
            if (editField.value) {
                const editedListContent = child.textContent; 
                child.textContent = editField.value
                child.appendChild(deleteButton)
                child.appendChild(editButton)
                child.appendChild(editModal)
                editModal.style.display = 'none'
                listContents.splice(listContents.indexOf(editedListContent), 1, editField.value)
                if (listContents) { localStorage.setItem("listContents", JSON.stringify(listContents)) }
            }
        }
    )
    editModal.appendChild(editForm)

    // Adds edit button
    editButton.type = "button"
    editButton.classList.add("button")
    editButton.value = "Edit"
    editButton.addEventListener(
        "click", function () {
            editModal.style.display = "flex"
        }
    )

    child.appendChild(deleteButton)
    child.appendChild(editButton)
    child.appendChild(editModal)
    listContents.push(input)
    if (listContents) { localStorage.setItem("listContents", JSON.stringify(listContents)) }
}

function clearList() {
    listContents.splice(0, listContents.length)
    localStorage.setItem("listContents", JSON.stringify(listContents))
    list.innerHTML = ""
}

//To do: Changing the to-do list to a homework list
class Homework {
    constructor(subjectName, subjectID, subjectType, isGroupWork, dueDate, description, points){
        this._subjectName = subjectName || "No Subject"
        this._subjectID = subjectID || "Unknown ID"
        this._subjectType = subjectType || "Unknown"
        this.isGroupWork = isGroupWork || false
        this.dueDate = dueDate || "Unknown"
        this.description = description || ""
        this.points = points || "Unknown"
    }

    start(){
        this.timeStarted = Date.now()
    }

    get subject() {
        return {
          id: this._subjectID,
          name: this._subjectName,
          type: this._subjectType,
        };
    }

    get homeworkObject(){
        return {
            subject: this.subject,
            isGroupWork: this.isGroupWork,
            dueDate: this.dueDate,
            description: this.description,
            points: this.points,
            timeStarted: this.timeStarted
        }
    }

    set homeworkObject(obj){
        this.subject = obj.subject
        this.isGroupWork = obj.isGroupWork
        this.dueDate = obj.dueDate
        this.description = obj.description
        this.points = obj.points
        this.timeStarted = obj.timeStarted
    }

    set subject(obj){
        this._subjectID = obj.id
        this._subjectName = obj.name
        this._subjectType = obj.type
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