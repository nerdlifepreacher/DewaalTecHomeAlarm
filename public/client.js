const publicVapidKey =
  "BDbBRpqdGBywczNL_6OFC5J_AJXqCiMXUEXUNBr2i6iYLaaxcmpPgjRX6RdOXjctwGKfnxeEUds-qsS1dn7J48o";
async function send() {
  const register = await navigator.serviceWorker.register("./sw.js", {
      scope: "/"
  });
  await navigator.serviceWorker.ready    
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
});
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}