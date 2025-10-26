<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="q-py-md">

      <q-toolbar >
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
       
        <q-toolbar-title class="flex flex-center">
          Mini Transaction Ledger
        </q-toolbar-title>

      </q-toolbar>

    </q-header>


    <q-drawer v-model="leftDrawerOpen"  bordered>

      <q-list>

        <q-item-label header> Navigation </q-item-label>


        <q-item
          clickable
          :to="{ path: '/accounts' }"
          exact
          active-class="bg-primary text-white q-mx-md"
        >

          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>

          <q-item-section>

            <q-item-label>Accounts</q-item-label>

            <q-item-label caption>Manage bank accounts</q-item-label>

          </q-item-section>

        </q-item>

       
        <q-item
          clickable
          :to="{ path: '/transactions' }"
          exact
          active-class="bg-primary text-white q-mx-md"
        >
          <q-item-section avatar>
            <q-icon name="swap_horiz" />
          </q-item-section>

          <q-item-section>

            <q-item-label>Transactions</q-item-label>

            <q-item-label caption>Cash in, out & transfers</q-item-label>

          </q-item-section>

        </q-item>

      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>

.q-item.bg-primary {
  border-radius: 8px;
}
</style>


