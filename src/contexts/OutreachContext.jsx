
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useToast } from "@/components/ui/use-toast";

const OutreachContext = createContext();

const initialState = {
  outreaches: [],
  loading: true,
  error: null
};

function outreachReducer(state, action) {
  switch (action.type) {
    case "SET_OUTREACHES":
      return {
        ...state,
        outreaches: action.payload,
        loading: false
      };
    case "ADD_OUTREACH":
      return {
        ...state,
        outreaches: [...state.outreaches, action.payload]
      };
    case "UPDATE_OUTREACH":
      return {
        ...state,
        outreaches: state.outreaches.map(outreach =>
          outreach.id === action.payload.id ? action.payload : outreach
        )
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export function OutreachProvider({ children }) {
  const [state, dispatch] = useReducer(outreachReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    const loadOutreaches = () => {
      try {
        const savedOutreaches = localStorage.getItem("outreaches");
        if (savedOutreaches) {
          dispatch({ type: "SET_OUTREACHES", payload: JSON.parse(savedOutreaches) });
        } else {
          dispatch({ type: "SET_OUTREACHES", payload: [] });
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load outreaches" });
        toast({
          title: "Error",
          description: "Failed to load outreaches",
          variant: "destructive"
        });
      }
    };

    loadOutreaches();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem("outreaches", JSON.stringify(state.outreaches));
    }
  }, [state.outreaches, state.loading]);

  const addOutreach = (outreach) => {
    try {
      const newOutreach = {
        ...outreach,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: "ADD_OUTREACH", payload: newOutreach });
      toast({
        title: "Success",
        description: "Outreach added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add outreach",
        variant: "destructive"
      });
    }
  };

  const updateOutreach = (outreach) => {
    try {
      dispatch({ type: "UPDATE_OUTREACH", payload: outreach });
      toast({
        title: "Success",
        description: "Outreach updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update outreach",
        variant: "destructive"
      });
    }
  };

  return (
    <OutreachContext.Provider value={{
      outreaches: state.outreaches,
      loading: state.loading,
      error: state.error,
      addOutreach,
      updateOutreach
    }}>
      {children}
    </OutreachContext.Provider>
  );
}

export function useOutreach() {
  const context = useContext(OutreachContext);
  if (!context) {
    throw new Error("useOutreach must be used within an OutreachProvider");
  }
  return context;
}
