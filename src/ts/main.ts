const archivedHomeworks: Homework["homeworkObject"][] = JSON.parse(localStorage.getItem("archivedHomeworks")) != undefined? JSON.parse(localStorage.getItem("archivedHomeworks")):[]

function addButton(type: string, affectedElement?: HTMLElement, customValue?: string): HTMLInputElement {
    let button = document.createElement("input");
    button.type = "button";
    button.value = type;
    switch (type) {
        case "Close":
            button.addEventListener("click", () => {
                affectedElement.style.display = "none"
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

function addElement(elementType: string, innerText?: string): HTMLElement {
    let element = document.createElement(elementType)
    if (innerText != undefined) {
        element.textContent = innerText
    }
    return element
}

function convertToTime(time: number): string {
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
    
    return returnedTime.trim();
}