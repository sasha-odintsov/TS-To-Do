export interface ITask {
  id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  updated_at?: Date;
}
