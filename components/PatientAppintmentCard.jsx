import React from 'react';
import {  Text  } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button.jsx';

const PatientAppointmentCardView = ({ toothNumber, diagnosis, time, price }) => {
  return (
    <PatientAppointmentCard style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            
            elevation: 1,
          }}>
          <PatientAppointmentsCardLine>Зуб: {toothNumber}</PatientAppointmentsCardLine>
          <PatientAppointmentsCardLine style={{marginBottom: 20}}>
            <FontAwesome name="list-alt" size={15} color="#A3A3A3" iconStyle={{marginRight: 20}} />
            Диагноз: {diagnosis}
          </PatientAppointmentsCardLine>
          <FlexLineElems>
            <Button style={{marginRight: 10, lineHeight: 32}}>
              <Text style={{fontSize: 14, lineHeight: 17, color: '#fff', fontWeight: '700'}}>{time}</Text>
            </Button>
            <Button style={{backgroundColor: '#e5f6e0', color: '#61BB42', height: 32, maxWidth: 85, borderRadius: 18}}>
              <Text style={{fontSize: 14, lineHeight: 17, color: '#61BB42', fontWeight: '700'}}>{price} Р</Text>
            </Button>
          </FlexLineElems>
        </PatientAppointmentCard>
  );
}

const PatientAppointmentCard = styled.View`
  padding: 22px;
  margin-bottom: 20;
  background-color: #fff;
  border-radius: 10;
`;

const PatientAppointmentsCardLine =  styled.Text`
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 15px;
`;

const FlexLineElems = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default PatientAppointmentCardView;