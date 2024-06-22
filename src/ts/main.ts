const archivedHomeworks: Homework["homeworkObject"][] = JSON.parse(localStorage.getItem("archivedHomeworks")) != undefined? JSON.parse(localStorage.getItem("archivedHomeworks")):[]

function addButton(type: string, affectedElement?: HTMLElement, customValue?: string): HTMLInputElement {
    let button = document.createElement("input");
    button.type = "button";
    button.value = type;
    switch (type) {
        case "Close":
            button.addEventListener("click", () => {
                affectedElement.style.display = "none"
                enableScroll();
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

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt as boolean); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt as boolean);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}