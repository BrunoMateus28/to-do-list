// Marca o componente como um Client Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsTrash } from 'react-icons/bs';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Home() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    let ignore = false;
    if (!ignore){
      loadTheme();
      loadTodos();
    }
    return () => {ignore = true;}
    },[]);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [todos, darkMode]);

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  };

  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo = { id: Date.now(), text: inputValue, completed: false };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleTodo = async (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = async (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompletedTodos = async () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className={`bg-${darkMode ? 'black' : 'white'} rounded-lg shadow-lg p-6 w-full max-w-md`} style={{ backgroundColor: darkMode ? '#282828' : '' }}>
        <h1 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tarefas</h1>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className={`flex items-center justify-between p-3 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className={`h-4 w-4 rounded border-gray-300 focus:ring-1 ${darkMode ? 'text-green-500' : 'text-blue-500'}`}
                />
                <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.text}</span>
              </label>
              <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
                <BsTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Adicionar nova tarefa"
            className={`mt-4 flex-1 py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-400 focus:border-blue-400 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          />
          <button onClick={handleAddTodo} className={`mt-4 py-2 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-blue-400 focus:ring-2 ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600'}`}>Adicionar</button>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleClearCompletedTodos} className={`flex-1 mt-4 py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-red-400 focus:ring-2 ${darkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'}`}>Apagar concluídas</button>
          <button onClick={toggleDarkMode} className={`mt-4 py-2 px-4 rounded-md ${darkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}>  {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}</button>
        </div>
      </div>
    </div>
  );
}
