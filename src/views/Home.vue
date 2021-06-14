<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>What I read, watch, listen</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab v-for="(tabItem, index) in tabItems" :key="index">{{
            tabItem.name
          }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(tabItem, index) in tabItems" :key="index">
        <v-app v-if="index === tab">
          <component :is="tabItem.component"></component>
        </v-app>
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import ItemList from "@/components/ItemList";
import AddItem from "@/components/AddItem";

export default {
  name: "Home",
  data: () => ({
    tab: null,
    tabItems: [
      { name: "List", component: ItemList },
      { name: "Add", component: AddItem },
    ],
  }),
};
</script>
