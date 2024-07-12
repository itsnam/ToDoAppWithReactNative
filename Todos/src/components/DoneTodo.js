import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Toast from 'react-native-simple-toast';

const DoneTodo = ({ task, onDelete, onToggleStatus }) => {
  const handleDeletePress = () => {
    onDelete();
    Toast.show('Task Deleted', Toast.SHORT); 
  };

  const handleCheckboxPress = () => {
    onToggleStatus(task._id);
    Toast.show('Task Pending', Toast.SHORT); 
  };

  return (
    <View style={styles.todo}>
      <CheckBox
        checked={true}
        onPress={handleCheckboxPress} 
        containerStyle={{ marginLeft: 1 }}
        checkedColor={Colors.grey200}
      />
      <View style={styles.todoDetails}>
        <Text style={styles.todoTitle}>{task.title}</Text>
        {task.description !== '' && <Text style={styles.todoDescription}>{task.description}</Text>}
      </View>
      <TouchableOpacity onPress={handleDeletePress}>
        <MaterialIcons name="delete" size={28} color={Colors.red} />
      </TouchableOpacity>
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
    color: Colors.grey200,
  },
  todoDescription: {
    fontSize: 18,
    color: Colors.grey200,
  },
});

export default DoneTodo;