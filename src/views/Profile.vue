<template>
    <div class="profile">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-col>
                        <v-card class="pa-7 ma-7">
                            <v-row justify="center">
                                <v-avatar color="orange" size="150">
                                    <v-img
                                            v-bind:src="userPhoto(this.$route.params.id)"
                                    >
                                    </v-img>
                                </v-avatar>
                            </v-row>
                            <v-row justify="center">
                                <v-card-title>{{ userDetails.name }}</v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-card-subtitle>{{ userDetails.email }}</v-card-subtitle>
                            </v-row>
                            <v-row justify="center">
                                <v-card-text>
                                    {{ userDetails.city }} {{ userDetails.country }}
                                </v-card-text>
                            </v-row>
                        </v-card>

                        <v-card class="pa-7 ma-7">
                            <v-row justify="center">
                                <v-card-title>My Petitions</v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark v-on="on">Create new petition</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">User Profile</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="Legal first name*" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field
                                                                label="Legal last name*"
                                                                hint="example of persistent helper text"
                                                                persistent-hint
                                                                required
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field label="Email*" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field label="Password*" type="password" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-select
                                                                :items="['0-17', '18-29', '30-54', '54+']"
                                                                label="Age*"
                                                                required
                                                        ></v-select>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-autocomplete
                                                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                                                label="Interests"
                                                                multiple
                                                        ></v-autocomplete>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                            <v-row justify="center">
                                <v-list>
                                    <v-list-item
                                            v-for="petition in petitions"
                                            :key="petition">
                                        <v-list-item-content>
                                            <v-card
                                                    max-width="520"
                                                    class="mx-auto"
                                            >
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                                v-text="petition.title"
                                                                @click="viewPetition(petition.petitionId)"
                                                        ></v-list-item-title>
                                                        <v-list-item-subtitle
                                                                v-text="petition.authorName">
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-card-text>{{ petition.signatureCount }} Signatures | {{
                                                    petition.category }}
                                                </v-card-text>
                                            </v-card>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {apiPetition, apiUser} from "../api";

    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        name: "Profile",
        data() {
            return {
                error: "",
                errorFlag: false,
                dialog: false,
                userDetails: [],
                petitions: [],
            }
        },
        mounted: function () {
            this.getUser();
            this.getPetitions();
        },
        computed: {
        },
        methods: {
            getUser() {
                apiUser.getUser()
                    .then((response) => {
                        this.userDetails = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getPetitions() {
                apiPetition.getUserPetitions()
                    .then((response) => {
                        this.petitions = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            viewPetition(petitionId) {
                this.$router.push({path: "/petitions/" + petitionId});
            },
            userPhoto(userId) {
                return rootUrl + "users/" + userId + "/photo";
            }
        }
    }
</script>

<style scoped>

</style>