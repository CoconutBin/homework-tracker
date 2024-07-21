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
    };
    pureBlackDarkMode: boolean;
    customThemes: boolean;
    customThemeColor: {
        text?: string,
        background?: string,
        primary?: string,
        secondary?: string,
        accent?: string
    };
    rightToLeft: boolean;
    subjectNameClick: string;
    analytics: boolean;
    systemFont: boolean;

    private initializeDefaults() {
        this.defaultThemes = {
            light: "matcha",
            dark: "hojicha"
        };
        this.pureBlackDarkMode = false;
        this.rightToLeft = false;
        this.customThemes = false;
        this.customThemeColor = {};
        this.subjectNameClick = "";
        this.analytics = false;
        this.systemFont = false;
    }

    constructor() {
        this.initializeDefaults();
    }

    reset() {
        this.initializeDefaults();
    }

    get settingsObject() {
        return {
            defaultThemes: this.defaultThemes,
            customThemes: this.customThemes,
            customThemeColor: this.customThemeColor,
            pureBlackDarkMode: this.pureBlackDarkMode,
            rightToLeft: this.rightToLeft,
            subjectNameClick: this.subjectNameClick,
            analytics: this.analytics,
            systemFont: this.systemFont
        };
    }

    set settingsObject(obj) {
        this.customThemeColor = obj.customThemeColor;
        this.customThemes = obj.customThemes;
        this.defaultThemes = obj.defaultThemes;
        this.rightToLeft = obj.rightToLeft;
        this.subjectNameClick = obj.subjectNameClick;
        this.pureBlackDarkMode = obj.pureBlackDarkMode;
        this.analytics = obj.analytics;
        this.systemFont = obj.systemFont;
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
const analytics = document.getElementById('analytics') as HTMLInputElement
const analyticsDiv = document.getElementById("analyticsDiv") as HTMLDivElement
const quickAddSetup = document.getElementById("quickAddSetup") as HTMLButtonElement
const systemFont = document.getElementById("systemFont") as HTMLInputElement
const quickAddContainer = document.getElementById("quickAddContainer") as HTMLDivElement
const quickAddModal = document.getElementById("quickAddModal") as HTMLDivElement
const quickAddScreen = document.getElementById("quickAddScreen") as HTMLDivElement
const quickAddTextArea = document.getElementById("quickAddTextArea") as HTMLTextAreaElement
const quickAddImportButton = document.getElementById("quickAddImportButton") as HTMLButtonElement
const quickAddExportButton = document.getElementById("quickAddExportButton") as HTMLButtonElement
const quickAddDownloadButton = document.getElementById("quickAddDownloadButton") as HTMLButtonElement


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

systemFont.addEventListener("change", () => {
    settings.systemFont = systemFont.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    if (settings.systemFont) {
        document.body.style.fontFamily = "system-ui, sans-serif"
    } else {
        document.body.style.fontFamily = '"Nunito", system-ui, sans-serif'
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

if(quickAddSetup != undefined) {
    quickAddSetup.addEventListener("click", () => {
        alert("Quick Add Function is currently not implemented in the UI")
        //to do: add quick add function
    })
}

if(analytics != undefined) {
    analytics.addEventListener("change", () => {
        settings.analytics = analytics.checked
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
        if(settings.analytics){
            analyticsDiv.style.display = "flex";
            list.style.height = "calc(50vh - 15px)";
        } else {
            analyticsDiv.style.display = "none";
            list.style.height = "auto";
        }
    })
}

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
    systemFont.checked = settings.systemFont
    if (customThemes != undefined){customThemes.checked = settings.customThemes} 
    if (subjectNameClick != undefined) subjectNameClick.value = settings.subjectNameClick
    if (pureBlackDarkMode != undefined) pureBlackDarkMode.checked = settings.pureBlackDarkMode
    if (settings.customThemes) {
        defaultDarkThemeSetting.disabled = true
        defaultLightThemeSetting.disabled = true
        pureBlackDarkMode.disabled = true
    }
    if(analytics != undefined) analytics.checked = settings.analytics
}
catch {
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"))
    defaultDarkThemeSetting.value = settings.defaultThemes.dark
    defaultLightThemeSetting.value = settings.defaultThemes.light
    rightToLeft.checked = settings.rightToLeft
    systemFont.checked = settings.systemFont
    customThemes.checked = settings.customThemes
    subjectNameClick.value = settings.subjectNameClick
    pureBlackDarkMode.checked = settings.pureBlackDarkMode
}

if (rightToLeft.checked) {
    list.style.flexDirection = "row-reverse"
}

if(analyticsDiv != undefined){
    if(settings.analytics) {
        analyticsDiv.style.display = "flex";
        list.style.height = "calc(50vh - 15px)";
    } else {
        analyticsDiv.style.display = "none";
        list.style.height = "auto";
    }
}

if (settings.systemFont) {
    document.body.style.fontFamily = "system-ui, sans-serif"
} else {
    document.body.style.fontFamily = '"Nunito", system-ui, sans-serif'
}
