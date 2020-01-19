import React from 'react';
import { StyleSheet, Text, View, SectionListm, ImageBackground  } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Button from '../components/Button'
import {patientsApi} from '../utils/api';
import teethFormula from '../assets/teethFormula.png';

const AddPatientScreen = ( {navigation}) => {
  const propsData = navigation.getParam('data');
  
  return (
    <Container
      style={{display: 'flex', alignItems: 'center', padding: 15 }}
    >
    <View style={{display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'yellow', }}>
    <ImageBackground source={teethFormula} style={{width: '100%', height: '90%', position: 'relative'}}>
        <Text
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '45%',
          }}
        >41</Text>
        <Text
          style={{
            fontSize: 16,
            position: 'absolute',
            bottom: '40%',
            right: '-2%',
          }}
        >48</Text>
      </ImageBackground>
    </View>

    </Container>
  );
}

AddPatientScreen.navigationOptions = {
  title: 'Формула зубов',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

export default AddPatientScreen;