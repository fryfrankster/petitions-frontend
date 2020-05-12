<template>
    <div class="login">
        <v-container class="login-container">
            <v-layout>
                <v-flex>
                    <v-card flat max-width="500">
                        <form>
                            <v-text-field
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="Email"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    v-model="password"
                                    :error-messages="passwordErrors"
                                    type="password"
                                    label="Password"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                            ></v-text-field>
                            <v-btn class="mr-4" @click="submit">Login</v-btn>
                        </form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email, minLength} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            email: {required, email},
            password: {required, minLength: minLength(6)},
        },

        data: () => ({
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
        },

        methods: {
            submit() {
                this.$v.$touch()

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