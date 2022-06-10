const root = document.querySelector('#root');

function App() {

  const [activity, setActivity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  
  function generateId(){
    return Date.now();
  }

  function saveTodoHandler(event){
    event.preventDefault();

    setMessage('')


    if(!activity){
      return setMessage('Harap diisi');
    }


    if(edit.id){
      const updatedTodo = {
        ... edit,
        activity
      }
      const editTodoIndex = todos.findIndex(function(todo){
        return todo.id == edit.id;
      });

      const updatedTodos = [... todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);
      return cancelEditHandler();
    }
    


    setTodos([... todos, {
      id: generateId(),
      activity,
      done: false,
    }]);
    setActivity('');
  }

  function removeTodoHandler(todoId){
    const filteredTodos = todos.filter(function(todo){
      return todo.id != todoId;
    });
    setTodos(filteredTodos);
    if(edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo){
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler(){
    setActivity('');
    setEdit({});
  }

  function doneEditHandler(todo){
    const updatedTodo = {
      ... todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function(currentTodo){
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [... todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (       
    <>
      <h1>App Todo List</h1>
      {message && <p><i>{message}</i></p>}
      <form onSubmit={saveTodoHandler}>
        <input type="text" placeholder="Nama Aktifitas" value={activity} onChange={function (event) {
          setActivity(event.target.value);
        }}/>
        <button type="submit">{edit.id ? 'Ubah' : 'Tambahkan'}</button>
        {edit.id && <button onClick={cancelEditHandler}>Batal</button>}
      </form>
      <ul>
        {todos.map(function(todo){
          return (
            <li key={todo.id} style={{ color:'red' }}>
              <input type="checkbox" onChange={doneEditHandler.bind(this, todo)}/>
              {todo.activity} {todo.done ? '(Selesai)' : '(Belum Selesai)'}
              <button onClick={ editTodoHandler.bind(this, todo)}>Edit</button>
              <button onClick={ removeTodoHandler.bind(this, todo.id)}>Hapus</button>
            </li>
          )
        })}
      </ul>
    </>
  )

}

ReactDOM.render(<App/>, root);