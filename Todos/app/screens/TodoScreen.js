import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../src/constants/Colors';
import Todo from '../../src/components/Todo';
import url from '../../src/Url/url';

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(`${url}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        const pendingTasks = tasksData.filter(task => task.status === "pending");
        setTasks(pendingTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${url}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (taskId, newTitle, newDescription) => {
    try {
      await fetch(`${url}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          status: 'pending',
        }),
      });
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, title: newTitle, description: newDescription };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  const handleToggleStatus = async (taskId) => {
    try {
      await fetch(`${url}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'done',
        }),
      });
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.description}>You've got {tasks.length} tasks to do</Text>
      <View style={{ marginBottom: 12 }} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {tasks.map(task => (
        <Todo 
          key={task._id} 
          task={task} 
          onDelete={() => handleDeleteTask(task._id)} 
          onEdit={(newTitle, newDescription) => handleEditTask(task._id, newTitle, newDescription)} 
          isEditing={editTaskId === task._id} 
          setEditTaskId={setEditTaskId}
          onToggleStatus={handleToggleStatus}
        />
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: Colors.grey200,
  },
  scrollView: {
    flex: 1,
  },
});