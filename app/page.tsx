// Marca o componente como um Client Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsTrash } from 'react-icons/bs';

export default function Home() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#8A9FB8' }}>
      <div className="bg-#9F6D6A rounded-lg shadow-lg p-6" style={{ backgroundColor: '#9F6D6A' }}>
        <div className="bg-#B0B78A rounded-lg p-4 mb-4" style={{ backgroundColor: '#B0B78A' }}>
          <h1 className="text-2xl font-semibold text-center text-black">To Do List</h1>
        </div>
        <ul className="list-disc pl-6 mb-4">
          {todos.map(todo => (
            <li key={todo.id} className="text-black flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)} className="ml-auto">
                <BsTrash size={20} color="red" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Adicionar novo afazer"
            className="p-2 border border-gray-300 rounded-l-md text-white"
            style={{ backgroundColor: '#B88D8A'}}
          />
          <button onClick={handleAddTodo} className="px-4 py-2 bg-#B6B88A text-black rounded-r-md "style={{ backgroundColor: '#B0B78A' }}>
            Adicionar
          </button>
        </div>
        <button onClick={handleClearCompletedTodos} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Apagar concluídos
        </button>
      </div>
    </div>
  );
}
