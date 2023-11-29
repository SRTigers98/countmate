export type Counter = {
  id: string;
  name: string;
  unit?: string;
};

export type AtomicCounter = {
  id: string;
  name: string;
  value?: number;
  count: number;
};
