import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfilePhotoModal from './ProfilePhotoModel';
import SQLite from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker';


const db = SQLite.openDatabase(
  {
    name: 'UserData.db',
    location: 'default',
  },
  () => { console.log('Database opened'); },
  error => { console.error('Error opening database', error); }
);



const FirstPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  const [isModalVisible, setIsModalVisible1] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null); 

  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = 1900; i <= currentYear; i++) {
    years.push(i.toString());
  }


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM User ORDER BY id DESC LIMIT 1', [], (tx, results) => {
       // console.log(results.rows.item(0))
        if (results.rows.length > 0) {
          const user = results.rows.item(0);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setYearOfBirth(user.yearOfBirth);
          setProfileImageUri(user.profileImageUri);
        }
      });
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, yearOfBirth TEXT, profileImageUri TEXT)',
        [],
        () => { console.log('Table created successfully'); },
        error => { console.error('Error creating table', error); }
      );
    });
  }, []);
  
  const handleSave = () => {
    if (!firstName || !lastName || !yearOfBirth) {
       Alert.alert('Please fill in all the fields.');
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO User (firstName, lastName, yearOfBirth, profileImageUri) VALUES (?, ?, ?, ?)',
          [firstName, lastName, yearOfBirth, profileImageUri],
          () => { console.log('Data inserted successfully'); },
          error => { console.error('Error inserting data', error); }
        );
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.text}>Let's get to know you</Text>
          <Text style={styles.secondText}>
            Let us get to know you a bit better so you can get the best out of
            us
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          {/* Avatar with circular background */}
          <View style={styles.avatarCircle}>
            <Image
              source= {{uri: profileImageUri || 'https://via.placeholder.com/150' }} // Placeholder image
              style={styles.avatar}
            />
          </View>
          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsModalVisible1(true)}>
            <Icon name="camera-alt" size={20} color="#000" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First name *</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Blake"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Year of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year of birth *</Text>
            <View style={[styles.pickerContainer]}>
              <Picker
                selectedValue={yearOfBirth}
                onValueChange={(itemValue) => setYearOfBirth(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Year" value="" />
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>

              
            </View>
          </View>
        </View>

       

        <View style={styles.saveButtonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      

      {/* Modal */}
      <ProfilePhotoModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible1(false)}
        setProfileImageUri={setProfileImageUri}
        setIsModalVisible1={setIsModalVisible1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Abel-Regular',
    color: 'black',
    fontSize: 18,
    marginTop: 50,
    marginHorizontal: 8,
  },
  secondText: {
    fontFamily: 'Abel-Regular',
    color: 'grey',
    fontSize: 16,
    marginHorizontal: 8,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0', // Light purple background for the avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, // Smaller circular image
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: -42,
  },
  editText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
  formContainer: {
    width: '95%',
    marginHorizontal: 8,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Abel-Regular',
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#0206170F',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 16,
    height: 50,
  },
  picker: {
    height: 40,
    backgroundColor: '#f9f9f9',
  },
  saveButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 95,
  },
  saveButton: {
    backgroundColor: '#1898A0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FirstPage;
