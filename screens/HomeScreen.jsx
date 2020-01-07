import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import axios from 'axios';
import Swipeable from 'react-native-swipeable-row';

import Appointment from '../components/Appointment';
import AppointmentTitle from '../components/AppointmentTitle';
import PlusButton from '../components/PlusButton';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = React.useState(null);

  React.useEffect( () => {
    axios.get('https://trycode.pw/c/DL80P.json').then( ({ data }) => {
      setData(data);
    })
  }, []);

  return (
    <Container>
      { data && <SectionList
          sections={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item } ) => (
            <Swipeable rightButtons={[<Text>Right 1</Text>,<Text>Right 2</Text> ]}>
              <Appointment navigate={navigation.navigate} {...item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <AppointmentTitle title={title}/>
          )}
      />}
      <PlusButton />
    </Container>
  );
}

HomeScreen.navigationOptions = {
  title: 'Пациенты',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SwipeHiddenElem = styled.View`
  background-color: red;
  width: 100%;
`;

export default HomeScreen;