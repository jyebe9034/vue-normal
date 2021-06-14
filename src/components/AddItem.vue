<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" class="ma-10">
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="item.title"
            :rules="[() => !!item.title || 'This field is required']"
            label="Title"
            placeholder="Title"
            required
          ></v-text-field>
          <v-text-field
            ref="description"
            v-model="item.description"
            :rules="[() => !!item.description || 'This field is required']"
            label="Description"
            placeholder="Description"
            counter="25"
            required
          ></v-text-field>
          <v-autocomplete
            ref="type"
            v-model="item.type"
            :rules="[() => !!item.type || 'This field is required']"
            :items="itemOptions"
            label="Type"
            placeholder="Select Type"
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveItem"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import apiService from "../services/apiService";

export default {
  name: "AddItem",
  data: () => ({
    item: {
      id: null,
      title: "",
      description: "",
      type: "",
      published: false,
    },
    submitted: false,
    itemOptions: ["BOOK", "MOVIE", "MUSIC"],
  }),
  methods: {
    saveItem() {
      let data = {
        title: this.item.title,
        description: this.item.description,
        type: this.item.type,
        published: this.item.published,
      };
      apiService
        .create(data)
        .then((res) => {
          this.item.id = res.data.id;
          this.submitted = true;
          alert("Success!");
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
