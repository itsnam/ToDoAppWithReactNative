import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../src/constants/Colors';
import url from '../../src/Url/url';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleAddTask = async () => {
    Keyboard.dismiss();
    if (!title) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    try {
      const response = await fetch(`${url}/tasks/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      setTitle('');
      setDescription('');

      Alert.alert("Success", "Task added successfully!");
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert("Error", "Failed to add task");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.header}>Todos</Text>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.description}>Create tasks to achieve more</Text>
        <View style={{ marginBottom: 20 }} />
        <Input
          placeholder='What is in your mind?'
          leftIcon={<Ionicons name='square-outline' size={24} color='grey' />}
          leftIconContainerStyle={styles.leftIconContainer}
          inputContainerStyle={styles.inputContainer}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Input
          placeholder='Add a note'
          leftIcon={<Ionicons name='pencil-outline' size={24} color='grey' />}
          leftIconContainerStyle={styles.leftIconContainer}
          inputContainerStyle={styles.inputContainer}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddTask}>
            <Text style={styles.addButtonLabel}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    borderBottomWidth: 0,
  },
  leftIconContainer: {
    marginRight: 10, 
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
  addButtonLabel: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontSize: 18,
  },
});