import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  Linking,
} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Text from '../../components/UI/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AvatarSm from '../../../assets/avatar/avatar_500.png';
import {useState} from 'react';
import IconButton from '../../components/UI/IconButton';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import useAuthStore from '../../store/useAuthStore';
import {db} from '../../../firebaseConfig';
import {doc, updateDoc} from 'firebase/firestore';
import ProfileFormComponent from '../../components/profile/ProfileFormComponent';

const EditProfileScreen = () => {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    useMediaLibraryPermissions();
  const {user} = useAuthStore((state) => state);

  const [profileImage, setProfileImage] = useState();

  const submitProfileUpdateHandler = async (values) => {
    try {
      let downloadedUri = '';
      if (profileImage) {
        downloadedUri = await uploadImageAsync(profileImage.uri, user.uid);
      }
  
      const userRef = doc(db, 'users', user.uid);
  
      await updateDoc(userRef, {
        photo_uri: downloadedUri,
        name: '',
      });
    } catch (error) {
      console.log(error)
    }
    
  };

  const verifyPermissions = async () => {
    if (
      cameraPermission.status == PermissionStatus.UNDETERMINED ||
      galleryPermission.status == PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (
      cameraPermission.status == PermissionStatus.DENIED ||
      galleryPermission.status == PermissionStatus.DENIED
    ) {
      Alert.alert(
        'Camera and Gallery Permissions Required',
        'To update your profile photo, please enable camera and gallery access in your device settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ]
      );

      return false;
    }

    return true;
  };

  const cameraUploadHandler = async () => {
    const pickedPhoto = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (pickedPhoto) {
      const photo = pickedPhoto.assets[0];
      setProfileImage(photo);
    }
  };

  const galleryUploadhandler = async () => {
    const pickedPhoto = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (pickedPhoto) {
      const photo = pickedPhoto.assets[0];
      setProfileImage(photo);
    }
  };

  const editProfileImageHandler = async () => {
    const permission = await verifyPermissions();
    if (!permission) return;

    Alert.alert(
      'Upload Photo',
      'Choose where to get photo from',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: cameraUploadHandler,
        },
        {
          text: 'Gallery',
          onPress: galleryUploadhandler,
        },
      ],
      {cancelable: true}
    );
  };

  const uploadImageAsync = async (uri, uid) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profile_photos/${uid}.jpg`);

    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const downloadedUri = await getDownloadURL(storageRef);
    return downloadedUri;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={profileImage ? {uri: profileImage.uri} : AvatarSm}
          style={styles.avatar}
        />
        <IconButton
          color='secondary'
          icon={'brush'}
          onPress={editProfileImageHandler}
          style={styles.editProfileImgBtn}
        />
      </View>

      <View style={styles.content}>
        <ProfileFormComponent
          initialValues={{
            name: user.name ?? '',
            email: user.email ?? '',
          }}
          onSubmit={submitProfileUpdateHandler}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
  },
  header: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 180,
    borderWidth: 2,
    borderColor: GlobalStyle.colors.primary.main,
  },
  editProfileImgBtn: {
    marginTop: -40,
    marginLeft: 100,
  },
  content: {
    padding: 20
  }
});
