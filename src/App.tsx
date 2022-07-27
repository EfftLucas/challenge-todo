import { Clipboard, PlusCircle } from "phosphor-react";
import { useState } from "react";
import Styles from "./App.module.css";

import Logo from "./assets/Logo.svg";
import Task from "./Components/Task";
interface TaskProps {
  id: string;
  description: string;
}

function App() {
  const [NewTask, setNewTask] = useState("");
  const [Tasks, setTasks] = useState<TaskProps[]>([]);
  const [CompletedTasks, setCompletedTasks] = useState<TaskProps[]>([]);

  function DeleteCompletedTasks(TaskToDelete: TaskProps) {

      const NewData = CompletedTasks.filter(e => e.id === TaskToDelete.id).length > 0

      if(NewData == false) {
        setCompletedTasks([...CompletedTasks,TaskToDelete]);
      } else {
        const TasksWithoutOneDeleted = CompletedTasks.filter(task => {
          return task.id !== TaskToDelete.id;
        })
  
        setCompletedTasks(TasksWithoutOneDeleted);
      }
      


  }

  function deleteTask(TaskToDelete: TaskProps) {
    

    const TasksWithoutOneDeleted = Tasks.filter(task => {
      return task.id !== TaskToDelete.id;
    })

    setTasks(TasksWithoutOneDeleted);

  }
  const isTasksEmpty = Tasks.length == 0;

  return (
    <>
      <header className={Styles.header}>
        <img src={Logo} alt="Logo" />
      </header>
      <div className={Styles.NewTaskContainer}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={NewTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button
          onClick={() =>
            setTasks([...Tasks, { id: NewTask, description: NewTask }])
          }
        >
          Criar <PlusCircle size={20} />
        </button>
      </div>
      <main className={Styles.MainContainer}>
        <div className={Styles.TaskInfo}>
          <p className={Styles.Created}>
            Tarefas criadas<span>{Tasks.length}</span>
          </p>
          <p className={Styles.Done}>
            Concluídas <span>{CompletedTasks.length}</span>
          </p>
        </div>

        <div className={Styles.TaskMainContainer}>
          {isTasksEmpty ? (
            <label>
              <Clipboard size={56} className={Styles.Icon} />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </label>
          ) : (
            <div className={Styles.TaskListContainer}>
              {Tasks.map((task: TaskProps) => {
                return <Task key={task.id} id={task.id} description={task.description} OnDeleteTask={deleteTask} DeleteCompletedTasks={DeleteCompletedTasks} />;
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
