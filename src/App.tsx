import { Container, Typography, Box, TextField, Button, List, Card, Divider } from "@mui/material"
import React, { useEffect, useState } from "react"
import { collection, deleteDoc, doc, addDoc, Timestamp, setDoc } from "firebase/firestore/lite"
import { SubmitHandler, useForm } from "react-hook-form"

import db from "./firebase"

import ToDoItem from "./components/ToDoItem"
import subscribeToDos from "./utils/subscribeToDos"
import IToDo from "./types/todos"

type Inputs = {
  task: string
}

function App() {
  const [todos, setTodos] = useState<IToDo[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    subscribeToDos(setTodos)
  }, [])

  const onSubmit: SubmitHandler<Inputs> = ({ task }) => {
    if (task) {
      addDoc(collection(db, "todos"), {
        done: false,
        task,
        createdAt: Timestamp.fromDate(new Date()),
      }).finally(() => {
        reset()
      })
    }
  }

  const handleDelete = (id: string) => {
    deleteDoc(doc(db, "todos", id))
  }

  const handleToggle = (id: string) => {
    setDoc(doc(db, "todos", id), { done: !todos.find((todo) => todo.id === id)!.data.done }, { merge: true })
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={{ my: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1">
          ToDo List
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            my: 4,
          }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            {...register("task", { required: true })}
            label="New Task"
            required
            error={errors.task !== undefined}
          />
          <Button variant="contained" disableElevation type="submit">
            Add
          </Button>
        </Box>
      </Box>

      <Card variant="outlined">
        {todos.length === 0 && (
          <Typography variant="h5" component="h2" sx={{ mt: 2, textAlign: "center" }} color="text.secondary">
            It seems like there is nothing to do, add a task to get started.
          </Typography>
        )}

        <List>
          {todos.map((todo, i) => (
            <React.Fragment key={todo.id}>
              <ToDoItem
                text={todo.data.task}
                handleDelete={() => handleDelete(todo.id)}
                handleToggle={() => handleToggle(todo.id)}
                checked={todo.data.done}
              />

              {i !== todos.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Container>
  )
}

export default App
