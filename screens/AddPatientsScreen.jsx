import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Button from '../components/Button'
import {patientsApi} from '../utils/api';

const AddPatientScreen = ( {navigation}) => {
  const [values, setValues] = React.useState({
    fullName: '',
    phone: ''
  });

  const hangleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    })
  }

  const onSubmit = () => {
    patientsApi.add(values).then(() => {
      navigation.navigate('Home');
    }).catch(e => {
      alert('К сожалению что-то пошло не так..');
    })
  }

  return (
    <Container
      style={{paddingRight: 25, paddingLeft: 25,}}
    >
      <Content refreshing={true}>
        <Form>
          <Item floatingLabel style={{marginLeft: 0}}>
            <Label>Имя и фамилия</Label>
            <Input onChange={hangleChange.bind(this, 'fullName')} value={values.fullName} autoFocus style={{marginTop: 12}} />
          </Item>
          <Item style={{marginLeft: 0}} floatingLabel>
            <Label>Номер телефона</Label>
            <Input 
              onChange={hangleChange.bind(this, 'phone')}
              value={values.phone} 
              keyboardType="numeric" 
              dataDetectorTypes="phoneNumber" 
              style={{marginTop: 12}} />
          </Item>
            <Button onPress={(onSubmit)} style={{marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'green',}}>
              <Ionicons name="ios-add" size={20} color="white" />
              <Text 
                style={{marginLeft: 5, color: '#fff', fontSize: 16, lineHeight: 19, }}>Добавить</Text>
            </Button>
        </Form>
      </Content>
      </Container>
  );
}

AddPatientScreen.navigationOptions = {
  title: 'Добавление пациента',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

export default AddPatientScreen;