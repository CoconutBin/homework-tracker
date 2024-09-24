const sortButton = document.getElementById('sort');
const settingsButton = document.getElementById('settings');
const sortDialog = document.getElementById('sortContainer');
const sortScreen = document.getElementById('sortScreen');
const sortType = document.getElementById('sortType');
const sortArrange = document.getElementById('sortArrange');
const sortArrangeBlock = document.getElementById('sortArrangeBlock');
const sortCloseButton = document.getElementById('sortCloseButton');
const toSortButton = document.getElementById('sortButton');
if (sortType.value != 'dueDate') {
    sortArrangeBlock.style.display = 'none';
}
sortButton.addEventListener("click", () => {
    sortDialog.showModal();
});
sortDialog.addEventListener("click", (e) => {
    if (e.target == sortDialog) {
        sortDialog.close();
    }
});
sortCloseButton.addEventListener("click", () => {
    sortDialog.close();
});
toSortButton.addEventListener("click", () => {
    let sortedListContents = [];
    switch (sortType.value) {
        case "subjectName":
            renderList([]);
            sortedListContents = listContents.toSorted((a, b) => a.subject.name.localeCompare(b.subject.name));
            localStorage.setItem("listContents", JSON.stringify(sortedListContents));
            listContents.splice(0, listContents.length);
            renderList(sortedListContents);
            sortDialog.close();
            break;
        case "dueDate":
            switch (sortArrange.value) {
                case "closefar":
                    renderList([]);
                    sortedListContents = listContents.toSorted(function (a, b) {
                        if (isNaN(Date.parse(a.dueDate))) {
                            return isNaN(Date.parse(b.dueDate)) ? 1 : Date.parse(b.dueDate);
                        }
                        else {
                            return isNaN(Date.parse(b.dueDate)) ? -1 : Date.parse(a.dueDate) - Date.parse(b.dueDate);
                        }
                    });
                    localStorage.setItem("listContents", JSON.stringify(sortedListContents));
                    listContents.splice(0, listContents.length);
                    renderList(sortedListContents);
                    sortDialog.close();
                    break;
                case "farclose":
                    renderList([]);
                    sortedListContents = listContents.toSorted(function (a, b) {
                        if (isNaN(Date.parse(a.dueDate))) {
                            return isNaN(Date.parse(b.dueDate)) ? 1 : Date.parse(b.dueDate);
                        }
                        else {
                            return isNaN(Date.parse(b.dueDate)) ? -1 : Date.parse(b.dueDate) - Date.parse(a.dueDate);
                        }
                    });
                    localStorage.setItem("listContents", JSON.stringify(sortedListContents));
                    listContents.splice(0, listContents.length);
                    renderList(sortedListContents);
                    sortDialog.close();
                    break;
            }
            break;
    }
});
sortType.addEventListener("change", () => {
    switch (sortType.value) {
        case "subjectName":
            sortArrangeBlock.style.display = "none";
            break;
        case "dueDate":
            sortArrangeBlock.style.display = "block";
            break;
    }
});
class Settings {
    defaultThemes;
    pureBlackDarkMode;
    customThemes;
    customThemeColor;
    rightToLeft;
    subjectNameClick;
    analytics;
    systemFont;
    noGradientNavbars;
    allowNotifications;
    swappableHomeworks;
    themeType;
    initializeDefaults() {
        this.defaultThemes = {
            light: "matcha",
            dark: "hojicha"
        };
        this.noGradientNavbars = false;
        this.pureBlackDarkMode = false;
        this.rightToLeft = false;
        this.customThemes = false;
        this.customThemeColor = {};
        this.subjectNameClick = "";
        this.analytics = false;
        this.systemFont = false;
        this.allowNotifications = true;
        this.themeType = 'system';
        this.swappableHomeworks = true;
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
            allowNotifications: this.allowNotifications,
            themeType: this.themeType,
            swappableHomeworks: this.swappableHomeworks,
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
        this.allowNotifications = obj.allowNotifications;
        this.themeType = obj.themeType;
        this.swappableHomeworks = obj.swappableHomeworks;
    }
}
const settings = new Settings();
const settingsDialog = document.getElementById("settingsContainer");
const settingsDiv = document.getElementById("settingsScreen");
const settingsCloseButton = document.getElementById("settingsCloseButton");
const settingsresetButton = document.getElementById('settingsResetButton');
const defaultDarkThemeSetting = document.getElementById("defaultDark");
const defaultLightThemeSetting = document.getElementById("defaultLight");
const rightToLeft = document.getElementById("rightToLeft");
const noGradientNavbars = document.getElementById("noGradientNavbars");
const subjectNameClick = document.getElementById("subjectNameClick");
const pureBlackDarkMode = document.getElementById('pureBlackDarkMode');
const customThemes = document.getElementById('customThemes');
const analytics = document.getElementById('analytics');
const analyticsDiv = document.getElementById("analyticsDiv");
const quickAddSetup = document.getElementById("quickAddSetup");
const systemFont = document.getElementById("systemFont");
const quickAddDialog = document.getElementById("quickAddDialog");
const quickAddDiv = document.getElementById("quickAddScreen");
const quickAddTextArea = document.getElementById("quickAddTextArea");
const quickAddImportButton = document.getElementById("quickAddImportButton");
const quickAddExportButton = document.getElementById("quickAddExportButton");
const quickAddCancelButton = document.getElementById("quickAddCancelButton");
const allowNotifications = document.getElementById("allowNotifications");
const chooseTheme = document.getElementById("chooseTheme");
const swappableHomeworks = document.getElementById("swappableHomeworks");
settingsButton.addEventListener("click", () => {
    settingsDialog.showModal();
});
settingsDialog.addEventListener("click", (e) => {
    if (e.target == settingsDialog) {
        settingsDialog.close();
    }
});
settingsCloseButton.addEventListener("click", () => {
    settingsDialog.close();
});
settingsresetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset settings?")) {
        settings.reset();
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
        Themes[currentTheme].setCSS();
        defaultDarkThemeSetting.value = settings.defaultThemes.dark;
        defaultLightThemeSetting.value = settings.defaultThemes.light;
        rightToLeft.checked = settings.rightToLeft;
        if (subjectNameClick != undefined)
            subjectNameClick.value = settings.subjectNameClick;
        if (pureBlackDarkMode != undefined)
            pureBlackDarkMode.checked = settings.pureBlackDarkMode;
        list.style.flexDirection = "row";
    }
});
swappableHomeworks.addEventListener("change", () => {
    settings.swappableHomeworks = swappableHomeworks.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
});
defaultDarkThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.dark = defaultDarkThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "dark") {
        Themes[settings.defaultThemes.dark].setCSS();
    }
});
defaultLightThemeSetting.addEventListener("change", () => {
    settings.defaultThemes.light = defaultLightThemeSetting.value;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (Themes[currentTheme].themeType == "light") {
        Themes[settings.defaultThemes.light].setCSS();
    }
});
systemFont.addEventListener("change", () => {
    settings.systemFont = systemFont.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.systemFont) {
        document.body.style.fontFamily = "system-ui, sans-serif";
    }
    else {
        document.body.style.fontFamily = '"Nunito", system-ui, sans-serif';
    }
});
rightToLeft.addEventListener("change", () => {
    settings.rightToLeft = rightToLeft.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    rtlFormat(rightToLeft.checked);
});
pureBlackDarkMode.addEventListener("change", () => {
    settings.pureBlackDarkMode = pureBlackDarkMode.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    Themes[currentTheme].setCSS();
});
customThemes.addEventListener("change", () => {
    settings.customThemes = customThemes.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.customThemes) {
        defaultDarkThemeSetting.disabled = true;
        defaultLightThemeSetting.disabled = true;
        chooseTheme.disabled = true;
        pureBlackDarkMode.disabled = true;
        themeButton.textContent = "palette";
        themeButton.title = "Cutomize Theme";
        if (settings.customThemeColor == undefined || Object.values(settings.customThemeColor).length == 0) {
            console.log(currentTheme);
            settings.customThemeColor = {
                text: Themes[currentTheme].textColor,
                background: Themes[currentTheme].backgroundColor,
                primary: Themes[currentTheme].primaryColor,
                secondary: Themes[currentTheme].secondaryColor,
                accent: Themes[currentTheme].accentColor
            };
        }
        Themes['custom'].CSSColors = settings.customThemeColor;
        Themes['custom'].setCSS();
    }
    else {
        function themeDeterminer(hexcolor) {
            let splitHex = hexcolor.match(/[0-9a-f]{2}/gi);
            if (((parseInt(splitHex[0], 16) + parseInt(splitHex[1], 16) + parseInt(splitHex[2], 16)) / 3) < 30) {
                return "dark";
            }
            else {
                return "light";
            }
        }
        if (themeDeterminer(settings.customThemeColor.background) == "light") {
            themeButton.textContent = "light_mode";
            Themes[settings.defaultThemes.light].setCSS();
        }
        else {
            themeButton.textContent = "dark_mode";
            Themes[settings.defaultThemes.dark].setCSS();
        }
        themeButton.title = "Dark/Light Theme";
        defaultDarkThemeSetting.disabled = false;
        defaultLightThemeSetting.disabled = false;
        chooseTheme.disabled = false;
        pureBlackDarkMode.disabled = false;
    }
});
noGradientNavbars.addEventListener("change", () => {
    settings.noGradientNavbars = noGradientNavbars.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    if (settings.noGradientNavbars) {
        document.getElementById("navbar").style.background = 'var(--secondary)';
    }
    else {
        document.getElementById("navbar").style.background = '';
    }
});
allowNotifications.addEventListener("change", () => {
    settings.allowNotifications = allowNotifications.checked;
    localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    askNotificationPermission();
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "denied") {
            settings.allowNotifications = false;
            allowNotifications.checked = false;
            localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
            alert("You must give Notification Permissions to use Notifications");
        }
    });
});
if (quickAddSetup != undefined) {
    quickAddSetup.addEventListener("click", () => {
        settingsDialog.close();
        quickAddDialog.showModal();
        quickAddDiv.style.display = "block";
    });
    quickAddDialog.addEventListener("click", (e) => {
        if (e.target == quickAddDialog) {
            quickAddDialog.close();
        }
    });
    quickAddExportButton.addEventListener("click", (e) => {
        quickAddTextArea.value = localStorage.getItem("currentSchedule");
        quickAddTextArea.select();
        navigator.clipboard.writeText(localStorage.getItem("currentSchedule"));
    });
    quickAddImportButton.addEventListener("click", (e) => {
        localStorage.setItem("currentSchedule", quickAddTextArea.value);
        console.log(`saved ${quickAddTextArea.value} into localStorage`);
        currentSchedule.scheduleObject = JSON.parse(localStorage.getItem("currentSchedule"));
        quickAddDialog.close();
    });
    quickAddCancelButton.addEventListener("click", (e) => {
        quickAddDialog.close();
    });
}
if (analytics != undefined) {
    analytics.addEventListener("change", () => {
        settings.analytics = analytics.checked;
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
        if (settings.analytics) {
            analyticsDiv.classList.add("to-shown");
            analyticsDiv.classList.remove("to-none");
            analyticsDiv.style.display = "flex";
            list.style.height = "calc(50vh - 15px)";
        }
        else {
            analyticsDiv.classList.add("to-none");
            analyticsDiv.classList.remove("to-shown");
            list.style.height = "auto";
        }
    });
}
if (subjectNameClick != undefined) {
    subjectNameClick.addEventListener("change", () => {
        settings.subjectNameClick = subjectNameClick.value;
        localStorage.setItem("settings", JSON.stringify(settings.settingsObject));
    });
}
if (localStorage.getItem("settings") != null) {
    if (JSON.parse(localStorage.getItem("settings")).useSystemTheme) {
        let localStorageSettings = JSON.parse(localStorage.getItem("settings"));
        localStorageSettings.themeType = 'system';
        localStorage.setItem("settings", JSON.stringify(localStorageSettings));
    }
    settings.settingsObject = JSON.parse(localStorage.getItem("settings"));
}
try {
    swappableHomeworks.checked = settings.swappableHomeworks;
    rightToLeft.checked = settings.rightToLeft;
    systemFont.checked = settings.systemFont;
    chooseTheme.value = settings.themeType;
    noGradientNavbars.checked = settings.noGradientNavbars;
    allowNotifications.checked = settings.allowNotifications;
    if (customThemes != undefined) {
        customThemes.checked = settings.customThemes;
    }
    if (subjectNameClick != undefined)
        subjectNameClick.value = settings.subjectNameClick;
    if (pureBlackDarkMode != undefined)
        pureBlackDarkMode.checked = settings.pureBlackDarkMode;
    if (settings.customThemes) {
        defaultDarkThemeSetting.disabled = true;
        defaultLightThemeSetting.disabled = true;
        pureBlackDarkMode.disabled = true;
    }
    if (analytics != undefined)
        analytics.checked = settings.analytics;
}
catch (e) {
    console.error(e);
}
function rtlFormat(bool) {
    let listItemDisplay = document.querySelectorAll(".listItemDisplay");
    let subjectNameContainer = document.querySelectorAll(".subjectNameContainer");
    if (bool) {
        list.style.flexDirection = "row-reverse";
        listItemDisplay.forEach(x => x.style.textAlign = "right");
        subjectNameContainer.forEach(x => x.style.flexDirection = "row-reverse");
    }
    else {
        list.style.flexDirection = "row";
        listItemDisplay.forEach(x => x.style.textAlign = "left");
        subjectNameContainer.forEach(x => x.style.flexDirection = "row");
    }
}
rtlFormat(rightToLeft.checked);
if (analyticsDiv != undefined) {
    if (settings.analytics) {
        analyticsDiv.style.display = "flex";
        list.style.height = "calc(50vh - 15px)";
    }
    else {
        analyticsDiv.style.display = "none";
        list.style.height = "auto";
    }
}
if (settings.systemFont) {
    document.body.style.fontFamily = "system-ui, sans-serif";
}
else {
    document.body.style.fontFamily = '"Nunito", system-ui, sans-serif';
}
// About Screen
const aboutButton = document.getElementById("aboutButton");
const aboutDialog = document.getElementById("aboutContainer");
const aboutScreen = document.getElementById("aboutScreen");
const aboutCloseButton = document.getElementById("aboutCloseButton");
const aboutVersion = document.getElementById("version");
const aboutSource = document.getElementById("source");
aboutButton.addEventListener("click", () => {
    settingsDialog.close();
    aboutDialog.showModal();
});
aboutDialog.addEventListener("click", (e) => {
    if (e.target == aboutDialog) {
        aboutDialog.close();
    }
});
aboutCloseButton.addEventListener("click", () => {
    aboutDialog.close();
});
aboutVersion.textContent = `Version: V.${version}`;
aboutSource.style.textDecoration = "none";
aboutSource.style.color = "var(--text)";
