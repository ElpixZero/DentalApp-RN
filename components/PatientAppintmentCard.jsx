import React from 'react';
import {  Text, View  } from 'react-native';
import styled from 'styled-components/native';
import { Foundation, Ionicons } from '@expo/vector-icons';

import Badge from './Badge.jsx';

const PatientAppointmentCardView = ({ toothNumber, diagnosis, time, price }) => {
  return (
    <PatientAppointmentCard>
      <MoreButton>
        <Ionicons name="md-more" size={22} color="#A3A3A3" />
      </MoreButton>
      <FlexLineElems style={{marginBottom: 12}}>
        <Foundation name="clipboard-notes" size={15} color="#A3A3A3" />
        <PatientAppointmentsCardLine>
          Зуб: <Text style={{fontWeight: '700'}}>{toothNumber}</Text>
        </PatientAppointmentsCardLine>
      </FlexLineElems>  

      <FlexLineElems style={{marginBottom: 20}}>
      <Foundation name="clipboard-notes" size={15} color="#A3A3A3" />
        <PatientAppointmentsCardLine>
          Диагноз: <Text style={{fontWeight: '700'}}>{diagnosis}</Text>
        </PatientAppointmentsCardLine>
      </FlexLineElems>

      <FlexLineElems>
        <Badge active style={{marginRight: 10, maxWidth: 175, height: 32, borderRadius: 18,}}>
          <Text style={{fontSize: 14, lineHeight: 17, color: '#fff', fontWeight: '700'}}>{time}</Text>
        </Badge>
        <Badge style={{backgroundColor: '#e5f6e0', color: '#61BB42', height: 32, maxWidth: 85, borderRadius: 18}}>
          <Text style={{fontSize: 14, lineHeight: 17, color: '#61BB42', fontWeight: '700'}}>{price} Р</Text>
        </Badge>
      </FlexLineElems>
    </PatientAppointmentCard>
  );
}
const MoreButton = styled.TouchableOpacity`
  position: absolute;
  right: 0; 
  top: 0;
  padding: 15px 15px 5px 5px;
`;

const PatientAppointmentCard = styled.View`
  padding: 22px;
  margin: 0 25px;
  margin-bottom: 20;
  background-color: #fff;
  border-radius: 10;
  shadow-color: #000;
  shadow-opacity: 0.18;
  shadow-radius: 1.00;
  elevation: 1;
  position: relative;
`;

const PatientAppointmentsCardLine =  styled.Text`
  font-size: 16px;
  line-height: 19px;
  margin-left: 10px;
`;

const FlexLineElems = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default PatientAppointmentCardView;