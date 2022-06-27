import { ListItem, IconButton, ListItemText, ListItemButton, ListItemIcon, Checkbox } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { FC } from "react"

interface IToDoItemProps {
  text: string
  checked?: boolean
  handleToggle?: () => void
  handleDelete?: () => void
}

const ToDoItem: FC<IToDoItemProps> = ({ text, checked, handleToggle, handleDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton dense onClick={handleToggle}>
        <ListItemIcon>
          <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText
          primary={text}
          style={{
            textDecoration: checked ? "line-through" : "none",
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default ToDoItem
