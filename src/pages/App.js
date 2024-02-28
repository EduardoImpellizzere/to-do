import { useEffect, useState, useCallback } from "react";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import AddToDoItem from "@/components/todos/addToDoItem";
import ToDoList from "@/components/todos/toDoList";
import Search from "@/components/search/search";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showFilteredTodos, setShowFilteredTodos] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterImportant, setFilterImportant] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todo");
      const result = await response.json();
      return result.todos;
    } catch (e) {
      console.error("Error fetching todos:", e);
    }
  };

  const handleUpdateActiveFilter = (filter) => {
    setActiveFilter(filter);
  };

  const handleUpdateFilterImportant = () => {
    setFilterImportant(!filterImportant);
  };

  const handleAddTodo = async (newTodo) => {
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

  const handleEditTodo = async (todoId, editedTodo) => {
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

  const handleDeleteTodo = async (todoId) => {
    try {
      await fetch(`/api/todo/${todoId}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (e) {
      console.error("Error deleting todo:", e);
    }
  };

  const handleRefresh = async () => {
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

  const handleClearCompleted = async () => {
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

  const handleSearch = (searchText) => {
    setActiveFilter("all");
    setFilterImportant(false);
    const searchResults = searchText.trim().toLowerCase();

    if (searchResults === "") {
      setFilteredTodos([]);
      setShowFilteredTodos(false);
      return;
    }

    if (filteredTodos.length > 0) {
      const filteredResults = filteredTodos.filter((todo) =>
        todo.todoText.toLowerCase().includes(searchResults)
      );
      setFilteredTodos(filteredResults);
      setShowFilteredTodos(filteredResults.length > 0);
    } else {
      const allResults = todos.filter((todo) =>
        todo.todoText.toLowerCase().includes(searchResults)
      );
      setFilteredTodos(allResults);
      setShowFilteredTodos(allResults.length > 0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await fetchTodos();
      setTodos(todosData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (activeFilter === "all" && !filterImportant) {
        setFilteredTodos([]);
        setShowFilteredTodos(false);
        return;
      }

      let urlFilter = activeFilter;

      if (activeFilter === "all" && filterImportant) {
        urlFilter = "important";
      }

      try {
        const initialUrl = "/api/todo/search";
        const urlParams = new URLSearchParams();
        urlParams.set("filter", urlFilter);

        if (filterImportant && activeFilter !== "all") {
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
    fetchData();
  }, [activeFilter, filterImportant]);

  return (
    <>
      <Header />
      <Search
        onSearch={handleSearch}
        onUpdateActiveFilter={handleUpdateActiveFilter}
        onUpdateFilterImportant={handleUpdateFilterImportant}
        isFilterImportantActive={filterImportant}
        activeFilter={activeFilter}
      />
      <AddToDoItem onAddTodo={handleAddTodo} />
      <ToDoList
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
        todos={showFilteredTodos ? filteredTodos : todos}
      />
      <Footer
        onRefresh={handleRefresh}
        onClearCompleted={handleClearCompleted}
        listCount={showFilteredTodos ? filteredTodos.length : todos.length}
      />
    </>
  );
};

export default App;
