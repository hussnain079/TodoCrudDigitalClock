import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { List, Input, } from 'antd';
import { addTask, updateTask, deleteTask } from '../../redux/tasksSlice';
import AntButton from "../../components/Button/AntButton"

const TodoList = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(state => state.tasks.taskList);
  const [editTask, setEditTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
    };
    dispatch(addTask(newTask));
    setNewTaskName(' ');
  };

  const handleEditTask = (task) => {
    setEditTask(task.id);
    setEditTaskName(task.name);
  };

  const handleUpdateTask = () => {
    dispatch(updateTask({ id: editTask, updatedTask: { name: editTaskName } }));
    setEditTask(null);
    setEditTaskName('');
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = reorder(
      taskList,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className='ui__layout'>
          
          <Input.Search
            placeholder="Enter task"
            enterButton="Add Task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onSearch={handleAddTask}
            
          />
          <List
            dataSource={taskList}
            renderItem={(item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <List.Item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    actions={[
                      <AntButton key={`edit-${item.id}`} icon={<AiOutlineEdit size={18} />} name='Edit' type='primary' shape='round' size='large'  onClick={() => handleEditTask(item)} />,
                      <AntButton key={`delete-${item.id}`} 
                      icon={<AiOutlineDelete size={18}/>}
                      name='Delete' type='dashed'  shape='round' size='large'  onClick={() => handleDeleteTask(item.id)} />,
                    ]}
                    style={{
                      ...provided.draggableProps.style,
                      background: snapshot.isDragging ? '#f0f0f0' : 'white',
                    }}
                  >
                    {editTask === item.id ? (
                      <>
                        <Input
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          onPressEnter={handleUpdateTask}
                          onBlur={handleUpdateTask}
                        />
                      </>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </List.Item>
                )}
              </Draggable>
            )}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  );
};

export default TodoList;
