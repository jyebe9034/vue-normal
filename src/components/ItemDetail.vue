<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" class="ma-10">
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="currentItem.title"
            :rules="[() => !!currentItem.title || 'This field is required']"
            label="Title"
            placeholder="Title"
            required
          ></v-text-field>
          <v-text-field
            ref="description"
            v-model="currentItem.description"
            :rules="[
              () => !!currentItem.description || 'This field is required',
            ]"
            label="Description"
            placeholder="Description"
            required
          ></v-text-field>
          <v-autocomplete
            ref="type"
            v-model="currentItem.type"
            :rules="[() => !!currentItem.type || 'This field is required']"
            :items="itemOptions"
            label="Type"
            placeholder="Select Type"
            required
          ></v-autocomplete>
          <v-switch
            v-model="currentItem.published"
            label="Status"
            color="red"
            hide-details
          ></v-switch>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn
            v-if="currentItem.published"
            color="primary"
            @click="updatePublished(false)"
          >
            UnPublish
          </v-btn>
          <v-btn v-else color="primary" @click="updatePublished(true)">
            Publish
          </v-btn>

          <v-btn color="error" @click="deleteItem"> Delete </v-btn>

          <v-btn color="warning" type="submit" @click="updateItem">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import apiService from "../services/apiService";

export default {
  name: "ItemDetail",
  data: () => ({
    currentItem: {},
    itemOptions: ["BOOK", "MOVIE", "MUSIC"],
  }),
  mounted() {
    this.getItem(this.$route.params.id);
  },
  methods: {
    getItem(id) {
      apiService
        .get(id)
        .then((res) => {
          if (res.data != null) {
            this.currentItem = res.data.item;
          } else {
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      let data = {
        id: this.currentItem.id,
        title: this.currentItem.title,
        description: this.currentItem.description,
        type: this.currentItem.type,
        published: status,
      };
      apiService
        .update(this.currentItem.id, data)
        .then(() => {
          this.currentItem.published = status;
          alert("The published was updated successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateItem() {
      apiService
        .update(this.currentItem.id, this.currentItem)
        .then(() => {
          alert("The item was updated successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteItem() {
      apiService
        .delete(this.currentItem.id)
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
