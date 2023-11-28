export type Counter = {
  id: string;
  name: string;
  unit?: string;
};

export type AtomicCounter = {
  name: string;
  value?: number;
  count: number;
};
