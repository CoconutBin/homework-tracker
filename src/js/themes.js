const themeButton = document.getElementById('themes');
const cssVariables = document.querySelector(':root');
let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;
class Theme {
    name;
    themeType = "light";
    textColor = "#000000";
    backgroundColor = "#ffffff";
    primaryColor = "#bbbbbb";
    secondaryColor = "#888888";
    accentColor = "#aaaaaa";
    successColor = "#00ff00";
    errorColor = "#da0000";
    constructor(name, themeType, textColor, backgroundColor, primaryColor, secondaryColor, accentColor, successColor, errorColor) {
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
    }
}
const Themes = {
    fern: new Theme('fern', 'light', "#011206", "#f2fef5", "#47c068", "#92c3da", "#6982cb", "#faf7ff", "#da0000"),
    dark: new Theme('dark', 'dark', '#d6fbf2', '#000a06', '#125e48', '#115385', '#1968da'),
    darkold: new Theme('darkold', 'dark', "#e9f8ed", "#050f02", "#2e5f3b", "#26576e", "#344d98", "#011206", "#da0000"),
    prakiao: new Theme('prakiao', 'light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "#da0000"),
    matcha: new Theme('matcha', 'light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098"),
    choco: new Theme('choco', 'dark', "#f8d9d9", "#190f0b", "#604a31", "#63543c", "#951b32"),
    pneuma: new Theme('pneuma', 'dark', "#fcfdfc", "#2c2b40", "#4e5eda", "#779bf2", "#35a9fc"),
    phutopia: new Theme('phutopia', 'dark', '#ffffff', '#313131', '#490F66', '#2c0544', '#000000'),
    paper: new Theme('paper', 'light', null, null, null, null, null),
};
if (Themes[currentTheme].themeType == "light") {
    themeButton.innerText = "light_mode";
}
else {
    themeButton.innerText = "dark_mode";
}
themeButton.addEventListener('click', () => {
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
});
try {
    Themes[currentTheme].setCSS();
}
catch {
    Themes[settings.defaultThemes.light].setCSS();
    localStorage.setItem("currentTheme", settings.defaultThemes.light);
}
