<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Accounts</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md items-center">
          <div class="col">
            <q-input v-model="newName" label="New Account Name" dense outlined />
          </div>
          <div class="col-auto">
            <q-btn
              label="Create"
              color="primary"
              @click="addAccount"
              :disable="!newName"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          title="All Accounts"
          :rows="accounts"
          :columns="columns"
          row-key="id"
          flat
          bordered
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                color="primary"
                icon="visibility"
                size="sm"
                @click="viewDetails(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Account Details Dialog -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Account Details</div>
        </q-card-section>
        <q-card-section>
          <p><b>ID:</b> {{ selected?.id }}</p>
          <p><b>Name:</b> {{ selected?.name }}</p>
          <p><b>Balance:</b> {{ selected?.balance }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAccountStore } from "src/stores/account-store";

const store = useAccountStore();

const newName = ref("");
const dialog = ref(false);
const selected = ref(null);

const columns = [
  { name: "id", label: "ID", field: "id", align: "left" },
  { name: "name", label: "Name", field: "name", align: "left" },
  { name: "balance", label: "Balance", field: "balance", align: "right" },
  { name: "actions", label: "Actions", align: "center" }
];

function addAccount() {
  store.createAccount(newName.value);
  newName.value = "";
}

function viewDetails(acc) {
  selected.value = acc;
  dialog.value = true;
}

const accounts = store.accounts;
</script>

