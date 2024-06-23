// const sortButton = document.getElementById('sort') as HTMLButtonElement;
const settingsButton = document.getElementById('settings') as HTMLButtonElement;

/*
sortButton.addEventListener("click", () => {
    alert("Sort Function is currently not avaliable")
})
*/

class Settings {

    defaultThemes: {
        light: string,
        dark: string
    }
    pureBlackDarkMode: boolean
    rightToLeft: boolean
    subjectNameClick: string

    reset() {
        this.defaultThemes = {
            light: "matcha",
            dark: "dark"
        },
            this.pureBlackDarkMode = false,
            this.rightToLeft = false,
            this.subjectNameClick = ""
    }

    constructor() {
        this.pureBlackDarkMode = false,
            this.rightToLeft = false,
            this.subjectNameClick = "",
            this.defaultThemes = {
                light: "matcha",
                dark: "dark"
            }
    }

    get settingsObject() {
        return {
            defaultThemes: {
                light: this.defaultThemes.light,
                dark: this.defaultThemes.dark
            },
            pureBlackDarkMode: this.pureBlackDarkMode,
            rightToLeft: this.rightToLeft,
            subjectNameClick: this.subjectNameClick
        }
    }

    set settingsObject(obj) {
        this.defaultThemes = obj.defaultThemes
        this.rightToLeft = obj.rightToLeft
        this.subjectNameClick = obj.subjectNameClick
        this.pureBlackDarkMode = obj.pureBlackDarkMode
    }
}

const settings = new Settings()

const settingsContainer = document.getElementById("settingsContainer");
const settingsModal = document.getElementById("settingsModal");
const settingsDiv = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const settingsresetButton = document.getElementById('settingsResetButton') as HTMLButtonElement;
const defaultDarkThemeSetting = document.getElementById("defaultDark") as HTMLSelectElement;
const defaultLightThemeSetting = document.getElementById("defaultLight") as HTMLSelectElement;
const rightToLeft = document.getElementById("rightToLeft") as HTMLInputElement;
const subjectNameClick = document.getElementById("subjectNameClick") as HTMLSelectElement;
const pureBlackDarkMode = document.getElementById('pureBlackDarkMode') as HTMLInputElement

settingsButton.addEventListener("click", () => {
    settingsContainer.style.display = "block"
    settingsDiv.style.display = "block"
    disableScroll()
})

settingsModal.addEventListener("click", () => {
    settingsContainer.style.display = "none"
    settingsDiv.style.display = "none"
    enableScroll()
})

settingsCloseButton.addEventListener("click", () => {
    settingsContainer.style.display = "none"
    settingsDiv.style.display = "none"
    enableScroll()
})

settingsresetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset settings?")) {
        settings.reset()
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
        Themes[currentTheme].setCSS();
        defaultDarkThemeSetting.value = settings.defaultThemes.dark
        defaultLightThemeSetting.value = settings.defaultThemes.light
        rightToLeft.checked = settings.rightToLeft
        if (subjectNameClick != undefined) subjectNameClick.value = settings.subjectNameClick
        if (pureBlackDarkMode != undefined) pureBlackDarkMode.checked = settings.pureBlackDarkMode
        list.style.flexDirection = "row"
    }

})

defaultDarkThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.dark = defaultDarkThemeSetting.value
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))

    if (Themes[currentTheme].themeType == "dark") {
        Themes[settings.defaultThemes.dark].setCSS()
    }
})

defaultLightThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.light = defaultLightThemeSetting.value
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))

    if (Themes[currentTheme].themeType == "light") {
        Themes[settings.defaultThemes.light].setCSS()
    }
})

rightToLeft.addEventListener("change", () => {
    settings.rightToLeft = rightToLeft.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    if (settings.rightToLeft) {
        list.style.flexDirection = "row-reverse"
    } else {
        list.style.flexDirection = "row"
    }
})

pureBlackDarkMode.addEventListener("change", () => {
    settings.pureBlackDarkMode = pureBlackDarkMode.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    Themes[currentTheme].setCSS();
})

if (subjectNameClick != undefined) {
    subjectNameClick.addEventListener("change", () => {
        settings.subjectNameClick = subjectNameClick.value
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    })
}

if (localStorage.getItem("settings") != null) {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"))
}

try {
    defaultDarkThemeSetting.value = settings.defaultThemes.dark
    defaultLightThemeSetting.value = settings.defaultThemes.light
    rightToLeft.checked = settings.rightToLeft
    if (subjectNameClick != undefined) subjectNameClick.value = settings.subjectNameClick
    if (pureBlackDarkMode != undefined) pureBlackDarkMode.checked = settings.pureBlackDarkMode
}
catch {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"))
    defaultDarkThemeSetting.value = settings.defaultThemes.dark
    defaultLightThemeSetting.value = settings.defaultThemes.light
    rightToLeft.checked = settings.rightToLeft
    subjectNameClick.value = settings.subjectNameClick
    pureBlackDarkMode.checked = settings.pureBlackDarkMode
}

if (rightToLeft.checked) {
    list.style.flexDirection = "row-reverse"
}