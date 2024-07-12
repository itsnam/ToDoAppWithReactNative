import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Toast from 'react-native-simple-toast';

const Todo = ({ task, onDelete, onEdit, onToggleStatus }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleOptionsPress = () => {
    setShowOptions(!showOptions);
  };

  const closeModal = () => {
    setShowOptions(false);
    setShowEditModal(false);
  };

  const handleEditPress = () => {
    setShowOptions(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    try {
      await onEdit(editTitle, editDescription);
      Toast.show('Task Updated', Toast.SHORT); 
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleDeletePress = async () => {
    try {
      await onDelete(task._id);
      Toast.show('Task Deleted', Toast.SHORT); 
      closeModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCheckboxPress = async () => {
    try {
      await onToggleStatus(task._id);
      Toast.show('Task Done', Toast.SHORT); 
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <View style={styles.todo}>
      <CheckBox
        checked={false}
        onPress={handleCheckboxPress}
        containerStyle={{ marginLeft: 1 }}
      />
      <View style={styles.todoDetails}>
        <Text style={styles.todoTitle}>{task.title}</Text>
        {task.description !== '' && <Text style={styles.todoDescription}>{task.description}</Text>}
      </View>
      <TouchableOpacity onPress={handleOptionsPress}>
        <Ionicons name="ellipsis-horizontal" size={24} color={Colors.black} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptions}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.optionButton} onPress={handleEditPress}>
                <Text style={styles.optionText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.optionsSeparator}></View>
              <TouchableOpacity style={styles.optionButton} onPress={handleDeletePress}>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalEditContainer}>
          <View style={styles.modalEditContent}>
            <Input
              placeholder='What is in your mind?'
              leftIcon={<Ionicons name='square-outline' size={24} color='grey' />}
              leftIconContainerStyle={styles.leftIconContainer}
              inputContainerStyle={styles.inputContainer}
              value={editTitle}
              onChangeText={text => setEditTitle(text)}
            />
            <Input
              placeholder='Add a note'
              leftIcon={<Ionicons name='pencil-outline' size={24} color='grey' />}
              leftIconContainerStyle={styles.leftIconContainer}
              inputContainerStyle={styles.inputContainer}
              value={editDescription}
              onChangeText={text => setEditDescription(text)}
            />
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.grey100, 
  },
  todoDetails: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoDescription: {
    fontSize: 18,
    color: Colors.grey200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalEditContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalEditContent: {
    backgroundColor: Colors.white,
    width: '80%',
    borderRadius: 20,
    padding: 20,
  },
  optionButton: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  optionsSeparator: {
    height: 8,
  },
  optionText: {
    fontSize: 18,
    color: Colors.grey300,
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0, 
  },
  leftIconContainer: {
    marginRight: 10, 
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  editButton: {
    paddingHorizontal: 15,
  },
  saveButtonText: {
    fontSize: 18,
    color: Colors.blue,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    fontSize: 18,
    color: Colors.red,
    fontWeight: 'bold',
  },
  
});

export default Todo;