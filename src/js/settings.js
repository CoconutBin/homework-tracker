// const sortButton = document.getElementById('sort') as HTMLButtonElement;
const settingsButton = document.getElementById('settings');
/*
sortButton.addEventListener("click", () => {
    alert("Sort Function is currently not avaliable")
})
*/
class Settings {
    defaultThemes;
    betaFeatures;
    reset() {
        this.defaultThemes = {
            light: "matcha",
            dark: "dark"
        };
        this.betaFeatures = {
            rightToLeft: false,
            subjectNameClick: ""
        };
    }
    constructor() {
        this.betaFeatures = {
            rightToLeft: false,
            subjectNameClick: ""
        };
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
            betaFeatures: {
                rightToLeft: this.betaFeatures.rightToLeft,
                subjectNameClick: this.betaFeatures.subjectNameClick
            }
        };
    }
    set settingsObject(obj) {
        this.defaultThemes = obj.defaultThemes;
        this.betaFeatures = obj.betaFeatures;
    }
}
const settings = new Settings();
const settingsContainer = document.getElementById("settingsContainer");
const settingsModal = document.getElementById("settingsModal");
const settingsDiv = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const defaultDarkThemeSetting = document.getElementById("defaultDark");
const defaultLightThemeSetting = document.getElementById("defaultLight");
const rightToLeft = document.getElementById("rightToLeft");
const subjectNameClick = document.getElementById("subjectNameClick");
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
defaultDarkThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.dark = defaultDarkThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "dark") {
        Themes[settings.defaultThemes.dark].setCSS();
        localStorage.setItem("currentTheme", settings.defaultThemes.dark);
    }
});
defaultLightThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.light = defaultLightThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "light") {
        Themes[settings.defaultThemes.light].setCSS();
        localStorage.setItem("currentTheme", settings.defaultThemes.light);
    }
});
rightToLeft.addEventListener("change", () => {
    settings.betaFeatures.rightToLeft = rightToLeft.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.betaFeatures.rightToLeft) {
        list.style.flexDirection = "row-reverse";
    }
    else {
        list.style.flexDirection = "row";
    }
});
if (subjectNameClick != undefined) {
    subjectNameClick.addEventListener("change", () => {
        settings.betaFeatures.subjectNameClick = subjectNameClick.value;
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    });
}
if (localStorage.getItem("settings") != null) {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"));
}
try {
    defaultDarkThemeSetting.value = settings.defaultThemes.dark;
    defaultLightThemeSetting.value = settings.defaultThemes.light;
    rightToLeft.checked = settings.betaFeatures.rightToLeft;
    subjectNameClick.value = settings.betaFeatures.subjectNameClick;
}
catch {
    localStorage.removeItem("settings");
    defaultDarkThemeSetting.value = settings.defaultThemes.dark;
    defaultLightThemeSetting.value = settings.defaultThemes.light;
    rightToLeft.checked = settings.betaFeatures.rightToLeft;
    subjectNameClick.value = settings.betaFeatures.subjectNameClick;
}
if (rightToLeft.checked) {
    list.style.flexDirection = "row-reverse";
}
