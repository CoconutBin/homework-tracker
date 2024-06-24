// const sortButton = document.getElementById('sort') as HTMLButtonElement;
const settingsButton = document.getElementById('settings');
/*
sortButton.addEventListener("click", () => {
    alert("Sort Function is currently not avaliable")
})
*/
class Settings {
    defaultThemes;
    pureBlackDarkMode;
    customThemes;
    rightToLeft;
    subjectNameClick;
    reset() {
        this.defaultThemes = {
            light: "matcha",
            dark: "dark"
        },
            this.pureBlackDarkMode = false,
            this.rightToLeft = false,
            this.customThemes = false,
            this.subjectNameClick = "";
    }
    constructor() {
        this.pureBlackDarkMode = false,
            this.rightToLeft = false,
            this.customThemes = false,
            this.subjectNameClick = "",
            this.defaultThemes = {
                light: "matcha",
                dark: "dark"
            };
    }
    get settingsObject() {
        return {
            defaultThemes: {
                light: this.defaultThemes.light,
                dark: this.defaultThemes.dark
            },
            customThemes: this.customThemes,
            pureBlackDarkMode: this.pureBlackDarkMode,
            rightToLeft: this.rightToLeft,
            subjectNameClick: this.subjectNameClick
        };
    }
    set settingsObject(obj) {
        this.customThemes = obj.customThemes;
        this.defaultThemes = obj.defaultThemes;
        this.rightToLeft = obj.rightToLeft;
        this.subjectNameClick = obj.subjectNameClick;
        this.pureBlackDarkMode = obj.pureBlackDarkMode;
    }
}
const settings = new Settings();
const settingsContainer = document.getElementById("settingsContainer");
const settingsModal = document.getElementById("settingsModal");
const settingsDiv = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const settingsresetButton = document.getElementById('settingsResetButton');
const defaultDarkThemeSetting = document.getElementById("defaultDark");
const defaultLightThemeSetting = document.getElementById("defaultLight");
const rightToLeft = document.getElementById("rightToLeft");
const subjectNameClick = document.getElementById("subjectNameClick");
const pureBlackDarkMode = document.getElementById('pureBlackDarkMode');
const customThemes = document.getElementById('customThemes');
settingsButton.addEventListener("click", () => {
    settingsContainer.style.display = "block";
    settingsDiv.style.display = "block";
});
settingsModal.addEventListener("click", () => {
    settingsContainer.style.display = "none";
    settingsDiv.style.display = "none";
});
settingsCloseButton.addEventListener("click", () => {
    settingsContainer.style.display = "none";
    settingsDiv.style.display = "none";
});
settingsresetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset settings?")) {
        settings.reset();
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
        Themes[currentTheme].setCSS();
        defaultDarkThemeSetting.value = settings.defaultThemes.dark;
        defaultLightThemeSetting.value = settings.defaultThemes.light;
        rightToLeft.checked = settings.rightToLeft;
        if (subjectNameClick != undefined)
            subjectNameClick.value = settings.subjectNameClick;
        if (pureBlackDarkMode != undefined)
            pureBlackDarkMode.checked = settings.pureBlackDarkMode;
        list.style.flexDirection = "row";
    }
});
defaultDarkThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.dark = defaultDarkThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "dark") {
        Themes[settings.defaultThemes.dark].setCSS();
    }
});
defaultLightThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.light = defaultLightThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "light") {
        Themes[settings.defaultThemes.light].setCSS();
    }
});
rightToLeft.addEventListener("change", () => {
    settings.rightToLeft = rightToLeft.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.rightToLeft) {
        list.style.flexDirection = "row-reverse";
    }
    else {
        list.style.flexDirection = "row";
    }
});
pureBlackDarkMode.addEventListener("change", () => {
    settings.pureBlackDarkMode = pureBlackDarkMode.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    Themes[currentTheme].setCSS();
});
customThemes.addEventListener("change", () => {
    customThemes.checked = settings.customThemes;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.customThemes) {
        themeButton.textContent = "palette";
    }
});
if (subjectNameClick != undefined) {
    subjectNameClick.addEventListener("change", () => {
        settings.subjectNameClick = subjectNameClick.value;
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    });
}
if (localStorage.getItem("settings") != null) {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"));
}
try {
    defaultDarkThemeSetting.value = settings.defaultThemes.dark;
    defaultLightThemeSetting.value = settings.defaultThemes.light;
    rightToLeft.checked = settings.rightToLeft;
    if (customThemes != undefined)
        customThemes.checked = settings.customThemes;
    if (subjectNameClick != undefined)
        subjectNameClick.value = settings.subjectNameClick;
    if (pureBlackDarkMode != undefined)
        pureBlackDarkMode.checked = settings.pureBlackDarkMode;
}
catch {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"));
    defaultDarkThemeSetting.value = settings.defaultThemes.dark;
    defaultLightThemeSetting.value = settings.defaultThemes.light;
    rightToLeft.checked = settings.rightToLeft;
    customThemes.checked = settings.customThemes;
    subjectNameClick.value = settings.subjectNameClick;
    pureBlackDarkMode.checked = settings.pureBlackDarkMode;
}
if (rightToLeft.checked) {
    list.style.flexDirection = "row-reverse";
}
