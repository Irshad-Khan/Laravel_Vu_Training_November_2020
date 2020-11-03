<template>
    <v-app>
        <main>
            <v-container fluid fill-height class="loginOverlay">
                <v-layout flex align-center justify-center>
                    <v-flex xs12 sm4 elevation-6>
                        <v-toolbar class="pt-5 blue darken-4">
                            <v-toolbar-title class="white--text"><h4>Welcome Back</h4></v-toolbar-title>
                        </v-toolbar>
                        <v-card>
                            <v-card-text class="pt-4">
                                <v-progress-linear
                                    :active="loading"
                                    :indeterminate="loading"
                                    rounded
                                    height="6"
                                    color="deep-purple accent-4"
                                ></v-progress-linear>
                                <div>
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                    >
                                        <v-text-field
                                            label="Enter your e-mail address"
                                            v-model="email"
                                            type="email"
                                            :rules="emailRules"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            label="Enter your password"
                                            v-model="password"
                                            min="8"
                                            type="password"
                                            :rules="passwordRules"
                                            counter
                                            required
                                        ></v-text-field>
                                        <v-layout justify-space-between>
                                            <v-btn @click="login" :disabled="!valid">Login</v-btn>
                                            <a href="">Forgot Password</a>
                                        </v-layout>
                                    </v-form>
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-snackbar v-model="snackbar">
                            {{ snackbar_message }}
                                <v-btn
                                    color="pink"
                                    text
                                    @click="snackbar = false">
                                    Close
                                </v-btn>
                        </v-snackbar>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>

<script>
export default {
    name: "LoginComponent",
    data(){
        return {
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'E-mail is required',
            ],
            loading: false,
            snackbar: false,
            snackbar_message: ''
        }
    },
    methods: {
        login: function (){
            // Add a request interceptor
            axios.interceptors.request.use((config) => {
                this.loading = true;
                return config;
            }, (error) => {
                this.loading = false;
                return Promise.reject(error);
            });

            // Add a response interceptor
            axios.interceptors.response.use( (response) => {
                this.loading = false;
                return response;
            }, (error) => {
                this.loading = false;
                return Promise.reject(error);
            });

            axios.post('/api/login', {
                'email': this.email,
                'password': this.password
            }).then(res =>{
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('loggedIn', true);

                this.$router.push('/admin')
                    .then(res => console.log('LogdedIn Successfully'))
                    .catch(err => console.log(err))
            }).catch( err => {
                this.snackbar_message = err.response.data.status;
                this.snackbar = true;
            });
        }
    }
}
</script>
<!--scoped mean css execute when component loaded-->
<style scoped>

</style>
