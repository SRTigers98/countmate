export type CounterEntry = {
  id: string;
  name: string;
};

export type Counter = {
  counters: AtomicCounter[];
  unit?: string;
};

export type AtomicCounter = {
  name: string;
  value?: number;
  count: number;
};
