<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4">
        {{ editingNurse ? 'Редактировать медсестру' : 'Добавить медсестру' }}
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid" @submit.prevent="save">
          <v-text-field
            v-model="localFormData.name"
            label="ФИО"
            variant="outlined"
            density="comfortable"
            :rules="[rules.required]"
            hide-details="auto"
          />

          <v-select
            v-model="localFormData.department"
            label="Отделение"
            :items="departments"
            variant="outlined"
            density="comfortable"
            :rules="[rules.required]"
            class="mt-4"
            hide-details="auto"
          />
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn color="grey" variant="text" :disabled="loading" @click="close"> Отмена </v-btn>
        <v-btn color="primary" variant="flat" :loading="loading" :disabled="loading" @click="save">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { VForm } from 'vuetify/components'
import type { Nurse } from '@/utils/types/EmployeeTypes'
import { formRules } from '@/utils/formRules'

const props = defineProps<{
  formData: Nurse
  departments: string[]
  editingNurse: Nurse | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'save', data: Nurse): void
  (e: 'close'): void
}>()

const dialog = defineModel<boolean>('dialog', { required: true })
const valid = ref(false)
const form = ref<VForm>()
const rules = formRules

const localFormData = ref<Nurse>()

async function save() {
  await form.value?.validate()

  if (valid.value) {
    emit('save', localFormData.value as Nurse)
  }
}

function close() {
  if (!props.loading) {
    form.value?.reset()
    emit('close')
  }
}

watch(
  () => props.formData,
  (newData) => {
    localFormData.value = {
      id: newData.id,
      name: newData.name,
      department: newData.department ?? undefined,
    }
  },
  { immediate: true, deep: true }
)
</script>
