<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h6"> Подтверждение удаления </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="dialog = false"> Отмена </v-btn>
        <v-btn color="error" variant="text" @click="$emit('confirm')"> Удалить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = defineModel<boolean>('modelValue', { required: true })

defineProps<{
  message: string
}>()

defineEmits<{
  (e: 'confirm'): void
}>()
</script>
