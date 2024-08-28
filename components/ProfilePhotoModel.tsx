import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import FileSelect from './FileSelect';

const avatarImages = [
  require('../assets/avators/avatar1.png'),
  require('../assets/avators/avatar2.png'),
  require('../assets/avators/avatar3.png'),
  require('../assets/avators/avatar4.png'),
  require('../assets/avators/avatar5.png'),
  require('../assets/avators/avatar6.png'),
  require('../assets/avators/avatar7.png'),
  require('../assets/avators/avatar8.png'),
  require('../assets/avators/avatar9.png'),
  require('../assets/avators/avatar10.png'),
  require('../assets/avators/avatar11.png'),
  require('../assets/avators/avatar12.png'),
  require('../assets/avators/avatar13.png'),
  require('../assets/avators/avatar14.png'),
  require('../assets/avators/avatar15.png'),
  require('../assets/avators/avatar16.png')
  // Add more avatar paths here
];

const ProfilePhotoModal = (props: any) => {
  const {isVisible, onClose ,setProfileImageUri ,setIsModalVisible1} = props;

  const [isModalVisible, setIsModalVisible] = useState<any>(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>('photo');
    //  console.log(selectedOption , "ss")
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [selectedAvatarUri, setSelectedAvatarUri] = useState<string | null>(null);

    const handleProfileSave = () => {
      setProfileImageUri(selectedImageUri  || selectedAvatarUri); // Update the profile image URI
      setIsModalVisible1(false);
    };
  return (
    <>
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleConatiner}>
          <Text style={styles.title}>Choose profile photo.</Text>
          <Text style={styles.subtitle}>
            Choose a profile photo from your library or select an avatar to add
            to your profile
          </Text>
        </View>

        {/* Options - Choose Photo or Avatars */}
        <View style={styles.optionsFlexContainer}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={[styles.optionButton , selectedOption == 'photo' && styles.selectedOption]} 
            onPress={() => {
            setSelectedOption('photo')
setSelectedAvatarUri(null)
            }}>
              <Text style={[styles.optionText, {color: selectedOption == 'photo' ? '#fff' : '#000'} ]}>Choose photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton ,selectedOption == 'avatars' && styles.selectedOption]} 
            onPress={() => {
              setSelectedOption('avatars'); 
              setSelectedImageUri(null)
            }}>
              <Text style={[styles.optionTextSecondary ,{color: selectedOption == 'photo' ? '#333' : '#fff'}]}>Avatars</Text>
            </TouchableOpacity>
          </View>
        </View>

       
       
        {/* Placeholder for the Profile Image */}
          { selectedOption == 'photo' &&
            <>
              <View style={styles.avatarPlaceholder}>
                {selectedImageUri ? (
                  <Image
                    source={{ uri: selectedImageUri }}
                    style={styles.circle}
                  />
                ) : (
                  <View style={styles.circle} />
                )}
                {/* <View style={styles.circle} /> */}
              </View>

              {/* Edit Button */}
              <View style={styles.editButtonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsModalVisible(true)}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ios-filled/50/000000/camera--v1.png',
                    }}
                    style={styles.editIcon}
                  />
                  <Text style={styles.editText}>Edit photo</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        
       
        {selectedOption == 'avatars' && 
          <View style={styles.grid}>
          {avatarImages.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarContainer,
                selectedAvatar === avatar ? styles.selectedAvatar : null,
              ]}
              onPress={() => {
                setSelectedAvatarUri(Image.resolveAssetSource(avatar).uri);
                setSelectedAvatar(avatar);
              }}
            >
              <Image source={avatar} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
        }

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleProfileSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <FileSelect 
      isVisible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      setSelectedImageUri={setSelectedImageUri}
      setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
  titleConatiner: {
    marginTop: 95,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  optionsFlexContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 8,
  },

selectedOption: {
  backgroundColor: '#00a99d',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
},
  
  optionButtonSecondary: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  optionText: {
    fontSize: 15,
  },
  optionTextSecondary: {
    fontSize: 15,
  },
  avatarPlaceholder: {
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: "#0206170F",
    backgroundColor: '#F1F5F9',
  },
  editButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  editText: {
    color: '#000',
    fontSize: 14,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    margin: 10,
    borderRadius: 50,
    padding: 5,
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#1898A0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ProfilePhotoModal;
