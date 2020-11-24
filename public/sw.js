console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "http://localhost:3000/favicon.png"
    })
})
