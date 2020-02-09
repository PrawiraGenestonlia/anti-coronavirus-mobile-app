/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function PreventionsScreen() {
  const [imagesUrl, setImagesUrl] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        'https://x-dream.tech/ncov-api/get-images-path',
      );
      setImagesUrl(data.data);
    };
    fetch();
  }, []);

  const handlePressUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {imagesUrl ? (
        <ScrollView>
          <Text style={styles.sectionHeader}>
            1. Protect yourself and others from getting sick
          </Text>
          {imagesUrl ? (
            <SliderBox images={imagesUrl['p1']} sliderBoxHeight={screenWidth} />
          ) : (
              <></>
            )}
          <Text style={styles.sectionHeader}>2. Practice food safety</Text>
          {imagesUrl ? (
            <SliderBox images={imagesUrl['p2']} sliderBoxHeight={screenWidth} />
          ) : (
              <></>
            )}
          <Text style={styles.sectionHeader}>
            3. Shopping/Working in wet markets in China and Southeast Asia
          </Text>
          {imagesUrl ? (
            <SliderBox images={imagesUrl['p3']} sliderBoxHeight={screenWidth} />
          ) : (
              <></>
            )}
          <Text style={styles.sectionHeader}>
            4. Stay healthy while travelling
          </Text>
          {imagesUrl ? (
            <SliderBox images={imagesUrl['p4']} sliderBoxHeight={screenWidth} />
          ) : (
              <></>
            )}
          <TouchableOpacity
            onPress={() => {
              handlePressUrl('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public');
            }}>
            <Text style={[styles.paragraph, { padding: 20, color: 'grey' }]}>
              Original Source:{'\n'}https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>
            Hope you remain healthy during this period!
          </Text>
        </ScrollView>
      ) : (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#C1E9F4" />
          </View>
        )}
    </View>
  );
}

PreventionsScreen.navigationOptions = {
  title: 'Prevention',
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  sectionHeader: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'justify',
  },
});
