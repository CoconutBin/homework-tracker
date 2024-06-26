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
    customThemes: boolean
    customThemeColor: {
        text?: string,
        background?: string,
        primary?: string,
        secondary?: string,
        accent?: string
    }
    rightToLeft: boolean
    subjectNameClick: string

    reset() {
        this.defaultThemes = {
            light: "matcha",
            dark: "simpledark"
        },
        this.pureBlackDarkMode = false,
        this.rightToLeft = false,
        this.customThemes = false,
        this.customThemeColor = {}
        this.subjectNameClick = ""
    }

    constructor() {
        this.pureBlackDarkMode = false,
            this.rightToLeft = false,
            this.customThemes = false,
            this.customThemeColor = {}
            this.subjectNameClick = "",
            this.defaultThemes = {
                light: "matcha",
                dark: "simpledark"
            }
    }

    get settingsObject() {
        return {
            defaultThemes: this.defaultThemes,
            customThemes: this.customThemes,
            customThemeColor: this.customThemeColor,
            pureBlackDarkMode: this.pureBlackDarkMode,
            rightToLeft: this.rightToLeft,
            subjectNameClick: this.subjectNameClick
        }
    }

    set settingsObject(obj) {
        this.customThemeColor = obj.customThemeColor
        this.customThemes = obj.customThemes
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
const customThemes = document.getElementById('customThemes') as HTMLInputElement

settingsButton.addEventListener("click", () => {
    settingsContainer.style.display = "block"
    settingsDiv.style.display = "block"
})

settingsModal.addEventListener("click", () => {
    settingsContainer.style.display = "none"
    settingsDiv.style.display = "none"
})

settingsCloseButton.addEventListener("click", () => {
    settingsContainer.style.display = "none"
    settingsDiv.style.display = "none"
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

customThemes.addEventListener("change", () => {
    settings.customThemes = customThemes.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    if (settings.customThemes) {
        defaultDarkThemeSetting.disabled = true
        defaultLightThemeSetting.disabled = true
        pureBlackDarkMode.disabled = true
        themeButton.textContent = "palette"
        themeButton.title = "Cutomize Theme"
        if(settings.customThemeColor == undefined || Object.values(settings.customThemeColor).length == 0) {
            console.log(currentTheme)
            settings.customThemeColor = {
                text: Themes[currentTheme].textColor,
                background: Themes[currentTheme].backgroundColor,
                primary: Themes[currentTheme].primaryColor,
                secondary: Themes[currentTheme].secondaryColor,
                accent: Themes[currentTheme].accentColor
            }
        }
        Themes['custom'].CSSColors = settings.customThemeColor
        Themes['custom'].setCSS()
    } else{
        if(Themes[currentTheme].themeType == "light") {
            themeButton.textContent = "light_mode"
            Themes[settings.defaultThemes.light].setCSS()
        }
        else {
            themeButton.textContent = "dark_mode"
            Themes[settings.defaultThemes.dark].setCSS()
        }
        themeButton.title = "Dark/Light Theme"
        defaultDarkThemeSetting.disabled = false
        defaultLightThemeSetting.disabled = false
        pureBlackDarkMode.disabled = false
    }
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
    rightToLeft.checked = settings.rightToLeft
    if (customThemes != undefined){customThemes.checked = settings.customThemes} 
    if (subjectNameClick != undefined) subjectNameClick.value = settings.subjectNameClick
    if (pureBlackDarkMode != undefined) pureBlackDarkMode.checked = settings.pureBlackDarkMode
    if (settings.customThemes) {
        defaultDarkThemeSetting.disabled = true
        defaultLightThemeSetting.disabled = true
        pureBlackDarkMode.disabled = true
    }
}
catch {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"))
    defaultDarkThemeSetting.value = settings.defaultThemes.dark
    defaultLightThemeSetting.value = settings.defaultThemes.light
    rightToLeft.checked = settings.rightToLeft
    customThemes.checked = settings.customThemes
    subjectNameClick.value = settings.subjectNameClick
    pureBlackDarkMode.checked = settings.pureBlackDarkMode
}

if (rightToLeft.checked) {
    list.style.flexDirection = "row-reverse"
}

