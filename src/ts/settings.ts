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
    noGradientNavbars: boolean;
    useSystemTheme: boolean;

    private initializeDefaults() {
        this.defaultThemes = {
            light: "matcha",
            dark: "hojicha"
        };
        this.noGradientNavbars = false;
        this.pureBlackDarkMode = false;
        this.useSystemTheme = true;
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
            systemFont: this.systemFont,
            noGradientNavbars: this.noGradientNavbars,
            useSystemTheme: this.useSystemTheme,
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
        this.noGradientNavbars = obj.noGradientNavbars;
        this.useSystemTheme = obj.useSystemTheme;
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
const noGradientNavbars = document.getElementById("noGradientNavbars") as HTMLInputElement;
const useSystemTheme = document.getElementById("useSystemTheme") as HTMLInputElement;
const subjectNameClick = document.getElementById("subjectNameClick") as HTMLSelectElement;
const pureBlackDarkMode = document.getElementById('pureBlackDarkMode') as HTMLInputElement
const customThemes = document.getElementById('customThemes') as HTMLInputElement
const analytics = document.getElementById('analytics') as HTMLInputElement
const analyticsDiv = document.getElementById("analyticsDiv") as HTMLDivElement
const quickAddSetup = document.getElementById("quickAddSetup") as HTMLButtonElement
const systemFont = document.getElementById("systemFont") as HTMLInputElement
const quickAddContainer = document.getElementById("quickAddContainer") as HTMLDivElement
const quickAddModal = document.getElementById("quickAddModal") as HTMLDivElement
const quickAddDiv = document.getElementById("quickAddScreen") as HTMLDivElement
const quickAddTextArea = document.getElementById("quickAddTextArea") as HTMLTextAreaElement
const quickAddImportButton = document.getElementById("quickAddImportButton") as HTMLButtonElement
const quickAddExportButton = document.getElementById("quickAddExportButton") as HTMLButtonElement
const quickAddCancelButton = document.getElementById("quickAddCancelButton") as HTMLButtonElement


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
    rtlFormat(rightToLeft.checked)
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
        function themeDeterminer(hexcolor: string){
           let splitHex: string[] = hexcolor.match(/[0-9a-f]{2}/gi)
           if(((parseInt(splitHex[0], 16) + parseInt(splitHex[1], 16) + parseInt(splitHex[2], 16)) / 3) < 30){
            return "dark";
           }
           else{
            return "light";
           }
        }

        if(themeDeterminer(Themes[currentTheme].backgroundColor) == "light") {
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

noGradientNavbars.addEventListener("change", () => {
    settings.noGradientNavbars = noGradientNavbars.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    if(settings.noGradientNavbars){
        document.getElementById("navbar").style.background = 'var(--secondary)'
    } else{
        document.getElementById("navbar").style.background = ''
    }
})

useSystemTheme.addEventListener("change", () => {
    settings.useSystemTheme = useSystemTheme.checked
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
})

if(quickAddSetup != undefined) {
    quickAddSetup.addEventListener("click", () => {
        settingsContainer.style.display = "none"
        quickAddContainer.style.display = "block"
        quickAddDiv.style.display = "block"
    })
    quickAddModal.addEventListener("click", () => {
        quickAddContainer.style.display = "none"
    })
    
    quickAddExportButton.addEventListener("click", (e) => {
        quickAddTextArea.value = localStorage.getItem("currentSchedule");
        quickAddTextArea.select();
        navigator.clipboard.writeText(localStorage.getItem("currentSchedule"));
    })

    quickAddImportButton.addEventListener("click", (e) => {
        localStorage.setItem("currentSchedule",quickAddTextArea.value);
        console.log(`saved ${quickAddTextArea.value} into localStorage`)
        currentSchedule.scheduleObject = JSON.parse(localStorage.getItem("currentSchedule"))
        quickAddContainer.style.display = "none";
    })

    quickAddCancelButton.addEventListener("click", (e) => {
        quickAddContainer.style.display = "none";
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

if(settings.useSystemTheme == undefined) {
    settings.useSystemTheme = true
}

try {
    rightToLeft.checked = settings.rightToLeft
    systemFont.checked = settings.systemFont
    useSystemTheme.checked = settings.useSystemTheme
    noGradientNavbars.checked = settings.noGradientNavbars
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
    noGradientNavbars.checked = settings.noGradientNavbars
    useSystemTheme.checked = settings.useSystemTheme
}

function rtlFormat(bool: boolean){
    let listItemDisplay = document.querySelectorAll(".listItemDisplay") as unknown as HTMLElement[]
    let subjectNameContainer = document.querySelectorAll(".subjectNameContainer") as unknown as HTMLElement[]

    if(bool){
        list.style.flexDirection = "row-reverse";
        listItemDisplay.forEach(x => x.style.textAlign = "right");
        subjectNameContainer.forEach(x => x.style.flexDirection = "row-reverse");
    } else{
        list.style.flexDirection = "row"
        listItemDisplay.forEach(x => x.style.textAlign = "left");
        subjectNameContainer.forEach(x => x.style.flexDirection = "row");
    }
}

rtlFormat(rightToLeft.checked)

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



// About Screen
const aboutButton = document.getElementById("aboutButton") as HTMLElement
const aboutContainer = document.getElementById("aboutContainer") as HTMLElement
const aboutScreen = document.getElementById("aboutScreen") as HTMLElement
const aboutCloseButton = document.getElementById("aboutCloseButton") as HTMLElement
const aboutModal = document.getElementById("aboutModal") as HTMLElement
const aboutVersion = document.getElementById("version") as HTMLElement
const aboutSource = document.getElementById("source") as HTMLElement

aboutButton.addEventListener("click", () => {
    settingsContainer.style.display = "none"
    aboutContainer.style.display = "block"
    aboutScreen.style.display = "block"
})

aboutModal.addEventListener("click", () => {
    aboutContainer.style.display = "none"
})

aboutCloseButton.addEventListener("click", () => {
    aboutContainer.style.display = "none"
})

aboutVersion.textContent = `Version: V.${version}`
aboutSource.style.textDecoration = "none"
aboutSource.style.color = "var(--text)"