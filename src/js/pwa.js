if (navigator.setAppBadge) {
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            try {
                navigator.setAppBadge(listContents.length);
            }
            catch (e) {
                console.error(e);
            }
            ;
        }
        else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                try {
                    navigator.setAppBadge(listContents.length);
                }
                catch (e) {
                    console.error(e);
                }
                ;
            });
        }
        // Don't do anything if the permission was denied.
    });
}
document.getElementById("list").addEventListener("change", () => {
    if (navigator.setAppBadge) {
        navigator.permissions.query({ name: "notifications" }).then((result) => {
            if (result.state === "granted") {
                try {
                    navigator.setAppBadge(listContents.length);
                }
                catch (e) {
                    console.error(e);
                }
                ;
            }
        });
    }
});
function askNotificationPermission() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return;
    }
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            return;
        }
        else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                return;
            });
        }
        // Don't do anything if the permission was denied.
    });
}
