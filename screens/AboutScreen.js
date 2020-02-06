/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import info from '../info';

export default function AboutScreen() {
  const handlePressWhatsapp = () => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=6581867085&text=Hello!%20I%20have%20an%20enquiry%20regarding%20Anti-Coronavirus%20App',
    );
    // WebBrowser.openBrowserAsync("https://api.whatsapp.com/send?phone=6581867085&text=Hello!%20I%20have%20an%20enquiry%20regarding%20Anti-Coronavirus%20App");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ alignItems: 'center' }}>
        <Image
          style={[
            styles.welcomeImage,
            { flexDirection: 'row', justifyContent: 'center' },
          ]}
          source={require('../assets/logo/anticorona.png')}
        />
      </View>
      <Text style={styles.sectionHeader}>Anti-Coronavirus</Text>
      <Text style={styles.paragraph}>{info['about-the-app']}</Text>
      <Text style={styles.sectionHeader}>Developer</Text>
      <Text style={styles.paragraph}>{info['about-the-developer']}</Text>
      <Text style={styles.sectionHeader}>Support</Text>
      <TouchableOpacity
        title="whatsapp"
        style={{ color: 'green' }}
        onPress={() => {
          handlePressWhatsapp();
        }}>
        <Text style={styles.paragraph}>
          If you have any enquiries or wish to collaborate, you can click here
          to contact him.
        </Text>
      </TouchableOpacity>
      <Text style={styles.sectionHeader}>Future Features</Text>
      <Text style={styles.paragraph}>
        1. Daily Graph{'\n'}
        2. Top News related to Wuhan Coronavirus{'\n'}
        3. Map view of the infected places{'\n'}
        4. Dark mode if needed{'\n'}
        (Feel free to suggest more)
      </Text>
      {/* <Text style={styles.sectionHeader}>Funding</Text>
      <TouchableOpacity title="whatsapp" style={{ color: 'green' }} onPress={() => { handlePressWhatsapp() }}>
        <Text style={styles.paragraph}>{info["donation"]}</Text>
      </TouchableOpacity> */}
    </View>
  );
}

AboutScreen.navigationOptions = {
  title: 'About the app',
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 40,
  },
  sectionHeader: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(193,233,244,0.8)',
    borderRadius: 5,
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'justify',
  },
  listSectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
