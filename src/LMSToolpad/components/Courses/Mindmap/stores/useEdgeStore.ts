/** @format */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addEdge, Connection, Edge } from "@xyflow/react";
import { edgesData } from "../test/edgeData";

export interface EdgeStoreState {
  // Keep both data structures
  edges: Edge[];
  edgeMap: Map<string, Edge>; // For O(1) lookups

  // Operations
  setEdges: (edges: Edge[]) => void;
  addEdgeToStore: (edge: Edge | Connection) => void;
  updateEdge: (edge: Edge) => void;
  updateEdges: (edges: Edge[]) => void;
  removeEdge: (edgeId: string) => void;
  getEdge: (id: string) => Edge | undefined;
}

// Initialize both structures
const createInitialEdgeMap = () => {
  const map = new Map<string, Edge>();
  edgesData.forEach((edge) => map.set(edge.id, edge));
  return map;
};

export const useEdgeStore = create<EdgeStoreState>()(
  persist(
    (set, get) => ({
      edges: edgesData,
      edgeMap: createInitialEdgeMap(),

      // Efficient edge lookup
      getEdge: (id: string) => get().edgeMap.get(id),

      setEdges: (edges) => {
        // Validate input is an array
        if (!Array.isArray(edges)) {
          console.error("Invalid edges value:", edges);
          return;
        }

        // Update both array and map simultaneously
        const edgeMap = new Map<string, Edge>();
        edges.forEach((edge) => edgeMap.set(edge.id, edge));

        set({ edges, edgeMap });
      },

      addEdgeToStore: (edge) => {
        set((state) => {
          const oldLength = state.edges.length;
          const updatedEdges = addEdge(edge, state.edges);
          if (updatedEdges.length === oldLength) {
            console.warn(`Edge already exists.`);
            return state; // No changes made
          }
          //Otherwise, we get the new edge from the updatedEdges (is it the last one?)
          const newEdge = updatedEdges[updatedEdges.length - 1];
          console.log("New edge added:", newEdge);

          if (state.edgeMap.has(newEdge.id)) {
            console.warn(`Edge with id ${newEdge.id} already exists.`);
            return state; // No changes made
          }
          //Let's also make a quick check to see if the edge already exists
          const updatedMap = new Map(state.edgeMap);
          updatedMap.set(newEdge.id, newEdge);
          return { edges: updatedEdges, edgeMap: updatedMap };
        });
      },

      updateEdge: (edge) => {
        set((state) => {
          const updatedEdges = state.edges.map((e) =>
            e.id === edge.id ? edge : e
          );
          const updatedMap = new Map(state.edgeMap);
          updatedMap.set(edge.id, edge);
          return { edges: updatedEdges, edgeMap: updatedMap };
        });
      },
      updateEdges: (edges) => {
        set((state) => {
          const updatedEdges = edges.map((edge) => {
            const existingEdge = state.edgeMap.get(edge.id);
            return existingEdge ? { ...existingEdge, ...edge } : edge;
          });
          const updatedMap = new Map(state.edgeMap);
          updatedEdges.forEach((edge) => updatedMap.set(edge.id, edge));
          return { edges: updatedEdges, edgeMap: updatedMap };
        });
      },

      removeEdge: (edgeId) => {
        set((state) => {
          const updatedEdges = state.edges.filter((edge) => edge.id !== edgeId);
          const updatedMap = new Map(state.edgeMap);
          updatedMap.delete(edgeId);
          return { edges: updatedEdges, edgeMap: updatedMap };
        });
      },
    }),
    {
      name: "edge-storage",
      partialize: (state) => ({
        edges: state.edges,
        // We don't need to persist the map since it's derived
      }),
    }
  )
);
