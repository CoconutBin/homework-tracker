const input = document.getElementById("input")
const inputDiv = document.getElementById("inputform")
const list = document.getElementById("list")
const listContents = []
const storedlistContents = JSON.parse(localStorage.getItem("listContents")) || []

if (!typeof (Storage)) {
    alert("Your browser does not support local storage, so list items won't save when you exit the tab")
}

if (storedlistContents && storedlistContents != []) {
    for (let i = 0; i < storedlistContents.length; i++) {
        addListItem(storedlistContents[i])
    }
}

inputDiv.addEventListener(
    "submit", function (event) {
        event.preventDefault();
        if (!input.value || input.value == "") {
        }
        else {
            addListItem(input.value)
            input.value = "" //Clears text field
        }

    }
)

function addListItem(input) {
    const child = document.createElement("h1");
    const deleteButton = document.createElement("input")
    const editButton = document.createElement("input")
    const editModal = document.createElement("div")

    //Adds list item
    child.classList.add("listItem")  
    child.textContent = input;
    list.appendChild(child);

    //Adds delete button
    deleteButton.type = "button"
    deleteButton.classList.add("button") 
    deleteButton.value = "Delete"
    deleteButton.addEventListener(
        "click", function () {
            const deletedListContent = deleteButton.parentElement.textContent
            listContents.splice(listContents.indexOf(deletedListContent), 1)
            deleteButton.parentElement.remove()
            if (listContents) { localStorage.setItem("listContents", JSON.stringify(listContents)) }
        }

    )

    //Adds edit modal
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
            if (!editField.value || editField.value == "") {
            }
            else {
                const editedListContent = editButton.parentElement.textContent
                child.textContent = editField.value
                editModal.style.display = 'hidden'
                console.log(listContents
                )
                console.log(editedListContent)
                console.log(listContents.indexOf(editedListContent))
                listContents.splice(listContents.indexOf(editedListContent), 1, editField.value)
                if (listContents) { localStorage.setItem("listContents", JSON.stringify(listContents)) }
            }
    
        }
    )
    editModal.appendChild(editForm)

    //Adds edit button
    editButton.type = "button"
    editButton.classList.add("button") 
    editButton.value = "Edit"
    editButton.addEventListener(
        "click", function() {
            editModal.style.display = "block"
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