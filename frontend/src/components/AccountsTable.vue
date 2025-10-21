<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="account_id"
    flat
    bordered
  >
    <!-- Transaction History Button -->
    <template v-slot:body-cell-actions="props">
      <q-td align="center">
        <q-btn
          flat
          color="primary"
          label="Transaction History"
          @click="$emit('show-transactions', props.row.account_id)"
        />
      </q-td>
    </template>

    <!-- Custom created_at column -->
    <template v-slot:body-cell-created_at="props">
      <q-td>
        <div>
          {{ formatDate(props.row.created_at) }}
        </div>
        <div style="font-size: 0.8em; color: gray;">
          {{ formatTime(props.row.created_at) }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
defineProps({
  rows: { type: Array, required: true },
  columns: { type: Array, required: true }
})

import { DateTime } from 'luxon'  // recommended for timezone handling

function formatDate(datetime) {
  if (!datetime) return ''
  // convert to Bangladesh time and format as '15 November 2025'
  return DateTime.fromISO(datetime, { zone: 'Asia/Dhaka' }).toFormat('dd LLLL yyyy')
}

function formatTime(datetime) {
  if (!datetime) return ''
  // convert to Bangladesh time and format as 'hh:mm a'
  return DateTime.fromISO(datetime, { zone: 'Asia/Dhaka' }).toFormat('hh:mm a')
}
</script>
