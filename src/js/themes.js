const themeButton = document.getElementById('themes');
const cssVariables = document.querySelector(':root');
const themesContainer = document.getElementById("themesContainer");
const themesModal = document.getElementById("themesModal");
const themesDiv = document.getElementById("customThemesScreen");
const themesCloseButton = document.getElementById("themesCloseButton");
const inputThemeText = document.getElementById("inputThemeText");
const inputThemeBackground = document.getElementById("inputThemeBackground");
const inputThemePrimary = document.getElementById("inputThemePrimary");
const inputThemeSecondary = document.getElementById("inputThemeSecondary");
const inputThemeAccent = document.getElementById("inputThemeAccent");
let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;
class Theme {
    name;
    displayName;
    themeType = "light";
    textColor = "#000000";
    backgroundColor = "#ffffff";
    primaryColor = "#bbbbbb";
    secondaryColor = "#888888";
    accentColor = "#aaaaaa";
    successColor = "#00ff00";
    errorColor = "#da0000";
    constructor(name, displayName, themeType, textColor, backgroundColor, primaryColor, secondaryColor, accentColor, successColor, errorColor) {
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
    set CSSColors(customThemeColorObj) {
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
        return `('${this.name}', '${this.themeType}', '${this.textColor}', '${this.backgroundColor}', '${this.primaryColor}', '${this.secondaryColor}', '${this.accentColor}', '${this.successColor}', '${this.errorColor}')`;
    }
    setCSS() {
        localStorage.setItem("currentTheme", this.name);
        currentTheme = this.name;
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
        customThemeColorSetup();
    }
}
const Themes = {
    custom: new Theme('custom', "Custom", 'light', null, null, null, null, null),
    matcha: new Theme('matcha', "Matcha", 'light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098"),
    simpledark: new Theme('simpledark', "Simple", 'dark', '#e2e2e2', '#0f0f0f', '#252525', '#313131', '#202020'),
    dark: new Theme('dark', "Dark", 'dark', '#d6fbf2', '#000a06', '#125e48', '#115385', '#1968da'),
    darkold: new Theme('darkold', "Dark (Old)", 'dark', "#e9f8ed", "#050f02", "#2e5f3b", "#26576e", "#344d98", "#011206", "#da0000"),
    prakiao: new Theme('prakiao', "Prakiao", 'light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "#da0000"),
    choco: new Theme('choco', "Choco", 'dark', "#f8d9d9", "#190f0b", "#604a31", "#63543c", "#951b32"),
    pneuma: new Theme('pneuma', "Pneuma", 'dark', "#fcfdfc", "#2c2b40", "#4e5eda", "#779bf2", "#35a9fc"),
    phutopia: new Theme('phutopia', "Peam", 'dark', '#ffffff', '#313131', '#490F66', '#2c0544', '#000000'),
    peach: new Theme('peach', "Peach", 'light', "#14120a", "#f7f4e2", "#fbd2d2", "#ffe679", "#ffb7b7"),
    peachnew: new Theme('peachnew', "Peach (New)", 'light', "#14120a", "#f7f4e2", "#fbe1d2", "#ffe279", "#ffcbb7"),
    deepsea: new Theme('deepsea', "Deep Sea", 'dark', '#ffffff', '#0c1b27', '#062651', '#3a5d83', '#163d6a', '#00ff00', '#da0000'),
    ice: new Theme('ice', "Ice", 'light', '#081921', '#e2f1f8', '#bae5fd', '#c5aeea', '#84aef1', '#00ff00', '#da0000'),
    icedark: insertTheme('icedark', "Mario64", 'dark', { 'text': '#deeff7', 'background': '#07161d', 'primary': '#022e45', 'secondary': '#2c1551', 'accent': '#511b64' }),
};
if (settings.customThemes == false) {
    if (Themes[currentTheme].themeType == "light") {
        themeButton.innerText = "light_mode";
    }
    else {
        themeButton.innerText = "dark_mode";
    }
}
else {
    themeButton.innerText = "palette";
    currentTheme = 'custom';
}
if (settings.customThemes == true && settings.customThemeColor != undefined) {
    Themes['custom'].CSSColors = settings.customThemeColor;
}
themeButton.addEventListener('click', () => {
    if (settings.customThemes == false) {
        if (currentTheme == settings.defaultThemes.light) {
            currentTheme = settings.defaultThemes.dark;
            themeButton.innerText = "dark_mode";
        }
        else {
            currentTheme = settings.defaultThemes.light;
            themeButton.innerText = "light_mode";
        }
        localStorage.setItem("currentTheme", currentTheme);
        Themes[currentTheme].setCSS();
    }
    else {
        Array.from(document.querySelector("body").children).forEach(x => x.classList.add("preventTransition"));
        themesContainer.style.display = "block";
        themesModal.style.display = "block";
        themesDiv.style.display = "block";
    }
});
themesModal.addEventListener('click', () => {
    Array.from(document.querySelector("body").children).forEach(x => x.classList.remove("preventTransition"));
    themesContainer.style.display = "none";
});
themesCloseButton.addEventListener('click', () => {
    Array.from(document.querySelector("body").children).forEach(x => x.classList.remove("preventTransition"));
    themesContainer.style.display = "none";
});
try {
    Themes[currentTheme].setCSS();
}
catch {
    Themes[settings.defaultThemes.light].setCSS();
    localStorage.setItem("currentTheme", settings.defaultThemes.light);
}
function insertTheme(name, displayName, type, tailwindObj) {
    return new Theme(name, displayName, type, tailwindObj['text'], tailwindObj['background'], tailwindObj['primary'], tailwindObj['secondary'], tailwindObj['accent']);
}
inputThemeText.addEventListener('input', () => {
    settings.customThemeColor.text = inputThemeText.value;
    cssVariables.style.setProperty('--text', settings.customThemeColor.text);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
inputThemeBackground.addEventListener('input', () => {
    settings.customThemeColor.background = inputThemeBackground.value;
    cssVariables.style.setProperty('--background', settings.customThemeColor.background);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
inputThemePrimary.addEventListener('input', () => {
    settings.customThemeColor.primary = inputThemePrimary.value;
    cssVariables.style.setProperty('--primary', settings.customThemeColor.primary);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
inputThemeSecondary.addEventListener('input', () => {
    settings.customThemeColor.secondary = inputThemeSecondary.value;
    cssVariables.style.setProperty('--secondary', settings.customThemeColor.secondary);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
inputThemeAccent.addEventListener('input', () => {
    settings.customThemeColor.accent = inputThemeAccent.value;
    cssVariables.style.setProperty('--accent', settings.customThemeColor.accent);
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
function customThemeColorSetup() {
    if (settings.customThemeColor != undefined) {
        inputThemeText.value = settings.customThemeColor.text ?? Themes[currentTheme].textColor;
        inputThemeBackground.value = settings.customThemeColor.background ?? Themes[currentTheme].backgroundColor;
        inputThemePrimary.value = settings.customThemeColor.primary ?? Themes[currentTheme].primaryColor;
        inputThemeSecondary.value = settings.customThemeColor.secondary ?? Themes[currentTheme].secondaryColor;
        inputThemeAccent.value = settings.customThemeColor.accent ?? Themes[currentTheme].accentColor;
    }
    else {
        inputThemeText.value = Themes[currentTheme].textColor;
        inputThemeBackground.value = Themes[currentTheme].backgroundColor;
        inputThemePrimary.value = Themes[currentTheme].primaryColor;
        inputThemeSecondary.value = Themes[currentTheme].secondaryColor;
        inputThemeAccent.value = Themes[currentTheme].accentColor;
    }
}
// Add themes to Theme Select Tags
{
    const defaultLight = document.getElementById("defaultLight");
    const defaultDark = document.getElementById("defaultDark");
    for (const theme of Object.values(Themes)) {
        if (theme.name == "custom")
            continue;
        const option = document.createElement("option");
        option.value = theme.name;
        option.innerText = theme.displayName;
        if (theme.themeType == "light") {
            defaultLight.appendChild(option);
        }
        else {
            defaultDark.appendChild(option);
        }
    }
    defaultLight.value = settings.defaultThemes.light;
    defaultDark.value = settings.defaultThemes.dark;
}
