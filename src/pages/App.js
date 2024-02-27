import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import AddToDoItem from "@/components/todos/addToDoItem";
import ToDoList from "@/components/todos/toDoList";
import { useEffect, useState } from "react";
import Search from "@/components/search/search";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showFilteredTodos, setShowFilteredTodos] = useState(false);

  const [activeFilter, setActiveFilter] = useState("all");

  const wrapperSetActiveFilter = (filter) => {
    setActiveFilter(filter);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todo");
      const result = await response.json();
      return result.todos;
    } catch (e) {
      console.error("Error fetching todos:", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await fetchTodos();
      setTodos(todosData);
    };
    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  const editTodo = async (todoId, editedTodo) => {
    try {
      await fetch(`/api/todo/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTodo),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                todoText: editedTodo.todoText,
                completed: editedTodo.completed,
                important: editedTodo.important,
              }
            : todo
        )
      );

      if (filteredTodos.length > 0) {
        setFilteredTodos((prevFilteredTodos) =>
          prevFilteredTodos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  todoText: editedTodo.todoText,
                  completed: editedTodo.completed,
                  important: editedTodo.important,
                }
              : todo
          )
        );
      }
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await fetch(`/api/todo/${todoId}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (e) {
      console.error("Error deleting todo:", e);
    }
  };

  const refreshTodo = async () => {
    try {
      await fetch("/api/todo/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  const clearCompletedTodo = async () => {
    try {
      await fetch("/api/todo/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  const filterTodo = async (importantFilter) => {
    if (activeFilter === "all" && !importantFilter) {
      setFilteredTodos([]);
      setShowFilteredTodos(false);
      return;
    }

    let urlFilter = activeFilter;

    if (activeFilter === "all" && importantFilter) {
      urlFilter = "important";
    }

    try {
      const initialUrl = "/api/todo/search";
      const urlParams = new URLSearchParams();
      urlParams.set("filter", urlFilter);

      if (importantFilter && activeFilter !== "all") {
        urlParams.append("filter", "important");
      }

      const updatedUrl = `${initialUrl}?${urlParams.toString()}`;
      const response = await fetch(updatedUrl);
      const result = await response.json();
      setFilteredTodos(result.todos);
      setShowFilteredTodos(result.todos.length > 0);
    } catch (e) {
      console.error("Error filtering todos:", e);
    }
  };

  return (
    <>
      <Header />
      <Search
        onFilter={filterTodo}
        activeFilter={activeFilter}
        wrapperSetActiveFilter={wrapperSetActiveFilter}
      />
      <AddToDoItem onAddTodo={addTodo} />
      <ToDoList
        todos={showFilteredTodos ? filteredTodos : todos}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
      <Footer
        listCount={showFilteredTodos ? filteredTodos.length : todos.length}
        onClearCompleted={clearCompletedTodo}
        onRefresh={refreshTodo}
      />
    </>
  );
};

export default App;
