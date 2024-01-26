// another component that renders all the todos
import "./Todos.css"

export function Todos({todos}) {
    return <div>
    {todos.map((todo) => {
        return <div className="todos">
        <h1>{todo.title}</h1>
        <h2>{todo.description}</h2>
        <button>{todo.done == true ? "Completed!!" : "Complete"}</button>
        </div>
    })}
    </div>
}