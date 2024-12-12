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
      :items="doctors"
      :search="search"
      :loading="loading"
      items-per-page="-1"
      hover
      hide-default-footer
      class="elevation-1 custom-table"
      item-value="id"
      fixed-header
    >
      <template #[`item.isHead`]="{ item }">
        <v-chip color="success" v-if="item.isHead" variant="outlined" size="small">
          Заведующий
        </v-chip>
      </template>

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
                @click="$emit('edit', item)"
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
          <v-icon icon="mdi-doctor" size="64" color="grey-lighten-1" />
          <span class="text-grey-darken-1 mt-2">Нет данных</span>
        </div>
      </template>
    </v-data-table>

    <ConfirmDeleteDialog
      v-model="deleteDialog"
      :message="`Вы действительно хотите удалить врача ${doctorToDelete?.name}?`"
      @confirm="handleDelete"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DataTableCompareResult } from 'vuetify'
import type { Doctor, TableHeader } from '@/utils/types/EmployeeTypes'
import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.vue'

defineProps({
  doctors: {
    type: Array as () => Doctor[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'edit', doctor: Doctor): void
  (e: 'delete', id: number): void
}>()

const search = ref('')
const sortBy = ref<DataTableCompareResult[]>([{ key: 'name', order: 'asc' }])
const deleteDialog = ref(false)
const doctorToDelete = ref<Doctor | null>(null)

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
    title: 'Заведующий',
    key: 'isHead',
    width: '120px',
  },
  {
    title: 'Действия',
    key: 'actions',
    sortable: false,
    width: '120px',
  },
]

const confirmDelete = (doctor: Doctor) => {
  doctorToDelete.value = doctor
  deleteDialog.value = true
}

const handleDelete = () => {
  if (doctorToDelete.value?.id) {
    emit('delete', doctorToDelete.value.id)
    deleteDialog.value = false
    doctorToDelete.value = null
  }
}
</script>
