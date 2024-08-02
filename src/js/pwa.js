if (navigator.setAppBadge) {
    navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
            navigator.setAppBadge(listContents.length);
        }
        else if (result.state === "prompt") {
            Notification.requestPermission().then(() => {
                navigator.setAppBadge(listContents.length);
            });
        }
        // Don't do anything if the permission was denied.
    });
}
