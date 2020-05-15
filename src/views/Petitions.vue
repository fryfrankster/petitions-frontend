<template>
    <div class="petitions">
        <v-container>
            <v-layout>
                <v-row>
                    <v-col cols="12" sm="6" md="3" app>
                        <div class="sortByFilter">
                            <v-text-field
                                    v-model="paramSearch"
                                    label="Search"
                                    rounded
                                    dense
                                    outlined
                            >
                            </v-text-field>
                            <v-select
                                    v-model="paramSortBy"
                                    :items="sortByOptions"
                                    item-text="sortByText"
                                    item-value="sortByValue"
                                    label="Sort By"
                                    dense
                                    outlined
                            ></v-select>
                            <v-select
                                    v-model="paramCategory"
                                    :items="categories"
                                    item-text="name"
                                    item-value="categoryId"
                                    name="category"
                                    label="Category"
                                    dense
                                    outlined
                            ></v-select>
                            <v-btn @click="getPetitions()">search</v-btn>
                            <v-btn @click="clearParams()">reset</v-btn>
                        </div>
                    </v-col>

                    <v-col>
                        <v-list>
                            <v-list-item
                                    v-for="petition in petitions.slice(amountPerPage * (page - 1), amountPerPage * page)" :key="petition">
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

                                        <v-img
                                                v-bind:src="petitionPhoto(petition.petitionId)"
                                                @click="viewPetition(petition.petitionId)"
                                                height="230"
                                        ></v-img>
                                        <v-card-text>{{ petition.signatureCount }} Signatures | {{ petition.category }}
                                        </v-card-text>
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
                        <p v-if="petitions.length === 0">No Petitions To Show</p>
                    </v-col>
                </v-row>
                <div class="text-center">
                    <v-pagination
                            v-model="page"
                            :length="getPageLength"
                            circle
                    ></v-pagination>
                </div>
            </v-layout>
        </v-container>
    </div>
    <!--    https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript-->
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
                categories: [],
                sortByOptions: [{sortByText: "alphabetically by title, A - Z", sortByValue: "ALPHABETICAL_ASC"},
                    {sortByText: "alphabetically by title, Z - A", sortByValue: "ALPHABETICAL_DESC"},
                    {sortByText: "the number of signatures, from least to most", sortByValue: "SIGNATURES_ASC"},
                    {sortByText: "the number of signatures, from most to least", sortByValue: "SIGNATURES_DESC"}],
                paramCategory: null,
                paramSortBy: null,
                paramSearch: null,
                amountPerPage: 10,
                page: 1,
            }
        },
        mounted: function () {
            this.getPetitions();
            this.getCategories();
        },
        computed: {
            getPageLength: function(){
                return Math.ceil(this.petitions.length / this.amountPerPage);
            }
        },
        methods: {
            clearParams() {
                this.paramCategory = null;
                this.paramSortBy = null;
                this.paramSearch = null;
                this.getPetitions();
            },
            getPetitions() {
                apiPetition.getAllPetitions(this.paramCategory, this.paramSortBy, this.paramSearch)
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
            },
            getCategories() {
                apiPetition.getAllCategories()
                    .then((response) => {
                        this.categories = response.data;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }
        }
    }
</script>

<style scoped>

</style>