<template>
    <div class="petitions">
        <v-container>
            <v-list>
                <v-list-item
                        v-for="petition in petitions" :key="petition">
                    <v-list-item-content>
                        <v-card
                                max-width="520"
                                class="mx-auto"
                                @click="viewPetition(petition.petitionId)"
                        >
                            <v-list-item>
                                <v-list-item-avatar color="grey"></v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="petition.title"></v-list-item-title>
                                    <v-list-item-subtitle v-text="petition.authorName"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-img
                                    v-bind:src="petitionPhoto(petition.petitionId)"
                                    height="230"
                            ></v-img>

                            <v-card-text>{{ petition.signatureCount }} Signatures</v-card-text>

                            <v-card-actions>
                                <v-btn
                                        text
                                        color="deep-purple accent-4"
                                >
                                    Sign Petition
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-share-variant</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>

<script>
    import {apiPetition} from "../api"

    const rootUrl = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

    export default {
        name: "Petitions",
        data() {
            return {
                error: "",
                errorFlag: false,
                petitions: [],
            }
        },
        mounted: function () {
            this.getPetitions();
        },
        // computed: {
        //     petitionPhoto: function () {
        //         return rootUrl + "petitions/" + this.petition.petitionId + "/photo";
        //     }
        // },
        methods: {
            getPetitions() {
                apiPetition.getAllPetitions()
                    .then((response) => {
                        this.petitions = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            viewPetition(petitionId) {
                this.$router.push("petitions/" + petitionId);
            },
            petitionPhoto(petitionId) {
                return rootUrl + "petitions/" + petitionId + "/photo";
            }
        }
    }
</script>

<style scoped>

</style>