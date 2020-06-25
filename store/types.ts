export interface Todo {
  title: string
  id: number
  status: 'TODO' | 'DOING' | 'DONE'
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
}
