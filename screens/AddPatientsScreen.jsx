import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Button from '../components/Button'
import {patientsApi} from '../utils/api';

const AddPatientScreen = ( {navigation}) => {
  const typeOfView = navigation.getParam('type');
  const propsData = navigation.getParam('data');
  const [values, setValues] = React.useState({
    fullName: `${propsData && propsData.fullName ? propsData.fullName : ''}`,
    phone: `${propsData && propsData.phone ? propsData.phone : ''}`
  });

  const hangleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    })
  }

  const fieldsLabels = {
    fullName: 'Имя и фамилия',
    phone: 'Номер телефона'
  }

  const submitError = e => {    
    if (e.response.data.message.length === 1) {
      const errorField = e.response.data.message[0].param;
      alert(`Ошибка!\n\nПоле: "${fieldsLabels[errorField]}" указан неверно`);
    } else {
      let errorsArr = [];

      e.response.data.message.forEach( item => {
        errorsArr.push(`"${fieldsLabels[item.param]}"`);
      });

      return alert(`Ошибка!\n\nПоля: ${errorsArr.join(', ')} указаны неверно.`);
    }
  }

  const onSubmit = () => {
    if (typeOfView === 'edit') {
      return patientsApi.edit(propsData._id, values).then(() => {
        navigation.navigate('Patients', {
          updateDate: new Date(),
        });
      }).catch(submitError);
    }

    patientsApi.add(values).then(() => {
      navigation.navigate('Patients', {
        updateDate: new Date(),
      });
    }).catch(submitError);
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
            <Button onPress={(onSubmit)} 
              style={{marginTop: 30, 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: typeOfView === 'edit' ? '#2A86FF' : '#87CC6F'}}>
              <Ionicons 
                name={typeOfView === 'edit' ? 'ios-checkmark' : 'ios-add'} 
                size={typeOfView === 'edit' ? 30 : 20} color="white" />
              <Text 
                style={{marginLeft: 5, color: '#fff', fontSize: 16, lineHeight: 19, }}
              >
                {typeOfView === 'edit' ? 'Сохранить' : 'Добавить'}
              </Text>
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