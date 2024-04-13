import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box p={5}>
      <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} mb={4} />
      <Button onClick={handleAddTask} colorScheme="blue" mb={4}>
        Add Task
      </Button>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} d="flex" alignItems="center" justifyContent="space-between">
            <Text as={task.isCompleted ? "s" : ""}>{task.text}</Text>
            <Box>
              <IconButton icon={<FaCheck />} onClick={() => handleCompleteTask(task.id)} colorScheme="green" aria-label="Complete Task" mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete Task" />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
