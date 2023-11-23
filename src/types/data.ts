export interface ITask {
  id: string;
  title: string;
  is_done: boolean;
  created_at: string;
  done_at?: string;
}
