export interface Employee {
  id?: number
  name: string
  department?: string
}

export type Doctor = Employee & {
  isHead: boolean
}

export type Nurse = Employee

export interface TableHeader {
  title: string
  key: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: string
}

export type SortItem = {
  key: string;
  order: 'asc' | 'desc';
};
