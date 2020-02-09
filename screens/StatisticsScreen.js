/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Table from 'react-native-simple-table';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

const columns = [
  {
    title: 'Country',
    dataIndex: 'Country, Territory',
  },
  {
    title: 'Cases',
    dataIndex: 'Total Cases',
  },
  {
    title: 'Deaths',
    dataIndex: 'Total Deaths',
  },
  {
    title: 'Recovered',
    dataIndex: 'Total Recovered',
  },
  {
    title: 'Critical',
    dataIndex: 'Total Critical',
  },
];

export default function StatisticsScreen() {
  const [summaryData, setSummaryData] = useState('');
  const [countryData, setCountryData] = useState('');
  const [trendData, setTrendData] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get('https://x-dream.tech/ncov-api/get-stats');
      setCountryData(data.data);
      const data2 = await axios.get(
        'https://x-dream.tech/ncov-api/get-summary',
      );
      setSummaryData(data2.data);
      const data3 = await axios.get('https://x-dream.tech/ncov-api/get-daily');
      setTrendData(data3.data);
    };
    fetch();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const data = await axios.get('https://x-dream.tech/ncov-api/get-stats');
    setCountryData(data.data);
    const data2 = await axios.get('https://x-dream.tech/ncov-api/get-summary');
    setSummaryData(data2.data);
    const data3 = await axios.get('https://x-dream.tech/ncov-api/get-daily');
    setTrendData(data3.data);
    setRefreshing(false);
  }, []);

  const handlePressUrl = (url) => {
    Linking.openURL(url);
  };

  const SummaryView = () => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            paddingBottom: 10,
            fontSize: 20,
            paddingTop: 30,
          }}>
          Coronavirus Cases:
        </Text>
        <Text
          style={{
            textAlign: 'center',
            paddingBottom: 2,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          {summaryData['Total Cases']}
        </Text>
        <Text style={{ textAlign: 'center', paddingBottom: 15, fontSize: 14 }}>
          of which{' '}
          <Text style={{ color: 'red' }}>{summaryData['Total Critical']}</Text> in
          critical condition
        </Text>
        <Text style={{ textAlign: 'center', paddingBottom: 5, fontSize: 20 }}>
          Deaths:
        </Text>
        <Text style={{ textAlign: 'center', paddingBottom: 15, fontSize: 20 }}>
          {summaryData['Total Deaths']}
        </Text>
        <Text style={{ textAlign: 'center', paddingBottom: 5, fontSize: 20 }}>
          Recovered:
        </Text>
        <Text
          style={{
            textAlign: 'center',
            paddingBottom: 15,
            fontSize: 20,
            color: 'green',
          }}>
          {summaryData['Total Recovered']}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {countryData && summaryData ? (
        <>
          {/* <Text style={styles.sectionHeader}>Summary</Text> */}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <SummaryView />
            <Text style={styles.sectionHeader}>Global Coverage</Text>
            {/* {Platform.OS === "ios" ?
            <Table height={screenHeight * 0.6} columnWidth={screenWidth / 5} columns={columns} dataSource={countryData} />
            :
            <Table height={20 * countryData.length} columnWidth={screenWidth / 5} columns={columns} dataSource={countryData} />
          } */}
            <Table
              height={28 * countryData.length}
              columnWidth={screenWidth / 5}
              columns={columns}
              dataSource={countryData}
            />
            <TouchableOpacity
              onPress={() => {
                handlePressUrl('https://www.worldometers.info/coronavirus/');
              }}>
              <Text style={[styles.paragraph, { paddingTop: 20, paddingBottom: 20, color: 'grey' }]}>
                Original Source:{'\n'}https://www.worldometers.info/coronavirus/
            </Text>
            </TouchableOpacity>
            <Text style={styles.sectionHeader}>Trends</Text>
            <Text style={[styles.paragraph, { paddingBottom: 20 }]}>
              This feature will be enabled in the next update.
            </Text>
          </ScrollView>
        </>
      ) : (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#C1E9F4" />
          </View>
        )}
    </SafeAreaView>
  );
}

StatisticsScreen.navigationOptions = {
  title: 'Statistic',
  headerShown: false,
};

// StatisticsScreen.headerShown = false;

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
    paddingLeft: 15,
    paddingRight: 15,
  },
});
