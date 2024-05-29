const service = {
  getAllStatus: () => Object.values(EItemStatus),
  cycleStatus: (currentStatus: EItemStatus) => {
    switch (currentStatus) {
      case EItemStatus.pending:
        return EItemStatus.in_progress
      case EItemStatus.in_progress:
        return EItemStatus.completed
      case EItemStatus.completed:
        return EItemStatus.pending
    }
  },
  getStatusIcon: (status: EItemStatus) => {
    switch (status) {
      case EItemStatus.pending:
        return 'pi pi-hourglass'
      case EItemStatus.in_progress:
        return 'pi pi-spinner'
      case EItemStatus.completed:
        return 'pi pi-check'
    }
  }
}

export enum EItemStatus {
  pending = 'Pending',
  in_progress = 'In Progress',
  completed = 'Completed'
}

export interface TodoItem {
  id: number
  status: EItemStatus
  content: string
}

export default service
