import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../src/constants/Colors';
import DoneTodo from '../../src/components/DoneTodo';
import Toast from 'react-native-simple-toast';
import url from '../../src/Url/url';

export default function DoneScreen() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(`${url}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        const pendingTasks = tasksData.filter(task => task.status === "done");
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

  const handleToggleStatus = async (taskId) => {
    try {
      await fetch(`${url}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'pending',
        }),
      });
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const taskIds = tasks.map(task => task._id);
  
      await Promise.all(taskIds.map(async taskId => {
        await fetch(`${url}/tasks/${taskId}`, {
          method: 'DELETE',
        });
      }));
  
      setTasks([]);
      
      Toast.show('All tasks deleted successfully');
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Completed Tasks</Text>
        <TouchableOpacity onPress={handleDeleteAll}>
          <Text style={styles.deleteAll}>Delete all</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 12 }} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        {tasks.map(task => (
          <DoneTodo 
            key={task._id} 
            task={task} 
            onDelete={() => handleDeleteTask(task._id)} 
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  deleteAll: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.red,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});