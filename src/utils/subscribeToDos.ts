import { collection, orderBy, query } from "firebase/firestore/lite"
import { onSnapshot } from "firebase/firestore"
import IToDo from "../types/todos"
import db from "../firebase"

export default async function subscribeToDos(callback: Function) {
  const todosCol = collection(db, "todos")
  const q = query(todosCol, orderBy("createdAt", "desc"))

  onSnapshot(q, (querySnapshot) => {
    const todos: IToDo[] = []
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        data: doc.data(),
      })
    })
    callback(todos)
  })
}
