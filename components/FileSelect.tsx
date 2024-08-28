import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { launchCamera,
    launchImageLibrary,
    ImageLibraryOptions,
    CameraOptions,
    Asset} from 'react-native-image-picker';


const FileSelect = (props :any) => {
    const {isVisible, onClose,setSelectedImageUri ,setIsModalVisible} = props;



 const handleTakePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
      } else {
        const asset: Asset | undefined = response.assets ? response.assets[0] : undefined;
        if (asset?.uri) {
          setSelectedImageUri(asset?.uri);
          setIsModalVisible(false); // Close the modal after selecting an image
        }
      }
    });
  };

 const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
      } else {
        const asset: Asset | undefined = response.assets ? response.assets[0] : undefined;
       // console.log('Photo selected: ', asset?.uri);
        if (asset?.uri) {
            setSelectedImageUri(asset?.uri);
            setIsModalVisible(false); // Close the modal after selecting an image
          }
      }
    });
  };

  const handleRemovePhoto = () => {
    setSelectedImageUri(null);
   setIsModalVisible(false); // Close the modal after removing the image
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.editButton}>Edit Photo</Text>
      </TouchableOpacity> */}

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Upload your photo</Text>
            <TouchableOpacity style={styles.option} onPress={handleChoosePhoto}>
              <Text style={styles.optionText}>📷 View photo library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleTakePhoto}>
              <Text style={styles.optionText}>📸 Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleRemovePhoto}>
              <Text style={[styles.optionText, { color: 'red' }]}>🗑️ Remove photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    color: '#007AFF',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Abel-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontFamily: 'Abel-Regular',
    fontWeight: "400",
    color: "#000",
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 12,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FileSelect;
