<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Transactions</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col">
            <q-select
              v-model="selectedAccount"
              :options="accountOptions"
              label="Select Account"
              outlined
              dense
            />
          </div>
          <div class="col">
            <q-input v-model.number="amount" label="Amount" type="number" outlined dense />
          </div>
          <div class="col-auto">
            <q-btn label="Cash In" color="positive" @click="cashIn" />
            <q-btn label="Cash Out" color="negative" @click="cashOut" class="q-ml-sm" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAccountStore } from "src/stores/account-store";

const store = useAccountStore();
const selectedAccount = ref(null);
const amount = ref(0);

const accountOptions = computed(() =>
  store.accounts.map(a => ({ label: `${a.name} (Bal: ${a.balance})`, value: a.id }))
);

function cashIn() {
  if (selectedAccount.value && amount.value > 0) {
    store.cashIn(selectedAccount.value, amount.value);
    amount.value = 0;
  }
}

function cashOut() {
  if (selectedAccount.value && amount.value > 0) {
    store.cashOut(selectedAccount.value, amount.value);
    amount.value = 0;
  }
}
</script>

