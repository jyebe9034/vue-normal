<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="10" lg="8">
      <v-row class="mx-10 mt-10">
        <v-col cols="11" class="pa-0">
          <v-text-field v-model="keyword" label="Search by title" outlined />
        </v-col>
        <v-col cols="1" class="pa-1">
          <v-btn color="green" large dark @click="findByTitle">Search</v-btn>
        </v-col>
      </v-row>
      <v-simple-table class="mx-10">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Type</th>
              <th class="text-left">Status</th>
              <th class="text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.published ? "Published" : "Pending" }}</td>
              <td>
                <v-btn color="warning" small @click="goToEdit(item.id)"
                  >Edit</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-btn class="mx-10 my-5" color="error" small @click="removeAllItems">
        Remove All
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import apiService from "../services/apiService";

export default {
  name: "ItemList",
  data: () => ({
    items: [],
    currentItem: {},
    keyword: "",
  }),
  mounted() {
    this.getItems();
  },
  methods: {
    getItems: function () {
      apiService
        .getAll()
        .then((res) => {
          this.items = res.data.list;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeAllItems() {
      apiService
        .deleteAll()
        .then(() => {
          this.getItems();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goToEdit(id) {
      this.$router.push(`/itemDetail/${id}`);
    },
    findByTitle() {
      if (this.keyword) {
        apiService.findByTitle(this.keyword).then((res) => {
          this.items = res.data.list;
        });
      } else {
        apiService.getAll().then((res) => {
          this.items = res.data.list;
        });
      }
    },
  },
};
</script>

<style scoped></style>
