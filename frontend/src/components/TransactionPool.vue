<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1 text-center">
        {{ titleText }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      
      <q-input
        v-model.number="account_Id"
        type="number"
        :label="type === 'transfer' ? 'From Account ID' : 'Account ID'"
        outlined
        dense
      />

      
      <div v-if="type === 'transfer'">
        <q-input
          v-model.number="to_account"
          label="To Account ID"
          type="number"
          outlined
          dense
          class="q-mt-sm"
        />
      </div>

      <q-input
        v-model.number="amount"
        label="Amount"
        type="number"
        outlined
        dense
        class="q-mt-sm"
      />

      <q-input
        v-model="description"
        label="Description"
        type="text"
        outlined
        dense
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        :label="titleText"
        color="positive"
        @click="submit"
      />
    </q-card-actions>

    <div
      class="text-center text-green-7 bg-green-1 q-pa-sm"
      v-if="message"
    >
      {{ message }}
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAccountStore } from "src/stores/account-store";
import { useTransactionStore } from "src/stores/transactions-store";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const accountStore = useAccountStore();
const transactionStore = useTransactionStore();

const account_Id = ref(null);
const to_account = ref(null);
const amount = ref(null);
const description = ref("");
const message = ref("");
const titleText = ref("");

onMounted(async () => {
  await accountStore.fetchAccounts();
  await transactionStore.fetchTransactions();

  if (props.type === "cashin") titleText.value = "Cash In";
  else if (props.type === "cashout") titleText.value = "Cash Out";
  else if (props.type === "transfer") titleText.value = "Transfer";
  else titleText.value = "Transaction";
});



const submit = async () => {
  await accountStore.fetchAccounts()

  message.value = "";

  if (!account_Id.value) {
    message.value =
      props.type === "transfer"
        ? "From Account ID is required."
        : "Account ID is required.";
    return;
  }

  if (props.type === "transfer" && !to_account.value) {
    message.value = "To Account ID is required for transfer.";
    return;
  }

  if (props.type === "transfer" && to_account.value === account_Id.value) {
    message.value =
      "From Account ID and To Account ID cannot be the same for transfer.";
    return;
  }

  if (!amount.value || isNaN(amount.value) || amount.value <= 0) {
    message.value = "Amount is required and must be greater than 0.";
    return;
  }

  const account = accountStore.accounts.find(
    (a) => a.account_id == account_Id.value
  );
  if (!account) {
    message.value =
      props.type === "transfer"
        ? `From Account ID ${account_Id.value} not found.`
        : `Account ID ${account_Id.value} not found.`;
    return;
  }

  let toAccount = null;
  if (props.type === "transfer") {
    toAccount = accountStore.accounts.find(
      (a) => a.account_id == to_account.value
    );
    if (!toAccount) {
      message.value = `Recipient Account ID ${to_account.value} not found.`;
      return;
    }
  }

  const balance = Number(account.balance ?? 0);


  if (
    amount.value > balance &&
    (props.type === "cashout" || props.type === "transfer")
  ) {
    message.value = `Insufficient balance. Remaining balance in From Account ${account.account_id} is ${balance}.`;
    return;
  }


  try {
    let result = null;

    if (props.type === "cashin") {
      result = await transactionStore.cashIn({
        account_id: account_Id.value,
        amount: amount.value,
        description: description.value,
      });

      message.value = result
        ? `Successfully credited ${result.amount} Taka to Account ID ${result.to_account}.`
        : "Transaction failed.";
    }

    else if (props.type === "cashout") {
      result = await transactionStore.cashOut({
        account_id: account_Id.value,
        amount: amount.value,
        description: description.value,
      });

      message.value = result
        ? `Successfully debited ${result.amount} Taka from Account ID ${result.from_account}.`
        : "Transaction failed.";
    }

    else if (props.type === "transfer") {
      result = await transactionStore.transfer({
        from_account: account_Id.value,
        to_account: to_account.value,
        amount: amount.value,
        description: description.value,
      });

      message.value = result
        ? `Successfully transferred ${result.amount} Taka from Account ID ${result.from_account} to Account ID ${result.to_account}.`
        : "Transaction failed.";
    }
  } catch (error) {
    console.error("Transaction error:", error);
    message.value =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during the transaction.";
  }


  account_Id.value = null;
  to_account.value = null;
  amount.value = null;
  description.value = "";
};
</script>

