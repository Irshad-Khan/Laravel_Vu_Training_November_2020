<template>
    <v-app id="inspire">
        <v-system-bar app style="height: 50px">
            <v-btn to="/admin">
                VuTraing
            </v-btn>
            <v-spacer></v-spacer>
            <h5 @click="logout">Log Out</h5>
        </v-system-bar>

        <v-main style="margin-top: 10px">
                <v-row>

                    <v-col cols="3">
                        <v-navigation-drawer v-model="drawer"  ap >
                            <v-sheet color="grey lighten-4" class="pa-4">
                                <v-avatar class="mb-4" color="grey darken-1"  size="64"></v-avatar>
                                <div>john@vuetifyjs.com</div>
                            </v-sheet>

                            <v-divider></v-divider>

                            <v-list>
                                <v-list-item v-for="link in links" :key="link.text" link :to="link.action">
                                    <v-list-item-icon>
                                        <v-icon>mdi-{{ link.icon }}</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-navigation-drawer>
                    </v-col>

                    <v-col cols="9" style="margin-top: 10px; margin-left: -30px">
                        <router-view></router-view>
                    </v-col>
                    <v-snackbar v-model="snackbar">
                        You Are LoggedIn Successfully!
                        <v-btn
                            color="pink"
                            text
                            @click="snackbar = false">
                            Close
                        </v-btn>
                    </v-snackbar>
                </v-row>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "AdminComponent",
    data: () => ({
        cards: ['Today', 'Yesterday'],
        snackbar: false,
        drawer: null,
        links: [
            {icon: 'account', text: 'Users', action: '/admin/users'},
            {icon: 'send', text: 'Posts', action: '/admin/posts'},
            {icon: 'book-open-page-variant', text: 'Pages', action: '/admin/pages'},
            {icon: 'clipboard-text', text: 'Categories', action: '/admin/categories'},
            {icon: 'alert-octagon', text: 'Roles', action: '/admin/roles'},
        ]
    }),
    mounted(){
        this.snackbar = !!localStorage.getItem('loggedIn');
        localStorage.removeItem('loggedIn');
    },
    methods: {
        logout: function (){
            localStorage.removeItem('token');
            this.$router.push('/login')
                .then(res => console.log('Logded Out Successfully'))
                .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>
