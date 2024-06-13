const themeButton = document.getElementById('themes');
const cssVariables = document.querySelector(':root');
let currentTheme = localStorage.getItem("currentTheme") ?? settings.defaultThemes.light;
class Theme {
    themeType = "light";
    textColor = "#000000";
    backgroundColor = "#ffffff";
    primaryColor = "#bbbbbb";
    secondaryColor = "#888888";
    accentColor = "#aaaaaa";
    successColor = "#00ff00";
    errorColor = "#da0000";
    constructor(themeType, textColor, backgroundColor, primaryColor, secondaryColor, accentColor, successColor, errorColor) {
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
        cssVariables.style.setProperty('--text', this.textColor);
        cssVariables.style.setProperty('--background', this.backgroundColor);
        cssVariables.style.setProperty('--primary', this.primaryColor);
        cssVariables.style.setProperty('--secondary', this.secondaryColor);
        cssVariables.style.setProperty('--accent', this.accentColor);
        cssVariables.style.setProperty('--text-dark', this.successColor);
        cssVariables.style.setProperty('--error', this.errorColor);
    }
}
themeButton.addEventListener('click', () => {
    if (currentTheme == settings.defaultThemes.light) {
        currentTheme = settings.defaultThemes.dark;
    }
    else {
        currentTheme = settings.defaultThemes.light;
    }
    localStorage.setItem("currentTheme", currentTheme);
    Themes[currentTheme].setCSS();
});
const Themes = {
    fern: new Theme('light', "#011206", "#f2fef5", "#47c068", "#92c3da", "#6982cb", "#faf7ff", "#da0000"),
    dark: new Theme('dark', '#d6fbf2', '#032117', '#157c5e', '#0d5891', '#1968da'),
    darkold: new Theme('dark', "#e9f8ed", "#050f02", "#2e5f3b", "#26576e", "#344d98", "#011206", "#da0000"),
    prakiao: new Theme('light', "#130112", "#f8e7f8", "#7995cd", "#fdafdf", "#5474bb", "#011206", "#da0000"),
    matcha: new Theme('light', "#0f0e0a", "#f3e6d5", "#a29b75", "#aac6ab", "#8ab098"),
    choco: new Theme('dark', "#fff8ff", "#150507", "#caa5ac", "#bca667", "#afb078"),
    pneuma: new Theme('dark', "#fcfdfc", "#2c2b40", "#4e5eda", "#779bf2", "#35a9fc"),
    paper: new Theme('light', null, null, null, null, null)
};
try {
    Themes[currentTheme].setCSS();
}
catch {
    Themes[settings.defaultThemes.light].setCSS();
    localStorage.setItem("currentTheme", settings.defaultThemes.light);
}
