import { StyleSheet, Image } from 'react-native';

export default function ImgPickerViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    height: 120, 
    width: 120,
    borderRadius: 60, 
    borderWidth: 1, 
    borderColor: '#000' 
  },
});