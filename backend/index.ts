import App from './src/app';
const newApp = new App(5000);

newApp.getApp().listen(newApp.getPort(), () => {
    console.log("Server Started");
});