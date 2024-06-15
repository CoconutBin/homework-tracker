const version = "2.2b";
if (localStorage.getItem("version") !== null && localStorage.getItem("version") !== version) {
    if (parseInt(localStorage.getItem("version").split(".")[0]) > 1) {
        console.log("currently running version " + version);
    }
    else {
        localStorage.setItem("listContents", null);
    }
}
localStorage.setItem("version", version);
class ManageLocalStorage {
    static update() {
        localStorage.setItem("listContents", JSON.stringify(listContents));
        localStorage.setItem("archivedHomeworks", JSON.stringify(archivedHomeworks));
    }
    static deleteListItem(listItem) {
        listContents.splice(listContents.indexOf(listItem), 1);
        localStorage.setItem("listContents", JSON.stringify(listContents));
    }
    static deleteArchived(archivedHomework) {
        archivedHomeworks.splice(archivedHomeworks.indexOf(archivedHomework), 1);
        localStorage.setItem("archivedHomeworks", JSON.stringify(archivedHomeworks));
    }
    static replace(index, updatedListItem) {
        listContents.splice(index, 1, updatedListItem);
        ManageLocalStorage.update();
    }
}
