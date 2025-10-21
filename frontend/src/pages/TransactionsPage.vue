<template>
  <q-page class="q-pa-md">

    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6 text-center">💸 Transactions Portal</div>
      </q-card-section>

      <!-- Transaction Forms -->
      <q-separator spaced />
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <CashIn />
        </div>
        <div class="col-12 col-md-4">
          <CashOut />
        </div>
        <div class="col-12 col-md-4">
          <TransferAmount />
        </div>
      </div>

      <q-separator spaced />

      <!-- Transactions Table -->
      <TransactionsTable />
    </q-card>
  </q-page>
</template>

<script setup>

import CashIn from "src/components/CashIn.vue";
import CashOut from "src/components/CashOut.vue";
import TransferAmount from "src/components/TransferAmount.vue";
import TransactionsTable from "src/components/TransactionTable.vue";

</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
.row {
  margin-top: 1rem;
}
.q-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}
.q-page {
  background-color: #fafafa;
}
</style>













