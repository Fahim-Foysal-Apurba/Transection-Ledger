<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Mini Transaction Ledger
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Sidebar / Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <!-- Accounts Link -->
        <q-item
          clickable
          v-ripple
          :to="{ path: '/accounts' }"
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Accounts</q-item-label>
            <q-item-label caption>Manage bank accounts</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Transactions Link -->
        <q-item
          clickable
          v-ripple
          :to="{ path: '/transactions' }"
          exact
          active-class="bg-primary text-white"
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

    <!-- Page Container -->
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
/* Optional: make active links more visible */
.q-item.bg-primary {
  border-radius: 8px;
}
</style>


