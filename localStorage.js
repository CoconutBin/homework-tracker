if (localStorage.getItem("version") !== null && localStorage.getItem("version") !== "2.1b") {
    if(parseInt(localStorage.getItem("version").split(".")[0]) > 1) {
    }
    else {localStorage.clear()}
}

localStorage.setItem("version", "2.1b")

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
