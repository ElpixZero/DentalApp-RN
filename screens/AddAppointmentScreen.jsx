import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Title, Form, Item, Input, Label, Picker, DatePicker  } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../components/Button'
import {patientsApi} from '../utils/api';

const ItemPicker = Picker.Item;

const AddAppointmentScreen = ( {navigation}) => {
  const [values, setValues] = React.useState({
    toothNumber: '',
    diagnosis: '',
    price: '',
    date: '',
    time: '',
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
            <Label>Номер зуба</Label>
            <Input onChange={hangleChange.bind(this, 'toothNumber')} value={values.toothNumber} autoFocus style={{marginTop: 12}} />
          </Item>

          <Item style={{marginLeft: 0, marginTop: 20}}>
            <Picker
                mode='dropdown'
                placeholder="Выберите диагноз"
                onValueChange={() => {}}
                style={{width: '100%'}}
                >
                <ItemPicker label='Cats' value='key0' />
                <ItemPicker label='Dogs' value='key1' />
                <ItemPicker label='Birds' value='key2' />
                <ItemPicker label='Elephants' value='key3' />
            </Picker>
          </Item>

          <Item floatingLabel style={{marginLeft: 0}}>
            <Label>Цена</Label>
            <Input onChange={hangleChange.bind(this, 'price')} keyboardType="numeric" 
              dataDetectorTypes="phoneNumber"  value={values.price} autoFocus style={{marginTop: 12}} />
          </Item>
          <View style={{display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', marginTop: 50, }}>
            <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                maximumDate={new Date(2020, 12, 31)}
                locale="ru"
                modalTransparent={true}
                animationType="fade"
                androidMode="default"
                placeHolderText="Выберите дату"
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                style={{flex: '0 0 50%'}}
              />

                  <DateTimePicker value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                />  
          </View>
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

AddAppointmentScreen.navigationOptions = {
  title: 'Добавление приема',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

export default AddAppointmentScreen;