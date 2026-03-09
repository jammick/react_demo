import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";





function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

 function addTask(name) {
 const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  setTasks([...tasks, newTask]);
}


function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  setTasks(updatedTasks);
}

function deleteTask(id) {
  const remainingTasks = tasks.filter((task) => id !== task.id);
  setTasks(remainingTasks);
}

function editTask(id, newName) {
  const editedTaskList = tasks.map((task) => {
    if (id === task.id) {
      return { ...task, name: newName };
    }
    return task;
  });
  setTasks(editedTaskList);
}


  const filterList = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    } else if (filter === "Completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  const taskList = filterList.map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));

  const tasksNoun = filterList.length !== 1 ? "tasks" : "task";
  const headingText = `${filterList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
     <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="All" isPressed={filter === "All"} setFilter={setFilter} />
        <FilterButton name="Active" isPressed={filter === "Active"} setFilter={setFilter} />
        <FilterButton name="Completed" isPressed={filter === "Completed"} setFilter={setFilter} />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
