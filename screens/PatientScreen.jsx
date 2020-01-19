import React from 'react';
import { ActivityIndicator, 
  Text, 
  SectionList,
  Linking
} from 'react-native';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import phoneFormat from '../utils/phoneFormat';

import { patientsApi, appointmentsApi } from '../utils/api';
import Button from '../components/Button.jsx';
import SecondaryText from '../components/SecondaryText.jsx';
import PatientAppintmentCard from '../components/PatientAppintmentCard.jsx';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import PlusButton from '../components/PlusButton';

const PatientScreen = ({ navigation }) => {
  const patientPhone = navigation.getParam('phone');
  const [appointments, setAppointmetns] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  fetchAppointments = () => {
    const patientId = navigation.getParam('id');

    patientsApi.getOne(patientId)
    .then(({data}) => {
      setAppointmetns(data.data.appointments);
    })
    .finally(() => setIsLoading(false));
  }
  
  React.useEffect( () => {
    fetchAppointments();
  }, []);

  return (
    <Container>
      <PatientInfoBlock>
        <FullName>{navigation.getParam('fullName')}</FullName>
        <SecondaryText style={{marginBottom: 20}}>{phoneFormat(patientPhone)}</SecondaryText>
        <FlexLineElems>
          <Button 
            style={{marginRight: 10}}
            onPress={navigation.navigate.bind(this, 'ToothFormula', {
              data: appointments && appointments.map( item => item.dentNumber)
            })}
          >
            <Text style={{fontSize: 16, lineHeight: 19, color: '#fff'}}>Формула зубов</Text>
          </Button>
          <Button 
            style={{backgroundColor: '#84D269', maxWidth: 45}}
            onPress={() => Linking.openURL(`tel:${patientPhone}`)}  
          >  
            <Foundation name="telephone" size={20} color="white" />
          </Button>
        </FlexLineElems>
      </PatientInfoBlock>

      <PatientAppointments>
        <PatientAppointmentsTitle>Приемы</PatientAppointmentsTitle>
        {isLoading 
          ? <ActivityIndicator
              style={{marginTop: 50}} 
              size={24}
              color="#2A86FF"
            />
          : <FlatList
              data={appointments}
              refreshing={isLoading}
              onRefresh={fetchAppointments}
              renderItem={({ item }) => <PatientAppintmentCard {...item} />}
              keyExtractor={item => item._id}
        />}
      </PatientAppointments>
      <PlusButton navigate={() => navigation.navigate('AddAppointment', {
        navigation: navigation, patientId: navigation.getParam('id'),
      })} />
    </Container>
  );
}

const Fivv = styled.View`
  height: 50px;
`;

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