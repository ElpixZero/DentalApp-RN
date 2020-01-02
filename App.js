import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Appointment from './components/Appointment';
import AppointmentTitle from './components/AppointmentTitle';

const data = [
  {
    title: '14 сентября',
    data: [
      {
       time: '15:30',
       diagnosis: 'пульпит',
       active: true,
       user: {
         fullName: 'Юлия Концевая',
         avatar: 'https://sun9-53.userapi.com/c855028/v855028305/6177b/c0EtoiSBd1E.jpg?ava=1',
       }
      },
      {
       time: '15:30',
       diagnosis: 'Кариес',
       user: {
         fullName: 'Иван Байло',
         avatar: 'https://sun1-94.userapi.com/c852032/v852032474/1950a4/bp-8tZ9nO2k.jpg?ava=1',
       }
      },
    ],
  },
  {
    title: '16 сентября',
    data: [
      {
       time: '15:30',
       diagnosis: 'пульпит',
       active: true,
       user: {
         fullName: 'Юлия Концевая',
         avatar: 'https://sun9-53.userapi.com/c855028/v855028305/6177b/c0EtoiSBd1E.jpg?ava=1',
       }
      },
      {
       time: '15:30',
       diagnosis: 'Кариес',
       user: {
         fullName: 'Иван Байло',
         avatar: 'https://sun1-94.userapi.com/c852032/v852032474/1950a4/bp-8tZ9nO2k.jpg?ava=1',
       }
      },
    ],
  },
  {
    title: '14 сентября',
    data: [
      {
       time: '15:30',
       diagnosis: 'пульпит',
       active: true,
       user: {
         fullName: 'Юлия Концевая',
         avatar: 'https://sun9-53.userapi.com/c855028/v855028305/6177b/c0EtoiSBd1E.jpg?ava=1',
       }
      },
      {
       time: '15:30',
       diagnosis: 'Кариес',
       user: {
         fullName: 'Иван Байло',
         avatar: 'https://sun1-94.userapi.com/c852032/v852032474/1950a4/bp-8tZ9nO2k.jpg?ava=1',
       }
      },
    ],
  },
  {
    title: '16 сентября',
    data: [
      {
       time: '15:30',
       diagnosis: 'пульпит',
       active: true,
       user: {
         fullName: 'Юлия Концевая',
         avatar: 'https://sun9-53.userapi.com/c855028/v855028305/6177b/c0EtoiSBd1E.jpg?ava=1',
       }
      },
      {
       time: '15:30',
       diagnosis: 'Кариес',
       user: {
         fullName: 'Иван Байло',
         avatar: 'https://sun1-94.userapi.com/c852032/v852032474/1950a4/bp-8tZ9nO2k.jpg?ava=1',
       }
      },
    ],
  }
];

export default function App() {
  return (
    <Container>
     <SectionList
        sections={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item } ) => <Appointment {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <AppointmentTitle title={title}/>
        )}
      />
      <PlusButton style={{
        shadowColor: "#2A86FF",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.65,
        
        elevation: 8,
      }}>
        <Ionicons name="ios-add" size={36} color="white" />
      </PlusButton>
    </Container>
  );
}

const PlusButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  background: #2A86FF;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  bottom: 25px;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
`;
