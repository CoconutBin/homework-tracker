const themeButton = document.getElementById('themes') as HTMLButtonElement;
const cssVariables = document.querySelector(':root') as HTMLElement
let currentTheme = localStorage.getItem("currentTheme") ?? "fern"

class Theme {
    textColor: string
    backgroundColor: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    textDarkColor: string
    alertColor: string

    constructor(textColor, backgroundColor, primaryColor, secondaryColor, accentColor, textDarkColor, alertColor) {
        this.textColor = textColor ?? "000000";
        this.backgroundColor = backgroundColor ?? "#ffffff";
        this.primaryColor = primaryColor ?? "#000000";
        this.secondaryColor = secondaryColor ?? "#888888";
        this.accentColor = accentColor ?? "#aaaaaa";
        this.textDarkColor = textDarkColor ?? "#ffffff";
        this.alertColor = alertColor ?? "#da0000";
    }

    setCSS(){
        cssVariables.style.setProperty('--text', this.textColor);
        cssVariables.style.setProperty('--background', this.backgroundColor);
        cssVariables.style.setProperty('--primary', this.primaryColor);
        cssVariables.style.setProperty('--secondary', this.secondaryColor);
        cssVariables.style.setProperty('--accent', this.accentColor);
        cssVariables.style.setProperty('--text-dark', this.textDarkColor);
        cssVariables.style.setProperty('--error', this.alertColor);
    }
}

themeButton.addEventListener('click', () => {
    if (currentTheme == "fern") {
        currentTheme = "dark"
    } else {
        currentTheme = "fern"
    }
    localStorage.setItem("currentTheme", currentTheme)
    Themes[currentTheme].setCSS()
})

const Themes = {
    fern: new Theme("#011206", "#f2fef5", "#47c068", "#92c3da", "#6982cb", "#faf7ff", "#da0000"),
    dark: new Theme("#e9f8ed", "#050f02", "#2e5f3b", "#26576e", "#344d98", "#011206", "#da0000"),
    prakiao: new Theme("#130112", "#f8e7f8", "#26437e", "#fdafdf", "#5474bb", "#011206", "#da0000")
}

Themes[currentTheme].setCSS()