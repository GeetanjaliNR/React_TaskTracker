import Header from './component/Header';
import Footer from './component/Footer';
import Tasks from './component/Tasks';
import About from './component/About';
import { useState, useEffect } from 'react';
import AddTask from './component/AddTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchData();

      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchData = async () => {
    // fetch('http://localhost:5000/tasks')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    return fetch(`http://localhost:5000/tasks/${id}`).then((res) => res.json());
  };

  async function addTask(task) {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    console.log(data);

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 100) + 1;
    // task = { id, ...task };
    // setTasks([...tasks, task]);
  }

  async function deleteTasks(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });

    // setTasks(tasks);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    console.log(tasks);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          addState={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTasks}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Task To Show!'
                )}
              </>
            }
          ></Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
