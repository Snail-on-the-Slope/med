<template>
  <v-card>
    <v-card-title class="d-flex align-center py-3">
      <v-text-field
        v-model="search"
        append-inner-icon="mdi-magnify"
        placeholder="Поиск"
        single-line
        hide-details
        density="compact"
        variant="outlined"
      />
    </v-card-title>

    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="nurses"
      :search="search"
      :loading="loading"
      items-per-page="-1"
      hover
      hide-default-footer
      class="elevation-1 custom-table"
      item-value="id"
      fixed-header
    >
      <template #[`item.actions`]="{ item }">
        <div class="d-flex align-center">
          <v-tooltip text="Редактировать" location="top">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-pencil"
                variant="text"
                color="primary"
                density="comfortable"
                @click="emit('edit', item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Удалить" location="top">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-delete"
                variant="text"
                color="error"
                density="comfortable"
                class="ml-2"
                @click="confirmDelete(item)"
              />
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #no-data>
        <div class="d-flex flex-column align-center pa-4">
          <v-icon icon="mdi-mother-nurse" size="64" color="grey-lighten-1" />
          <span class="text-grey-darken-1 mt-2">Нет данных</span>
        </div>
      </template>
    </v-data-table>

    <ConfirmDeleteDialog
      v-model="deleteDialog"
      :message="`Вы действительно хотите удалить медсестру ${nurseToDelete?.name}?`"
      @confirm="handleDelete"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DataTableCompareResult } from 'vuetify'
import type { Nurse, TableHeader } from '@/utils/types/EmployeeTypes'
import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.vue'

defineProps({
  nurses: {
    type: Array as () => Nurse[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'edit', nurse: Nurse): void
  (e: 'delete', id: number): void
}>()

const search = ref('')
const sortBy = ref<DataTableCompareResult[]>([{ key: 'name', order: 'asc' }])
const deleteDialog = ref(false)
const nurseToDelete = ref<Nurse | null>(null)

const headers: TableHeader[] = [
  {
    title: 'ФИО',
    key: 'name',
    width: '400px',
  },
  {
    title: 'Отделение',
    key: 'department',
    width: '200px',
  },
  {
    title: 'Действия',
    key: 'actions',
    sortable: false,
    width: '120px',
  },
]

const confirmDelete = (nurse: Nurse) => {
  nurseToDelete.value = nurse
  deleteDialog.value = true
}

const handleDelete = () => {
  if (nurseToDelete.value?.id) {
    emit('delete', nurseToDelete.value.id)
    deleteDialog.value = false
    nurseToDelete.value = null
  }
}
</script>
