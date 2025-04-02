import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  Linking,
} from 'react-native';
import GlobalStyle from '../../constants/colors';
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
import {db, storage} from '../../../firebaseConfig';
import {doc, getDoc, setDoc, updateDoc, } from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import ProfileFormComponent from '../../components/profile/ProfileFormComponent';
import * as ImageManipulator from 'expo-image-manipulator'
import useAppStore from '../../store/useAppStore';

const EditProfileScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    useMediaLibraryPermissions();

  const {setIsLoading} = useAppStore(state => state)

  const {user} = useAuthStore((state) => state);
  const [profileImage, setProfileImage] = useState(profile?.photo_uri);

  const submitProfileUpdateHandler = async (values) => {
    setIsLoading(true)

    try {
      let downloadedUri = '';
      if (profileImage) {
        downloadedUri = await uploadImageAsync(profileImage, user.uid);
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          photo_uri: downloadedUri,
          name: values.name ?? "",
        });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          photo_uri: downloadedUri,
          name: values.name ?? "",
          created_at: new Date().toISOString(),
        })
      }

      navigation.goBack();
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Alert.alert('Oops!', 'Something went wrong when updating the profile. Please try again.')
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
      setProfileImage(photo.uri);
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
      setProfileImage(photo.uri);
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
    // resize image
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: .9, format: ImageManipulator.SaveFormat.JPEG }
    );

    const storageRef = ref(storage, `profile_photos/${uid}.jpg`);

    const response = await fetch(resizedPhoto.uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const downloadedUri = await getDownloadURL(storageRef);
    return downloadedUri;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={profileImage ? {uri: profileImage} : AvatarSm}
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
            name: profile?.name ?? '',
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
