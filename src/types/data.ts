export interface ITask {
  id: string;
  title: string;
  is_done: boolean;
  created_at: string;
  updated_at?: string;
}
