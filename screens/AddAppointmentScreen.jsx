import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Title, Form, Item, Input, Label, Picker  } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../components/Button';
import SecondaryText from '../components/SecondaryText';

import {appointmentsApi} from '../utils/api';

const ItemPicker = Picker.Item;

const AddAppointmentScreen = ( {navigation}) => {
  const typeOfView = navigation.getParam('type');
  const propsData = navigation.getParam('data');

  const [values, setValues] = React.useState({
    patient: `${propsData && propsData._id ? propsData._id : navigation.getParam('patientId')}`,
    dentNumber: `${propsData && propsData.dentNumber ? propsData.dentNumber : ''}`,
    diagnosis: `${propsData && propsData.diagnosis ? propsData.diagnosis : 'пульпит'}`,
    price: `${propsData && propsData.price ? propsData.price : ''}`,
    date: `${propsData && propsData.date ? propsData.date : ''}`,
    time:  `${propsData && propsData.time ? propsData.time : ''}`,
  });

  const [dateTimePickerOptions, setDateTimePickerOptions] = React.useState({
    isShow: false,
    mode: null,
  });

  const fieldsLabels = {
    dentNumber: 'Номер зуба',
    diagnosis: 'Диагноз',
    price: 'Цена',
    date: 'Дата',
    time: 'Время'
  }

  const hangleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text
    })
  }

  const handleDiagnosisChange = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
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
      return appointmentsApi.edit(values.patient, values).then(() => {
        navigation.navigate('Home', {
          updateDate: new Date()
        });
      }).catch(submitError);
    }

    appointmentsApi.add(values).then(() => {
      navigation.navigate('Home', {
        updateDate: new Date()
      });
    }).catch(submitError);
  }

  const handleDateTimePickerOptions = mode => {
    setDateTimePickerOptions({
      isShow: true,
      mode
    })
  }

  const handleDateTimeValues = (name, value) => {
    setDateTimePickerOptions({
      ...dateTimePickerOptions,
      isShow: false,
    });

    if (name === 'date') {
      let month = getCorrectFormDateTime(value.getMonth() + 1);
      let day = getCorrectFormDateTime(value.getDate());
      
      return setValues({
        ...values,
        [name]: `${value.getFullYear()}-${month}-${day}`
      });
    }

    if (name === 'time') {
      let hours = getCorrectFormDateTime(value.getHours());
      let minutes = getCorrectFormDateTime(value.getMinutes());

      return setValues({
        ...values,
        [name]: `${hours}:${minutes}`
      });
    }
  }

  const getCorrectFormDateTime = value => {
    if (value < 10) {
      return '0' + value;
    }

    return value;
  }

  const convertDateForView = date => {
    try {
      const currentDate = date.split('-');
      const year = currentDate[0];
      const month = currentDate[1];
      const day = currentDate[2];

      if (currentDate.length !== 3) return 'invalid date';
      
      return `${day}.${month}.${year}`;
    } catch(e) {
      return 'Invalid Date'
    }
  }

  return (
    <Container
      style={{paddingRight: 25, paddingLeft: 25,}}
    >
      <Content refreshing={true}>
        <Form>
          <Item floatingLabel style={{marginLeft: 0}}>
            <Label>Номер зуба</Label>
            <Input onChange={hangleChange.bind(this, 'dentNumber')} keyboardType="numeric" value={values.dentNumber} style={{marginTop: 12}} />
          </Item>

          <Item style={{marginLeft: 0, marginTop: 20}}>
            <Picker
                selectedValue={values.diagnosis}
                mode='dropdown'
                placeholder="Выберите диагноз"
                style={{width: '100%'}}
                itemStyle={{marginLeft: 10}}
                onValueChange={(itemValue, itemIndex) =>
                  handleDiagnosisChange('diagnosis', itemValue)
                }
              >
                <ItemPicker label='Пульпит' value='Пульпит' />
                <ItemPicker label='Удаление зуба' value='Удаление зуба' />
            </Picker>
          </Item>

          <Item floatingLabel style={{marginLeft: 0}}>
            <Label>Цена</Label>
            <Input onChange={hangleChange.bind(this, 'price')} keyboardType="numeric" 
              dataDetectorTypes="phoneNumber"  value={values.price} style={{marginTop: 12}} />
          </Item>
          
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 50}}>
            <DateTimeField onPress={handleDateTimePickerOptions.bind(this, 'date')}>
            {!values.date ? 
                <SecondaryText>
                  Дата
                </SecondaryText> 
                : <Text>
                  {convertDateForView(values.date)}
                </Text>
              }
            </DateTimeField>

            <DateTimeField onPress={handleDateTimePickerOptions.bind(this, 'time')}>
              {!values.time ? 
                <SecondaryText>
                  Время
                </SecondaryText> 
                : <Text>
                  {values.time}
                </Text>
              }
            </DateTimeField>

            {dateTimePickerOptions.isShow && 
              <DateTimePicker value={new Date()}
                mode={dateTimePickerOptions.mode}
                is24Hour={true}
                onChange={(event, date) => handleDateTimeValues(dateTimePickerOptions.mode, date)}
            />}  
          </View>
          <Button onPress={(onSubmit)} style={{marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: typeOfView === 'edit' ? '#2A86FF' : '#87CC6F',}}>
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

AddAppointmentScreen.navigationOptions = {
  title: 'Добавление приема',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

const DateTimeField = styled.TouchableOpacity`
  borderBottomWidth: 1px;
  color: #A0A2A4;
  borderBottomColor: #F0F0F0;
  paddingBottom: 10px;
  width: 45%;
`;

export default AddAppointmentScreen;