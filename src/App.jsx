import { useState, useEffect } from 'react' // 1. Ajout de useEffect
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Todo app with React
function App() {
  // Fonction d'initialisation
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('react_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  // Sauvegarder tâches dans le LocalStorage
  useEffect(() => {
    localStorage.setItem('react_todos', JSON.stringify(todos));
  }, [todos]);
  // Ajouter une tâche
  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text: inputValue,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputValue(''); // Vide le champ de saisie
  };
  // Cocher / Décocher une tâche
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  // Supprimer une tâche
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  return (
    <div style={styles.container}>
      <h2>Mon Todo List 📝</h2>      
      {/* Formulaire d'ajout */}
      <form onSubmit={addTodo} style={styles.form}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..." 
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Ajouter</button>
      </form>
      {/* Liste des tâches */}
      <ul style={styles.list}>
        {todos.length === 0 ? <p style={styles.empty}>Aucune tâche pour le moment !</p> : null}        
        {todos.map(todo => (
          <li key={todo.id} style={styles.todoItem}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#e8d7d7'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// Styles CSS
const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', boxShadow: '0 4px 8px rgba(241, 228, 228, 0.1)', borderRadius: '8px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' },
  addButton: { padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  list: { listStyleType: 'none', padding: 0, margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' },
  todoItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', },
  todoText: { cursor: 'pointer', flex: 1, textAlign: 'left' },
  deleteButton: { backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  empty: { color: 'white', fontStyle: 'italic' }
};
export default App;
