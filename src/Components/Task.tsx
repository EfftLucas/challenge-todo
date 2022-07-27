import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import Styles from './Task.module.css';
import Nike from '../assets/Vector.svg';

interface NewTaskProps {
  id: string;
  description: string;
}

interface TaskProps {
  id:string;
  description: string;
  OnDeleteTask: (task: NewTaskProps) => void;
  DeleteCompletedTasks: (task: NewTaskProps) => void;
}

export default function Task({description, OnDeleteTask, id, DeleteCompletedTasks}: TaskProps) {
  const[Checkbox, setCheckbox] = useState(false);

  function HandleDelete() {
    OnDeleteTask({
      id: id,
      description: description,
    })
  }
  function HandleCheckBoxDelete() {
    DeleteCompletedTasks({
      id: id,
      description: description,
    })
  }
  return(
    <div className={Styles.Task}>
      <label className={Checkbox ? Styles.Checked : Styles.Checkbox}>
        <input type="checkbox" onChange={event => {
          setCheckbox(event.target.checked)
          HandleCheckBoxDelete()
          }}  />
        <span>
          {Checkbox ? <img src={Nike} alt="checkbox" /> : null}
        </span>
      </label>
      <p className={Checkbox ? Styles.CheckedText : ''}>{description}</p>
      <button className={Styles.Icon} onClick={HandleDelete} >
        <Trash size={24}/>
      </button>
    </div>
  )
}