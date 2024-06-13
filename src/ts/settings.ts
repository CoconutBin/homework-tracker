// const sortButton = document.getElementById('sort') as HTMLButtonElement;
const settingsButton = document.getElementById('settings') as HTMLButtonElement;

/*
sortButton.addEventListener("click", () => {
    alert("Sort Function is currently not avaliable")
})
*/

const settingsContainer = document.getElementById("settingsContainer");
const settingsModal = document.getElementById("settingsModal");
const settingsDiv = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const defaultDarkThemeSetting = document.getElementById("defaultDark") as HTMLSelectElement;
const defaultLightThemeSetting = document.getElementById("defaultLight") as HTMLSelectElement;

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

defaultDarkThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.dark = defaultDarkThemeSetting.value
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))
    
    if(Themes[currentTheme].themeType == "dark"){
        Themes[settings.defaultThemes.dark].setCSS()
        localStorage.setItem("currentTheme", settings.defaultThemes.dark)
    }
})

defaultLightThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.light = defaultLightThemeSetting.value
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject))

    if(Themes[currentTheme].themeType == "light"){
        Themes[settings.defaultThemes.light].setCSS()
        localStorage.setItem("currentTheme", settings.defaultThemes.light)
    }
})

class Settings{
    
    defaultThemes: {
        light: string,
        dark: string
    }

    constructor(defaultLightTheme?, defautDarkTheme?){
        this.defaultThemes = {
            light: defaultLightTheme,
            dark: defautDarkTheme
        }
    }

    get settingsObject(){
        return {
            defaultThemes: {
                light: defaultLightThemeSetting.value,
                dark: defaultDarkThemeSetting.value
            }
        }
    }

    set settingsObject(obj){
        this.defaultThemes = obj.defaultThemes
    }
}

const settings = new Settings()

if(localStorage.getItem("settings") != null){
settings.settingsObject = JSON.parse(localStorage.getItem("settings"))
} else{
    settings.defaultThemes = {light: "matcha", dark: "dark"}
}

defaultDarkThemeSetting.value = settings.defaultThemes.dark
defaultLightThemeSetting.value = settings.defaultThemes.light