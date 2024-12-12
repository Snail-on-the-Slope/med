export interface Employee {
  id: number
  name: string
  department: string
}

export type Doctor = Employee & {
  isHead: boolean
}

export type CreateDoctor = Omit<Doctor, 'id' | 'department'> & {
  id?: number
  department?: string
}

export type Nurse = Employee

export type CreateNurse = Omit<Nurse, 'id' | 'department'> & {
  id?: number
  department?: string
}

export interface TableHeader {
  title: string
  key: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: string
}

export type SortItem = {
  key: string
  order: 'asc' | 'desc'
}
