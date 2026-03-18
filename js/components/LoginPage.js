import { useGlobalState } from "../composable/GlobalState.js";
import OblubeneFilmy from "./OblubeneFilmy.js";

const { ref } = Vue;
const { useRouter, useRoute } = VueRouter;

const LoginPage = {
    components: { OblubeneFilmy },
    template: `
    <div>
        <!-- Ak je v URL logged=1 → zobrazi obľúbené filmy -->
        <template v-if="route.query.logged == 1">
            <OblubeneFilmy />
        </template>

        <!-- Inak → prihlasovací formulár -->
        <template v-else>
            <h1>Login</h1>
            <div class="login-form">
                <form @submit.prevent="login">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="username" required>
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </template>
    </div>`,
    setup() {
        const { isLoggedIn, LoggedUsername, showToast } = useGlobalState();
        const router = useRouter();
        const route = useRoute();
        const username = ref("");
        const password = ref("");

        function login() {
            // Jednoduché prihlásenie – stačí zadať meno a heslo (ignorujeme kontrolu)
            if (username.value && password.value) {
                isLoggedIn.value = 1;
                LoggedUsername.value = username.value;
                showToast("Successfully logged in.");
                // Presmerovanie na tú istú stránku s logged=1
                router.push({ path: '/login', query: { logged: 1 } });
            }
        }

        return { username, password, login, route };
    }
};

export default LoginPage;