const themeButton = document.getElementById('themes') as HTMLButtonElement;
const cssVariables = document.querySelector(':root') as HTMLElement
const themesContainer = document.getElementById("themesContainer") as HTMLElement;
const themesModal = document.getElementById("themesModal") as HTMLElement;
const themesDiv = document.getElementById("customThemesScreen") as HTMLElement;
const themesCloseButton = document.getElementById("themesCloseButton") as HTMLButtonElement;
const inputThemeText = document.getElementById("inputThemeText") as HTMLInputElement;
const inputThemeBackground = document.getElementById("inputThemeBackground") as HTMLInputElement;
const inputThemePrimary = document.getElementById("inputThemePrimary") as HTMLInputElement;
const inputThemeSecondary = document.getElementById("inputThemeSecondary") as HTMLInputElement;
const inputThemeAccent = document.getElementById("inputThemeAccent") as HTMLInputElement;
const themesResetButton = document.getElementById('themesResetButton') as HTMLButtonElement

let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;

type ThemeTypes = "light" | "dark";
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

    get ThemeContructorForm() {
        return `('${this.name}', '${this.displayName}', '${this.themeType}', '${this.textColor}', '${this.backgroundColor}', '${this.primaryColor}', '${this.secondaryColor}', '${this.accentColor}', '${this.successColor}', '${this.errorColor}')`
    }

    setCSS() {
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
    custom: new Theme('custom', "Custom", 'light', null, null, null, null, null),

    // Light Themes
    matcha: new Theme('matcha', "Matcha", 'light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098"),
    ice: new Theme('ice', "Ice", 'light', '#081921', '#e2f1f8', '#bae5fd', '#c5aeea', '#84aef1', '#00ff00', '#da0000'),
    prakiao: new Theme('prakiao', "Prakiao", 'light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "#da0000"),
    peach: new Theme('peach', "Peach", 'light', "#14120a", "#f7f4e2", "#fbd2d2", "#ffe679", "#ffb7b7"),
    peachnew: new Theme('peachnew', "Peach (New)", 'light', "#14120a", "#f7f4e2", "#ffdfcc", "#fed85d", "#ffbda3"),

    //Dark Themes
    simpledark: new Theme('simpledark', "Simple", 'dark', '#e2e2e2', '#0f0f0f', '#252525', '#313131', '#202020'),
    choco: new Theme('choco', "Choco", 'dark', "#f8d9d9", "#190f0b", "#604a31", "#63543c", "#951b32"),
    icedark: new Theme('icedark', "Ice", 'dark', '#deeff7', '#00061e', '#152e60', '#261c5a', '#142152', '#00ff00', '#da0000'),
    deepsea: new Theme('deepsea', "Deep Sea", 'dark', '#ffffff', '#0c1b27', '#062651', '#3a5d83', '#163d6a', '#00ff00', '#da0000'),
    phutopia: new Theme('phutopia', "Peam", 'dark', '#ffffff', '#313131', '#490F66', '#2c0544', '#000000'),
    pneuma: new Theme('pneuma', "Pneuma", 'dark', '#e1e7f6', '#30354c','#2d4586' , '#698cd2', '#1a1f68'),
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
        themesContainer.style.display = "block"
        themesModal.style.display = "block"
        themesDiv.style.display = "block"
    }
})

themesModal.addEventListener('click', () => {
    (Array.from(document.querySelector("body").children) as HTMLElement[]).forEach(x => x.classList.remove("preventTransition"))
    themesContainer.style.display = "none"
})

themesCloseButton.addEventListener('click', () => {
    (Array.from(document.querySelector("body").children) as HTMLElement[]).forEach(x => x.classList.remove("preventTransition"))
    themesContainer.style.display = "none"
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
})

inputThemeBackground.addEventListener('input', () => {
    settings.customThemeColor.background = inputThemeBackground.value
    cssVariables.style.setProperty('--background', settings.customThemeColor.background)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
})
inputThemePrimary.addEventListener('input', () => {
    settings.customThemeColor.primary = inputThemePrimary.value
    cssVariables.style.setProperty('--primary', settings.customThemeColor.primary)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
})

inputThemeSecondary.addEventListener('input', () => {
    settings.customThemeColor.secondary = inputThemeSecondary.value
    cssVariables.style.setProperty('--secondary', settings.customThemeColor.secondary)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
})

inputThemeAccent.addEventListener('input', () => {
    settings.customThemeColor.accent = inputThemeAccent.value
    cssVariables.style.setProperty('--accent', settings.customThemeColor.accent)
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
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
{
    const defaultLight = document.getElementById("defaultLight") as HTMLSelectElement;
    const defaultDark = document.getElementById("defaultDark") as HTMLSelectElement;

    for (const theme of Object.values(Themes)) {
        if (theme.name == "custom") continue;
        const option = document.createElement("option") as HTMLOptionElement;
        option.value = theme.name;
        option.innerText = theme.displayName;
        if (theme.themeType == "light") {
            defaultLight.appendChild(option);
        } else {
            defaultDark.appendChild(option);
        }
    }

    defaultLight.value = settings.defaultThemes.light;
    defaultDark.value = settings.defaultThemes.dark;
}
