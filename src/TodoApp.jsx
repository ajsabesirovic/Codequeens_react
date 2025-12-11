import { useReducer, useState } from "react";

/**
 * useReducer – kada i zašto:
 * - Kada state ima više polja (todos + filter) i više različitih akcija
 * - Kada želimo čistu separaciju: UI samo šalje akcije (dispatch), reducer drži logiku
 * - Kada želimo predvidljivo ponašanje: action -> reducer -> novi state -> re-render
 *
 * Kako radi tok:
 * 1) Komponenta pozove dispatch({ type, payload? })
 * 2) useReducer prosledi (state, action) u reducer funkciju
 * 3) Reducer vrati NOVI state (bez mutacije)
 * 4) React re-renderuje komponentu sa tim novim state-om
 *
 * Pravila za reducer:
 * - Uvek vrati novi objekat (kopija + izmene), nikad ne mutiraj postojeći state
 * - Koristi switch po action.type
 * - action može imati payload (dodatni podaci)
 */

const initialState = {
  todos: [],
  filter: "all",
};

const todoReducer = (state, action) => {
  // Reducer čita action.type i kreira novi state na osnovu akcije
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  // useReducer spaja reducer + početni state; dispatch šalje akcije ka reduceru
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // UI šalje akciju: tip + payload. Reducer zna šta da uradi.
      dispatch({ type: "ADD_TODO", payload: inputValue.trim() });
      setInputValue("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleFilterChange = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const handleClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const filteredTodos = state.todos.filter((todo) => {
    // Filter se oslanja na state koji je centralizovan u reduceru
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = state.todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = state.todos.filter((todo) => todo.completed).length;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo App</h1>
      
      <form onSubmit={handleAddTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "70%",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
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
          Add Todo
        </button>
      </form>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleFilterChange("all")}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: state.filter === "all" ? "#2196F3" : "#e0e0e0",
            color: state.filter === "all" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All ({state.todos.length})
        </button>
        <button
          onClick={() => handleFilterChange("active")}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: state.filter === "active" ? "#2196F3" : "#e0e0e0",
            color: state.filter === "active" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Active ({activeTodosCount})
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: state.filter === "completed" ? "#2196F3" : "#e0e0e0",
            color: state.filter === "completed" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Completed ({completedTodosCount})
        </button>
        {completedTodosCount > 0 && (
          <button
            onClick={handleClearCompleted}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Completed
          </button>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.length === 0 ? (
          <li style={{ padding: "20px", textAlign: "center", color: "#999" }}>
            No todos found
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                marginBottom: "8px",
                backgroundColor: "black",
                borderRadius: "4px",
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                style={{ marginRight: "12px", cursor: "pointer" }}
              />
              <span style={{ flex: 1 }}>{todo.text}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoApp;

