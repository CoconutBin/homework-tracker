const themeButton = document.getElementById('themes') as HTMLButtonElement;
const cssVariables = document.querySelector(':root') as HTMLElement
const themesDialog = document.getElementById("customThemesScreen") as HTMLDialogElement;
const themesCloseButton = document.getElementById("themesCloseButton") as HTMLButtonElement;
const inputThemeText = document.getElementById("inputThemeText") as HTMLInputElement;
const inputThemeBackground = document.getElementById("inputThemeBackground") as HTMLInputElement;
const inputThemePrimary = document.getElementById("inputThemePrimary") as HTMLInputElement;
const inputThemeSecondary = document.getElementById("inputThemeSecondary") as HTMLInputElement;
const inputThemeAccent = document.getElementById("inputThemeAccent") as HTMLInputElement;
const themesResetButton = document.getElementById('themesResetButton') as HTMLButtonElement
const themeTemplates = document.getElementById("themeTemplates") as HTMLSelectElement;

let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;

if(settings.noGradientNavbars){
    document.getElementById("navbar").style.background = 'var(--secondary)'
} else{
    document.getElementById("navbar").style.background = ''
}

if(settings.useSystemTheme && !settings.customThemes){
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        currentTheme = settings.defaultThemes.dark;
    } else{
        currentTheme = settings.defaultThemes.light;
    }
}


type ThemeTypes = "light" | "dark" | "none";
class Theme {
    name: string;
    displayName: string;
    themeType: ThemeTypes = "light";
    textColor = "#000000";
    backgroundColor = "#ffffff";
    primaryColor = "#bbbbbb";
    secondaryColor = "#888888";
    accentColor = "#aaaaaa";
    successColor = "#00ff00";
    errorColor = "#da0000";

    constructor(name: string, displayName: string, themeType: ThemeTypes, textColor: string, backgroundColor: string, primaryColor: string, secondaryColor: string, accentColor: string, successColor?: string, errorColor?: string) {
        this.name = name;
        this.displayName = displayName;
        this.themeType = themeType ?? "light";
        this.textColor = textColor ?? "#000000";
        this.backgroundColor = backgroundColor ?? "#ffffff";
        this.primaryColor = primaryColor ?? "#bbbbbb";
        this.secondaryColor = secondaryColor ?? "#888888";
        this.accentColor = accentColor ?? "#aaaaaa";
        this.successColor = successColor ?? "#00ff00";
        this.errorColor = errorColor ?? "#da0000";
    }

    set CSSColors(customThemeColorObj: Settings["customThemeColor"]) {
        this.textColor = customThemeColorObj.text;
        this.backgroundColor = customThemeColorObj.background;
        this.primaryColor = customThemeColorObj.primary;
        this.secondaryColor = customThemeColorObj.secondary;
        this.accentColor = customThemeColorObj.accent;

        // To do: Set success and error colors
        // this.successColor = customThemeColorObj.success;
        // this.errorColor = customThemeColorObj.error;
    }

    get CSSColors(){
        return {
            text: this.textColor,
            background: this.backgroundColor,
            primary: this.primaryColor,
            secondary: this.secondaryColor,
            accent: this.accentColor,
        }
    }

    get ThemeContructorForm() {
        return `('${this.name}', '${this.displayName}', '${this.themeType}', '${this.textColor}', '${this.backgroundColor}', '${this.primaryColor}', '${this.secondaryColor}', '${this.accentColor}', '${this.successColor}', '${this.errorColor}')`
    }

    setCSS() {
        document.querySelectorAll("meta[name='theme-color']").forEach(x => (x as HTMLMetaElement).content = this.secondaryColor);
        localStorage.setItem("currentTheme", this.name)
        currentTheme = this.name
        cssVariables.style.setProperty('--text', this.textColor);
        cssVariables.style.setProperty('--background', this.backgroundColor);
        cssVariables.style.setProperty('--primary', this.primaryColor);
        cssVariables.style.setProperty('--secondary', this.secondaryColor);
        cssVariables.style.setProperty('--accent', this.accentColor);
        cssVariables.style.setProperty('--success', this.successColor);
        cssVariables.style.setProperty('--error', this.errorColor);

        if (settings.pureBlackDarkMode && this.themeType === 'dark') {
            cssVariables.style.setProperty('--background', "#000000");
        }

        customThemeColorSetup()
    }
}

const Themes = {
    custom: new Theme('custom', "Custom", 'none', null, null, null, null, null),

    // Light Themes
    matcha: new Theme('matcha', "Matcha", 'light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098", "#3eff3b", "#9f0000"),
    ice: new Theme('ice', "Ice", 'light', '#081921', '#e2f1f8', '#bae5fd', '#c5aeea', '#84aef1', '#00ff00', '#9f0000'),
    prakiao: new Theme('prakiao', "Prakiao", 'light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "##9f0000"),
    peach: new Theme('peach', "Peach", 'light', "#14120a", "#f7f4e2", "#ffdfcc", "#fed85d", "#ffbda3"),

    //Dark Themes
    hojicha: new Theme('hojicha', "Hojicha", 'dark', '#cbcac8', '#151413', '#2e2c28', '#33483b', '#3a4b3b', '#00ff00', '#da0000'),
    icedark: new Theme('icedark', "Ice", 'dark', '#d0e3ec', '#00061f', '#112345', '#231e3e', '#0d173f', '#00ff00', '#da0000'),
    simpledark: new Theme('simpledark', "Simple", 'dark', '#e2e2e2', '#0f0f0f', '#252525', '#313131', '#202020'),
    choco: new Theme('choco', "Choco", 'dark', "#f8d9d9", "#190f0b", "#604a31", "#63543c", "#951b32"),
    sepia: new Theme('sepia', "Sepia", 'dark', '#bca080', '#201209', '#604129', '#a27e49', '#301e0d'),
}

if (settings.customThemes == false) {
    if (Themes[currentTheme].themeType == "light") {
        themeButton.innerText = "light_mode"
    } else {
        themeButton.innerText = "dark_mode"
    }
} else {
    themeButton.innerText = "palette"
    currentTheme = 'custom'
}

if (settings.customThemes == true && settings.customThemeColor != undefined) {
    Themes['custom'].CSSColors = settings.customThemeColor
}


themeButton.addEventListener('click', () => {
    if (settings.customThemes == false) {
        if (currentTheme == settings.defaultThemes.light) {
            currentTheme = settings.defaultThemes.dark;
            themeButton.innerText = "dark_mode"
        } else {
            currentTheme = settings.defaultThemes.light
            themeButton.innerText = "light_mode"
        }
        localStorage.setItem("currentTheme", currentTheme)
        Themes[currentTheme].setCSS()
    } else {
        (Array.from(document.querySelector("body").children) as HTMLElement[]).forEach(x => x.classList.add("preventTransition"))
        themesDialog.showModal()
    }
})

themesDialog.addEventListener('click', (e) => {
    if(e.target == themesDialog){
        (Array.from(document.querySelector("body").children) as HTMLElement[]).forEach(x => x.classList.remove("preventTransition"))
        themesDialog.close()
    }
})

themesCloseButton.addEventListener('click', () => {
    (Array.from(document.querySelector("body").children) as HTMLElement[]).forEach(x => x.classList.remove("preventTransition"))
    themesDialog.close()
})

themesResetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset themes?")) {
        settings.customThemeColor = {
            text: "#000000",
            background: "#ffffff",
            primary: "#bbbbbb",
            secondary: "#888888",
            accent: "#aaaaaa",
        }
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
        Themes['custom'].CSSColors = settings.customThemeColor
        Themes['custom'].setCSS()
    }
})

try {
    Themes[currentTheme].setCSS()
}
catch {
    Themes[settings.defaultThemes.light].setCSS()
    localStorage.setItem("currentTheme", settings.defaultThemes.light)
}

function insertTheme(name: string, displayName: string, type: ThemeTypes, tailwindObj) {
    return new Theme(name, displayName, type, tailwindObj['text'], tailwindObj['background'], tailwindObj['primary'], tailwindObj['secondary'], tailwindObj['accent'])
}

inputThemeText.addEventListener('input', () => {
    settings.customThemeColor.text = inputThemeText.value
    cssVariables.style.setProperty('--text', settings.customThemeColor.text)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    themeTemplates.value = 'custom'
})

inputThemeBackground.addEventListener('input', () => {
    settings.customThemeColor.background = inputThemeBackground.value
    cssVariables.style.setProperty('--background', settings.customThemeColor.background)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    themeTemplates.value = 'custom'
})
inputThemePrimary.addEventListener('input', () => {
    settings.customThemeColor.primary = inputThemePrimary.value
    cssVariables.style.setProperty('--primary', settings.customThemeColor.primary)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    themeTemplates.value = 'custom'
})

inputThemeSecondary.addEventListener('input', () => {
    settings.customThemeColor.secondary = inputThemeSecondary.value
    cssVariables.style.setProperty('--secondary', settings.customThemeColor.secondary);
    document.querySelectorAll("meta[name='theme-color']").forEach(x => (x as HTMLMetaElement).content = settings.customThemeColor.secondary);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    themeTemplates.value = 'custom'
})

inputThemeAccent.addEventListener('input', () => {
    settings.customThemeColor.accent = inputThemeAccent.value
    cssVariables.style.setProperty('--accent', settings.customThemeColor.accent)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    themeTemplates.value = 'custom'
})

themeTemplates.addEventListener('change', () => {
    settings.customThemeColor = Themes[themeTemplates.value].CSSColors
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    Themes.custom.CSSColors = settings.customThemeColor
    Themes.custom.setCSS()
})


function customThemeColorSetup() {
    if (settings.customThemeColor != undefined) {
        inputThemeText.value = settings.customThemeColor.text ?? Themes[currentTheme].textColor
        inputThemeBackground.value = settings.customThemeColor.background ?? Themes[currentTheme].backgroundColor
        inputThemePrimary.value = settings.customThemeColor.primary ?? Themes[currentTheme].primaryColor
        inputThemeSecondary.value = settings.customThemeColor.secondary ?? Themes[currentTheme].secondaryColor
        inputThemeAccent.value = settings.customThemeColor.accent ?? Themes[currentTheme].accentColor
    } else {
        inputThemeText.value = Themes[currentTheme].textColor
        inputThemeBackground.value = Themes[currentTheme].backgroundColor
        inputThemePrimary.value = Themes[currentTheme].primaryColor
        inputThemeSecondary.value = Themes[currentTheme].secondaryColor
        inputThemeAccent.value = Themes[currentTheme].accentColor
    }
}

// Add themes to Theme Select Tags

    const defaultLight = document.getElementById("defaultLight") as HTMLSelectElement;
    const defaultDark = document.getElementById("defaultDark") as HTMLSelectElement;
    const themeTemplatesLight = document.createElement("optgroup")
    themeTemplatesLight.label = "Light Themes"
    const themeTemplatesDark = document.createElement("optgroup")
    themeTemplatesDark.label = "Dark Themes"

    for (const theme of Object.values(Themes)) {
        const option = document.createElement("option") as HTMLOptionElement;
        const themeTemplateOption = document.createElement("option") as HTMLOptionElement
        themeTemplateOption.value = theme.name
        themeTemplateOption.innerText = theme.displayName
        option.value = theme.name;
        option.innerText = theme.displayName;
        if (theme.name == "custom"){
            themeTemplates.appendChild(themeTemplateOption)
        }
        if (theme.themeType == "light") {
            defaultLight.appendChild(option);
            themeTemplatesLight.appendChild(themeTemplateOption);
        }
        if(theme.themeType == "dark") {
            defaultDark.appendChild(option);
            themeTemplatesDark.appendChild(themeTemplateOption);
        }
    }

    themeTemplates.appendChild(themeTemplatesLight);
    themeTemplates.appendChild(themeTemplatesDark);

    defaultLight.value = settings.defaultThemes.light;
    defaultDark.value = settings.defaultThemes.dark;