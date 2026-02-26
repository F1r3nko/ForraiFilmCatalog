import HomePage from "./components/HomePage.js";
import AddFilmPage from "./components/AddFilmPage.js";
import LoginPage from "./components/LoginPage.js";
import FilmyPage from "./components/FilmyPage.js";
import FilmyDetailPage from "./components/FilmyDetailPage.js";
const { createApp, ref, reactive } = Vue;
const { createWebHistory, createRouter } = VueRouter;

const app = createApp({
    setup() {
        return {}
    }

})
const routes = [{
    path: "/",
    component: HomePage
}, {
    path: "/add",
    component: AddFilmPage
}, {

    path: "/login",
    component: LoginPage
}, {
    path: "/filmy",
    component: FilmyPage

}, {
    path: "/filmy/:id",
    component: FilmyDetailPage
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount("#app")