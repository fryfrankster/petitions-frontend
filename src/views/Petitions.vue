<template>
    <div class="petitions">
        <v-list >
            <v-list-item
                    v-for="petition in petitions" :key="petition">
                <v-list-item-content>
                    <v-card
                            max-width="520"
                            class="mx-auto"
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

                        <v-card-text>Description</v-card-text>

                        <v-card-actions>
                            <v-btn
                                    text
                                    color="deep-purple accent-4"
                            >
                                Read
                            </v-btn>
                            <v-btn
                                    text
                                    color="deep-purple accent-4"
                            >
                                Bookmark
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

<!--<template>-->
<!--&lt;!&ndash;    <li v-for="petition in petitions" :key="petition">&ndash;&gt;-->
<!--        -->
<!--        <v-card-->
<!--                max-width="520"-->
<!--                class="mx-auto"-->
<!--        >-->
<!--            <v-list-item>-->
<!--                <v-list-item-avatar color="grey"></v-list-item-avatar>-->
<!--                <v-list-item-content>-->
<!--                    <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>-->
<!--                    <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>-->
<!--                </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            <v-img-->
<!--                    src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"-->
<!--                    height="194"-->
<!--            ></v-img>-->

<!--            <v-card-text>-->
<!--                Visit ten places on our planet that are undergoing the biggest changes today.-->
<!--            </v-card-text>-->

<!--            <v-card-actions>-->
<!--                <v-btn-->
<!--                        text-->
<!--                        color="deep-purple accent-4"-->
<!--                >-->
<!--                    Read-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                        text-->
<!--                        color="deep-purple accent-4"-->
<!--                >-->
<!--                    Bookmark-->
<!--                </v-btn>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn icon>-->
<!--                    <v-icon>mdi-heart</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn icon>-->
<!--                    <v-icon>mdi-share-variant</v-icon>-->
<!--                </v-btn>-->
<!--            </v-card-actions>-->
<!--        </v-card>-->
<!--&lt;!&ndash;    </li>&ndash;&gt;-->
<!--</template>-->

<script>
    export default {
        name: "Petitions",
        data() {
            return {
                error: "",
                errorFlag: false,
                petitions: []
            }
        },
        mounted: function () {
            this.getPetitions();
        },
        methods: {
            getPetitions: function () {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4001/api/v1/petitions')
                    .then((response) => {
                        this.petitions = response.data;
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