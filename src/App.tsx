import { useEffect, useState } from 'react'
import './App.css'
import { useTheme } from './ThemeContext'

interface TodoIten {
 id: string,
 texto : string,
 completado: boolean
}

function App() {
  


  const chaveMemoriaTarefas = "tarefas"

  const {theme, toggleTheme} = useTheme()
  const [todos, setTodos] = useState<TodoIten[]>([])
  const [newTodo, setNewTodo] = useState<string>("")
  const [ estaCarregado, setEstaCarregado] = useState<boolean> (false)

  const adicionarTarefa = () : void => {
    if( newTodo !== ""){
      const newId = crypto.randomUUID()
      const newTodoIten: TodoIten = {
        id: newId,
        texto: newTodo,
        completado: false
      }
      setTodos([...todos, newTodoIten])
      setNewTodo("")
    }
  }

  const removerTarefa = (id: string) : void => {
    const tarefasAtualizadas = todos.filter((todo) => todo.id !== id)
    setTodos(tarefasAtualizadas)
  }

  const marcarCompleto = (id: string) : void => {
    const todosAtualizados = todos.map((todo)=>{
      if(todo.id === id){
        return {
          ...todo, completado : !todo.completado
        }
        
      }
      return todo
    })
    setTodos(todosAtualizados)
  }

  const obterTarefasCaompletas = (): TodoIten[]=>{
    return todos.filter(todo => todo.completado)
  }

  useEffect(()=>{
    if(estaCarregado){
      localStorage.setItem(chaveMemoriaTarefas, JSON.stringify(todos))
    }
  }, [todos, estaCarregado])

  useEffect(()=>{
    const tarefaMemoria = localStorage.getItem(chaveMemoriaTarefas)

    if(tarefaMemoria){
      setTodos(JSON.parse(tarefaMemoria))
    }

    setEstaCarregado(true)
  },[])


  return (
    <>
      <div className={`app ${theme}`}> 
        
        <div className={`container ${theme}`}>
          <h1>Lista de Tarefas - {obterTarefasCaompletas().length}/{todos.length}</h1>
          <div className='input-container'>
            <input type="text" value={newTodo} onChange={(e)=> setNewTodo(e.target.value)} />
            <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
          </div>
          <ol>
            {
              todos.map((todo)=>(
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.completado} onChange={() => marcarCompleto(todo.id)} />
                  <span style={{textDecoration: todo.completado ? 'line-through' : 'none'}}>{todo.texto}</span>
                  <button onClick={() => removerTarefa(todo.id)}> Remover </button>
                </li>
              ))
            }
          </ol>
          <button onClick={toggleTheme}>Alterar para o tema {theme === 'light' ? 'Escuro' : 'Claro'}</button>
        </div>
      </div>
    </>
  )
}

export default App
