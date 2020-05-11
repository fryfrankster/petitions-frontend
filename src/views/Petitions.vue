<template>
    <div class="petitions">
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
                                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                height="194"
                        ></v-img>

                        <v-card-text>{{ petition.signatureCount }} Supporters</v-card-text>

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
    </div>
</template>

<script>
    import { apiPetition } from "../api"

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
            }
        }
    }
</script>

<style scoped>

</style>