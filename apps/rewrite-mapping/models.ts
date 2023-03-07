/** Defines the Node of the graph. */
export interface GraphNode {
  id: string;
  order: number;
  title?: string;
  url?: string;
  words?: number;
  blank?: boolean;
  brandNew?: boolean;
}

/** Defines the Edge of the graph. */
export interface GraphEdge {
  from: string;
  to: string;
  brandNew?: boolean;
}
