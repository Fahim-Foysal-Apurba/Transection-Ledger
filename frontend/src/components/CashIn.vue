<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1">💰 Cash In</div>
    </q-card-section>
    <q-card-section>
      <q-input
        v-model.number="accountId"
        label="Account ID"
        outlined
        dense
      />
      <q-input
        v-model.number="amount"
        label="Amount"
        type="number"
        outlined
        dense
        class="q-mt-sm"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        label="Cash In"
        color="positive"
        :disable="!valid"
        @click="submit"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAccountStore } from 'src/stores/account-store';
import { useTransactionStore } from 'src/stores/transactions-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const accountStore = useAccountStore();
const transactionStore = useTransactionStore();

const accountId = ref('');
const amount = ref(0);
const accountDetails = ref(null);

watch(accountId, () => {
  accountDetails.value = accountStore.accounts.find(a => a.account_id == accountId.value) || null;
});

const valid = computed(() => accountDetails.value && amount.value > 0);

const submit = async () => {
  if (!valid.value) return;
  try {
    await accountStore.cashIn(accountId.value, amount.value);
    $q.notify({ type: 'positive', message: 'Cash in successful', timeout: 2000 });

    // Reset
    accountId.value = '';
    amount.value = 0;
    accountDetails.value = null;

    // Refresh table
    await transactionStore.fetchTransactions();
  } catch (err) {
    $q.notify({ type: 'negative', message: err.message || 'Cash in failed', timeout: 2000 });
  }
};
</script>

