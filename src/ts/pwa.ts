if (navigator.setAppBadge) {
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            navigator.setAppBadge(listContents.length)
        } else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                navigator.setAppBadge(listContents.length);
              });
        }
        // Don't do anything if the permission was denied.
    });
}

document.getElementById("list").addEventListener("change", () => {
    if (navigator.setAppBadge) {
        navigator.permissions.query({ name: "notifications" }).then((result) => {
            if (result.state === "granted") {
                navigator.setAppBadge(listContents.length)
            }
        });
    }
})

function askNotificationPermission() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            return;
        } else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                return;
              });
        }
        // Don't do anything if the permission was denied.
    });
}