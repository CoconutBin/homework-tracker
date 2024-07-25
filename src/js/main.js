const archivedHomeworks = JSON.parse(localStorage.getItem("archivedHomeworks")) != undefined ? JSON.parse(localStorage.getItem("archivedHomeworks")) : [];
const list = document.getElementById("list");
function addButton(type, affectedElement, customValue) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = type;
    switch (type) {
        case "Close":
            button.addEventListener("click", () => {
                affectedElement.style.display = "none";
            });
            break;
        case "Custom":
            break;
        default:
            console.error("Invalid Input");
    }
    if (customValue != undefined) {
        button.value = customValue;
    }
    return button;
}
function addElement(elementType, innerText) {
    let element = document.createElement(elementType);
    if (innerText != undefined) {
        element.textContent = innerText;
    }
    return element;
}
function convertToTime(time) {
    let Days = 0, Hours = 0, Minutes = 0, Seconds = 0;
    let returnedTime = "";
    Days = Math.floor(time / (1000 * 60 * 60 * 24));
    time -= Days * (1000 * 60 * 60 * 24);
    Hours = Math.floor(time / (1000 * 60 * 60));
    time -= Hours * (1000 * 60 * 60);
    Minutes = Math.floor(time / (1000 * 60));
    time -= Minutes * (1000 * 60);
    Seconds = Math.floor(time / 1000);
    // Build the returned time string with proper units
    if (Days > 0) {
        returnedTime += `${Days}d `;
    }
    if (Hours > 0) {
        returnedTime += `${Hours}h `;
    }
    if (Minutes > 0) {
        returnedTime += `${Minutes}m `;
    }
    if (Seconds >= 0) {
        returnedTime += `${Seconds}s`;
    }
    if (parseInt(returnedTime) < 0 || Number.isNaN(parseInt(returnedTime))) {
        returnedTime = "0s";
    }
    return returnedTime.trim();
}
if (navigator.setAppBadge) {
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            navigator.setAppBadge(listContents.length);
        }
        else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                navigator.setAppBadge(listContents.length);
            });
        }
        // Don't do anything if the permission was denied.
    });
}
