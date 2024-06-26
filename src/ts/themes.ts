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

let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;

class Theme {
    name: string;
    themeType: "light" | "dark" = "light";
    textColor = "#000000";
    backgroundColor = "#ffffff";
    primaryColor = "#bbbbbb";
    secondaryColor = "#888888";
    accentColor = "#aaaaaa";
    successColor = "#00ff00";
    errorColor = "#da0000";

    constructor(name, themeType, textColor, backgroundColor, primaryColor, secondaryColor, accentColor, successColor?, errorColor?) {
        this.name = name;
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
    custom: new Theme('custom', 'light', null, null, null, null, null),
    fern: new Theme('fern', 'light', "#011206", "#f2fef5", "#47c068", "#92c3da", "#6982cb", "#faf7ff", "#da0000"),
    simpledark: new Theme('simpledark', 'dark', '#e2e2e2', '#0f0f0f', '#252525', '#313131', '#202020'),
    dark: new Theme('dark', 'dark', '#d6fbf2', '#000a06', '#125e48', '#115385', '#1968da'),
    darkold: new Theme('darkold', 'dark', "#e9f8ed", "#050f02", "#2e5f3b", "#26576e", "#344d98", "#011206", "#da0000"),
    prakiao: new Theme('prakiao', 'light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "#da0000"),
    matcha: new Theme('matcha', 'light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098"),
    choco: new Theme('choco', 'dark', "#f8d9d9", "#190f0b", "#604a31", "#63543c", "#951b32"),
    pneuma: new Theme('pneuma', 'dark', "#fcfdfc", "#2c2b40", "#4e5eda", "#779bf2", "#35a9fc"),
    phutopia: new Theme('phutopia', 'dark', '#ffffff', '#313131', '#490F66', '#2c0544', '#000000'),
    peach: new Theme('peach', 'light', "#14120a", "#f7f4e2", "#fbd2d2", "#ffe679", "#ffb7b7"),
    peachnew: new Theme('peachnew', 'light', "#14120a", "#f7f4e2", "#fbe1d2", "#ffe279", "#ffcbb7"),
    paper: new Theme('paper', 'light', null, null, null, null, null),
    ice: insertTheme('ice', 'light', { 'text': '#081921', 'background': '#e2f1f8', 'primary': '#bae5fd', 'secondary': '#c5aeea', 'accent': '#84aef1', }),
    icedark: insertTheme('icedark', 'dark', { 'text': '#deeff7', 'background': '#07161d', 'primary': '#022e45', 'secondary': '#2c1551', 'accent': '#511b64' }),
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

if(settings.customThemes == true && settings.customThemeColor != undefined) {
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

try {
    Themes[currentTheme].setCSS()
}
catch {
    Themes[settings.defaultThemes.light].setCSS()
    localStorage.setItem("currentTheme", settings.defaultThemes.light)
}

function insertTheme(name, type, tailwindObj) {
    return new Theme(name, type, tailwindObj['text'], tailwindObj['background'], tailwindObj['primary'], tailwindObj['secondary'], tailwindObj['accent'])
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


