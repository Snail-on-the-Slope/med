import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Nurse } from '@/utils/types/EmployeeTypes'
import nursesMock from '@/utils/mocks/nurses.json'

export const useNursesStore = defineStore('nurses', () => {
  const nurses = ref<Nurse[]>(nursesMock)

  async function addNurse(nurse: Nurse) {
    nurses.value.push(nurse)
  }

  async function editNurse(updatedNurse: Nurse) {
    const index = nurses.value.findIndex((n) => n.id === updatedNurse.id)
    if (index !== -1) {
      nurses.value[index] = updatedNurse
    }
  }

  async function deleteNurse(id: number) {
    nurses.value = nurses.value.filter((n) => n.id !== id)
  }

  return {
    nurses,
    addNurse,
    editNurse,
    deleteNurse,
  }
})
