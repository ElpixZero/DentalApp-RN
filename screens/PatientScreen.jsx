import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';

import Button from '../components/Button.jsx';
import SecondaryText from '../components/SecondaryText.jsx';
import PatientAppintmentCard from '../components/PatientAppintmentCard.jsx';

const PatientScreen = ({navigation}) => {
  
  const dataForPatientAppointments = [
    {
      data: [
        {
          toothNumber: 11,
          diagnosis: 'пульпит',
          time: '11.10.2019 - 15:40',
          price: '1500'
        },
        {
          toothNumber: 10,
          diagnosis: 'пульпит',
          time: '11.10.2019 - 15:40',
          price: '1500'
        },
        {
          toothNumber: 12,
          diagnosis: 'пульпит',
          time: '11.10.2019 - 15:40',
          price: '1500'
        },
        {
          toothNumber: 18,
          diagnosis: 'пульпит',
          time: '11.10.2019 - 15:40',
          price: '1500'
        },
      ]
    },
  ];

  return (
    <Container>
      <PatientInfoBlock>
        <FullName>{navigation.getParam('fullName')}</FullName>
        <SecondaryText style={{marginBottom: 20}}>{navigation.getParam('phone')}</SecondaryText>
        <FlexLineElems>
          <Button style={{marginRight: 10}}>
            <Text style={{fontSize: 16, lineHeight: 19, color: '#fff'}}>Формула зубов</Text>
          </Button>
          <Button style={{backgroundColor: '#84D269', maxWidth: 45}}>
            <Foundation name="telephone" size={20} color="white" />
          </Button>
        </FlexLineElems>
      </PatientInfoBlock>

      <PatientAppointments>
        <PatientAppointmentsTitle>Приемы</PatientAppointmentsTitle>
        <SectionList
          sections={dataForPatientAppointments}
          keyExtractor={(index) => index}
          renderItem={({ item }) => <PatientAppintmentCard {...item} />}
        />
      </PatientAppointments>
    </Container>
  );
}

const PatientAppointmentsTitle =  styled.Text`
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
  margin-bottom: 12;
  padding-left: 25px;
`;

const FlexLineElems = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FullName = styled.Text`
  margin-top: 15px;
  font-size: 24px;
  line-height: 30px;
  color: #000000;
  font-weight: 700;
  margin-bottom: 7px;
`;

const Container = styled.View`
  background-color: #F8FAFD;
  flex: 1;
`;

const PatientInfoBlock = styled.View`
  margin-bottom: 36px;
  background-color: #fff;
  padding: 0 25px;
  padding-bottom: 32px;
`;

const PatientAppointments = styled.View`
  padding: 0 0 20px 0;
  margin-bottom: 20;
`;


PatientScreen.navigationOptions = {
  title: 'Карта пациента',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

export default PatientScreen;