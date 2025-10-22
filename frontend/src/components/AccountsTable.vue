<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="account_id"
    flat
    bordered
    :rows-per-page-options="[10]"
  >


    <template v-slot:body-cell-created_at="props" >
      <q-td align="center" class="bg-warning q-mx-md">
        
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

import { DateTime } from 'luxon'  

function formatDate(datetime) {
  if (!datetime) return ''
  return DateTime.fromISO(datetime, { zone: 'Asia/Dhaka' }).toFormat('dd LLLL yyyy')
}

function formatTime(datetime) {
  if (!datetime) return ''
  return DateTime.fromISO(datetime, { zone: 'Asia/Dhaka' }).toFormat('hh:mm a')
}
</script>
