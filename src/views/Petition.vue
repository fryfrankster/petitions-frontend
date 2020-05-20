<template>
    <div class="single-petition">
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-card>
                        <v-card-title>{{ petition.title }}</v-card-title>
                        <v-img
                                v-bind:src="petitionPhoto"
                        >
                        </v-img>
                        <v-card-text text>{{ petition.description }}</v-card-text>
                        <v-card-text>Created on {{ petition.createdDate }} | Closing on {{ petition.closingDate }}
                        </v-card-text>
                        <v-card-text>{{ petition.category }}</v-card-text>
                        <v-card-text>{{ petition.signatureCount }}</v-card-text>
                        <v-card-actions>
                            <v-btn v-on:click="signPetition">
                                Sign Petition
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {apiPetition} from "../api";

    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        name: "Petition",
        data() {
            return {
                error: "",
                errorFlag: false,
                petition: [],
            }
        },
        mounted: function () {
            this.getPetition();
        },
        computed: {
            petitionPhoto: function () {
                return rootUrl + "petitions/" + this.petition.petitionId + "/photo";
            }
        },
        methods: {
            getPetition() {
                apiPetition.getOnePetition(this.$route.params.id)
                    .then((response) => {
                        this.petition = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            signPetition() {
                apiPetition.signPetition(this.petition.petitionId)
                    .then(() => {
                        this.getPetition();
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    })
            },
        }
    }
</script>

<style scoped>

</style>