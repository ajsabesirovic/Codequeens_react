import { useReducer } from "react";


const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "INCREMENT_BY":
      return { count: state.count + action.payload };
    case "DECREMENT_BY":
      return { count: state.count - action.payload };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Counter</h1>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          margin: "20px 0",
          color: state.count > 0 ? "green" : state.count < 0 ? "red" : "black",
        }}
      >
        {state.count}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => dispatch({ type: "DECREMENT_BY", payload: 5 })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -5
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -1
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#757575",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +1
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT_BY", payload: 5 })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +5
        </button>
      </div>
    </div>
  );
};

export default Counter;
