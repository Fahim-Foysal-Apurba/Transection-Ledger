<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1">🔄 Transfer</div>
    </q-card-section>
    <q-card-section>
      <q-input v-model.number="fromAccount" label="From Account ID" outlined dense />
      <q-input v-model.number="toAccount" label="To Account ID" outlined dense class="q-mt-sm" />
      <q-input v-model.number="amount" label="Amount" type="number" outlined dense class="q-mt-sm" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        label="Transfer"
        color="primary"
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

const fromAccount = ref('');
const toAccount = ref('');
const amount = ref(0);
const fromDetails = ref(null);
const toDetails = ref(null);

watch(fromAccount, () => {
  fromDetails.value = accountStore.accounts.find(a => a.account_id == fromAccount.value) || null;
});
watch(toAccount, () => {
  toDetails.value = accountStore.accounts.find(a => a.account_id == toAccount.value) || null;
});

const valid = computed(() =>
  fromDetails.value &&
  toDetails.value &&
  amount.value > 0 &&
  fromAccount.value !== toAccount.value &&
  amount.value <= fromDetails.value.balance
);

const submit = async () => {
  if (!valid.value) return;
  try {
    await accountStore.transfer(fromAccount.value, toAccount.value, amount.value);
    $q.notify({ type: 'positive', message: 'Transfer successful', timeout: 2000 });

    fromAccount.value = '';
    toAccount.value = '';
    amount.value = 0;
    fromDetails.value = null;
    toDetails.value = null;

    await transactionStore.fetchTransactions();
  } catch (err) {
    $q.notify({ type: 'negative', message: err.message || 'Transfer failed', timeout: 2000 });
  }
};
</script>


