<template>
    <div class="register">
        <v-container>
            <v-layout>
                <v-flex>
                    <form>
                        <v-text-field
                                v-model="registrationData.name"
                                :error-messages="nameErrors"
                                label="Name"
                                required
                                @input="$v.registrationData.name.$touch()"
                                @blur="$v.registrationData.name.$touch()"
                                filled
                                rounded
                                dense
                        ></v-text-field>
                        <v-text-field
                                v-model="registrationData.email"
                                :error-messages="emailErrors"
                                label="Email"
                                required
                                @input="$v.registrationData.email.$touch()"
                                @blur="$v.registrationData.email.$touch()"
                                filled
                                rounded
                                dense
                        ></v-text-field>
                        <v-text-field
                                v-model="registrationData.password"
                                :error-messages="passwordErrors"
                                type="password"
                                label="Password"
                                required
                                @input="$v.registrationData.password.$touch()"
                                @blur="$v.registrationData.password.$touch()"
                                filled
                                rounded
                                dense
                        ></v-text-field>
                        <v-text-field
                                v-model="registrationData.city"
                                label="City"
                                @input="$v.registrationData.city.$touch()"
                                @blur="$v.registrationData.city.$touch()"
                                filled
                                rounded
                                dense
                        ></v-text-field>
                        <v-text-field
                                v-model="registrationData.country"
                                label="Country"
                                @input="$v.registrationData.country.$touch()"
                                @blur="$v.registrationData.country.$touch()"
                                filled
                                rounded
                                dense
                        ></v-text-field>

<!--                        Uploading an image for user-->
                        <v-btn @click="onPickFile">Upload image</v-btn>
                        <input
                                type="file"
                                style="display: none"
                                ref="fileInput"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                        <v-img v-bind:src="imageUrl" height="150"></v-img>

                        <v-btn class="mr-4" @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email, minLength} from 'vuelidate/lib/validators'
    import {apiUser} from "../api";
    import {mapActions} from "vuex";

    export default {
        mixins: [validationMixin],

        validations: {
            registrationData: {
                name: {required, minLength: minLength(1)},
                email: {required, email},
                password: {required, minLength: minLength(6)},
            }
        },

        data: () => ({
            error: '',
            errorFlag: '',
            imageUrl: '',
            registrationData: {
                name: '',
                email: '',
                password: '',
                city: '',
                country: '',
            },
            image: null,
        }),

        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.registrationData.name.$dirty) return errors;
                !this.$v.registrationData.name.minLength && errors.push('Name must be at least 1 characters long');
                !this.$v.registrationData.name.required && errors.push('Name is required.');
                return errors
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.registrationData.email.$dirty) return errors;
                !this.$v.registrationData.email.email && errors.push('Must be valid e-mail');
                !this.$v.registrationData.email.required && errors.push('E-mail is required');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.registrationData.password.$dirty) return errors;
                !this.$v.registrationData.password.minLength && errors.push('Password must be at least 6 characters long');
                !this.$v.registrationData.password.required && errors.push('Password is required.');
                return errors;
            },
        },

        methods: {
            ...mapActions(["loginUser"]),

            submit() {
                let registrationRequest = {
                    name: this.registrationData.name,
                    email: this.registrationData.email,
                    password: this.registrationData.password,
                };

                if (this.registrationData.city) registrationRequest.city = this.registrationData.city;
                if (this.registrationData.country) registrationRequest.country = this.registrationData.country;

                apiUser.register(registrationRequest)
                    .then(() => {
                        this.autoLogin();
                    }).catch((error) => {
                    console.log(error);
                });
            },
            autoLogin() {
                apiUser.login(this.registrationData.email, this.registrationData.password)
                    .then((response) => {
                        localStorage.setItem('token', response.data.token);
                        this.loginUser(response.data);
                        this.$router.push('Petitions');
                    }).catch((error) => {
                    console.log(error);
                });
            },
            setUserPhoto() {
            },
            clear() {
                this.$v.$reset();
                this.registrationData.name = '';
                this.registrationData.email = '';
                this.registrationData.password = '';
                this.registrationData.city = '';
                this.registrationData.country = '';
            },
            onPickFile() {
              this.$refs.fileInput.click();
            },
            onFilePicked(event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file');
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(files[0]);
                this.image = files[0];
            },
        },
    }
</script>


<style scoped>

</style>