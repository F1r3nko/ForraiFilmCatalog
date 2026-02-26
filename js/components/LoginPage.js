const LoginPage = {
    template: `
    <div>
        <h1>Login</h1>
        <div class="login-form">
        <form @submit.prevent="login"></form>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    </div>`,
    props: {},
    setup() {
        return {}
    }
}
export default LoginPage;