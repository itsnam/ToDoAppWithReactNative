import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/Colors';
import Todo from '../../src/components/Todo';
import url from '../../src/Url/url';

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const searchInputRef = useRef(null);

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

  const handleSearchIconPress = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

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

  const filteredTasks = tasks.filter(task => {
    return task.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={Colors.blue} onPress={handleSearchIconPress} />
        <TextInput
          ref={searchInputRef} 
          style={styles.searchInput}
          placeholder="Search tasks..."
          onChangeText={setSearchText}
          value={searchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={24} color={Colors.grey200} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No result found</Text>
          </View>
        ) : (
          filteredTasks.map(task => (
            <Todo 
              key={task._id} 
              task={task} 
              onDelete={() => handleDeleteTask(task._id)} 
              onEdit={(newTitle, newDescription) => handleEditTask(task._id, newTitle, newDescription)} 
              isEditing={editTaskId === task._id} 
              setEditTaskId={setEditTaskId}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.grey200,
    borderRadius: 10,
    padding: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.grey200,
  },
  scrollView: {
    flex: 1,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 20,
    color: Colors.grey200,
  },
});
