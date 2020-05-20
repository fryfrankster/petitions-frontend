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
                                            v-bind:src="userPhoto"
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
                userDetails: [],
                petitions: [],
            }
        },
        mounted: function () {
            this.getUser();
            this.getPetitions();
        },
        computed: {
            userPhoto: function () {
                return rootUrl + "users/" + this.$store.state.userId + "/photo";
            }
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
        }
    }
</script>

<style scoped>

</style>