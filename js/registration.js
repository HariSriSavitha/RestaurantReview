if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("./serviceWorker.js")
    .then((register) => {
      console.log("service worker registered successfully", register);
    })
    .catch((event) => {
      console.log("service worker regitration failed", event);
    })
} else {
  console.log("browser not supported");
}
