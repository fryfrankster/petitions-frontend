<template>
    <div class="login">
        <v-container class="login-container">
            <v-layout>
                <v-flex>
                    <v-card flat max-width="500">
                        <form>
                            <div v-if="errorFlag" style="color: red;">
                                {{ error }}
                            </div>
                            <v-text-field
                                    v-model.trim="email"
                                    :error-messages="emailErrors"
                                    label="Email"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                    filled
                                    rounded
                                    dense
                            ></v-text-field>
                            <v-text-field
                                    v-model.trim="password"
                                    :error-messages="passwordErrors"
                                    type="password"
                                    label="Password"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                    filled
                                    rounded
                                    dense
                            ></v-text-field>
                            <v-btn rounded dense class="mr-4" @click.prevent="submit">Login</v-btn>
                        </form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {required, email, minLength} from 'vuelidate/lib/validators';
    import {apiUser} from "../api";
    import {mapActions} from 'vuex';


    export default {
        mixins: [validationMixin],

        validations: {
            email: {required, email},
            password: {required, minLength: minLength(6)},
        },

        data: () => ({
            error: "",
            errorFlag: false,
            email: '',
            password: '',
        }),

        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Must be valid e-mail');
                !this.$v.email.required && errors.push('E-mail is required');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.minLength && errors.push('Password must be at least 6 characters long');
                !this.$v.password.required && errors.push('Password is required.');
                return errors;
            },
            areValid() {
                return false;
            },
        },

        methods: {
            ...mapActions(["loginUser"]),

            submit() {
                apiUser.login(this.email, this.password)
                    .then((response) => {
                        localStorage.setItem('authToken', response.data.token);
                        this.loginUser(response.data);
                        this.$router.push('Petitions');
                    })
                    .catch((error) => {
                        if (error.response.statusText === "Bad Request: invalid email/password supplied") {
                            this.error = "Incorrect email or password provided";
                            this.errorFlag = true;
                        } else {
                            this.error = error.response.statusText;
                            this.errorFlag = true;
                        }

                        // if (error.response.statusText === "Bad Request: data.email should match format \"email\"") {
                        //     this.error = "Invalid email format";
                        //     this.errorFlag = true;
                        // }
                        // if (error.response.statusText === "Bad Request: data.password should NOT be shorter than 1 characters") {
                        //     this.error = "Password is a required field";
                        //     this.errorFlag = true;
                        // }
                    });

            },
            clear() {
                this.$v.$reset();
                this.password = '';
                this.email = '';
            },
        },
    }
</script>


<style scoped>

</style>