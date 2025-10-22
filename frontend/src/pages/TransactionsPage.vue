<template>
  <q-page class="q-pa-md">

    <q-card class="q-pa-md">

      <q-card-section>
        <div class="text-h6 text-center">Transactions Portal</div>
      </q-card-section>

      <q-separator spaced />

      <div class="row q-col-gutter-md">

        <div class="col-12 col-md-4">
          <TransactionPool type="cashin" />
        </div>

        <div class="col-12 col-md-4">
          <TransactionPool type="cashout" />
        </div>

        <div class="col-12 col-md-4">
          <TransactionPool type="transfer" />
        </div>

      </div>

      <q-separator spaced />

      <TransactionsTable />

    </q-card>
  </q-page>
</template>

<script setup>
import TransactionPool from "src/components/TransactionPool.vue";
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
  background-color: #ddf3fd;
}
</style>














