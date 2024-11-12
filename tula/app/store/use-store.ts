import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { Graph, StructType } from '../types/structs';
import { markerEnd } from '@/lib/utils';

export type RFState = {
  graph: Graph;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  getEdgeTargetNode: (id: string) => void;
  setEdgeData: (id: string, data: string) => void;
  onEdgesChange: OnEdgesChange;
  deleteNode: (id: string) => void;
  setEdgeAnimated: (isPlay: boolean) => void;
  setNodeLabel: (id: string, count: number,) => void;
  onConnect: (connection: any) => void;
  addNode: (struct: StructType) => void;
  getEdgeValues: (id: string) => { sourceStruct: any, sourceValue: any, targetValue: any };
  setNodeName: (id: string, name: string) => void
  generateNode: (id: number, struct: string, label: string) => void
  generateEdge: (id: number, source: number, target: number, data: number) => void
  getNodesJson: () => any,
  getEdgesJson: () => any
  deleteAll: () => any
};

const graph: Graph = {
  id: 1,
  countComponents: 1,
  owner: "mc_Valera",
  created: "01.01.2002",
  modified: "01.01.2002",
  title: "Graph",
  description: ""
}

const useStore = create<RFState>((set, get) => ({
  graph: graph,
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: any) => {
    const newEdge = {
      ...connection, id: "id" + new Date(),
      key: "id" + new Date(),
      type: "custom", animated: false,
      markerEnd: markerEnd,
      data: {
        data: 1
      },
    };
    set((state) => ({
      edges: [...get().edges, newEdge],
    }));
  },
  setEdgeData: (id: string, data: string) => {
    const edges = useStore.getState().edges
    const edgeIndex = edges.findIndex((edge) => edge.id === id)
    if (edgeIndex !== -1) {
      const updatedEdge = {
        ...edges[edgeIndex],
        data: data
      }
      const updatedEdges = [...edges];
      updatedEdges[edgeIndex] = updatedEdge;
      set({
        edges: updatedEdges,
      })
    }
  },
  deleteNode: (id: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    }));
  },
  setEdgeAnimated: (isPlay: boolean) => {
    if (isPlay) {
      const edges = useStore.getState().edges.map((edge) => ({
        ...edge,
        animated: true,
        style: { stroke: "red" }
      }));
      set({
        edges: edges,
      })
    }
    else {
      const edges = useStore.getState().edges.map((edge) => ({
        ...edge,
        animated: false,
        style: { stroke: "black" }
      }));
      set({
        edges: edges,
      })
    }
  },
  getEdgeTargetNode: (id: string) => {
    const edges: Edge[] = useStore.getState().edges;
    const edge = edges.find((edge: Edge) => edge.id === id);
    return edge?.target
  },
  getEdgeValues: (id: string) => {
    const edges: Edge[] = useStore.getState().edges;
    const edge = edges.find((edge: Edge) => edge.id === id);
    const nodes: Node[] = useStore.getState().nodes

    const sourceNode = nodes.find(node => node.id === edge?.source)
    const targetNode = nodes.find(node => node.id === edge?.target)

    return {
      sourceStruct: sourceNode?.data.struct,
      sourceValue: sourceNode?.data.label || "0",
      targetValue: targetNode?.data.label || "0"
    }
  },
  setNodeLabel: (id: string, count: number) => {
    const nodes = useStore.getState().nodes;
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex !== -1) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        data: {
          ...updatedNodes[nodeIndex].data,
          label: count
        }
      };

      set({
        nodes: updatedNodes,
      })
    }
  },
  setNodeName: (id: string, name: string) => {
    const nodes = useStore.getState().nodes;
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex !== -1) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        data: {
          ...updatedNodes[nodeIndex].data,
          name: name
        }
      };

      set({
        nodes: updatedNodes,
      })
    }
  },

  addNode: (struct: StructType) => {
    let newNode;
    newNode = {
      id: nanoid(),
      type: struct.toLowerCase() + "Node",
      data: { label: '0', struct: struct, name: null },
      position: {
        x: (Math.random() * window.innerWidth / 2),
        y: (Math.random() * window.innerHeight / 2),
      },
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },
  generateNode: (id: number, structString: string, label: string) => {
    let struct = structString[0].toUpperCase() + structString.slice(1);
    let newNode;
    structString === "source" ? newNode = {
      id: id.toString(),
      type: struct.toLowerCase() + "Node",
      data: { label: '0', struct: struct, name: label },
      position: {
        x: (Math.random() * window.innerWidth / 2) / 2,
        y: (Math.random() * window.innerHeight / 2) / 2,
      },
    } : structString === "end" ? newNode = {
      id: id.toString(),
      type: struct.toLowerCase() + "Node",
      data: { label: '0', struct: struct, name: label },
      position: {
        x: (Math.random() * window.innerWidth / 2) + window.innerWidth / 2,
        y: (Math.random() * window.innerHeight / 2) + window.innerHeight / 2,
      },
    } : newNode = {
      id: id.toString(),
      type: struct.toLowerCase() + "Node",
      data: { label: '0', struct: struct, name: label },
      position: {
        x: (Math.random() * window.innerWidth / 2),
        y: (Math.random() * window.innerHeight / 2),
      },
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },
  generateEdge(id: number, source: number, target: number, value: number) {
    const newEdge = {
      id: id.toString(),
      source: source.toString(),
      target: target.toString(),
      key: "id" + new Date(),
      type: "custom",
      animated: false,
      markerEnd: markerEnd,
      data: {
        data: value
      },
    };
    set((state) => ({
      edges: [...get().edges, newEdge],
    }));
  },
  getNodesJson: () => {
    const arr = get().nodes.map(el => {
      return `{
      "id": "${el.id}",
      "element_type": "node",
      "struct": "${el.data.struct.toLowerCase()}",
      "label": " ${el.data.name ? el.data.name.toLowerCase() : "null"}"
      }`
    })
    return arr
  },
  getEdgesJson: () => {
    const arr = get().edges.map(el => {
      return `{
      "id": "${el.id}",
      "element_type": "edge",
      "source_id": "${el.source}",
      "target_id": " ${el.target}",
      "value": " ${el.data.data ? el.data.data : 1}"
      }`
    })
    return arr
  },
  deleteAll: () => {
    set((state) => ({
      edges: [],
      nodes: []
    }));
  }
}));

export default useStore;