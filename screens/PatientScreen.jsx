import React from 'react';
import { ActivityIndicator, 
  Text, 
  SectionList,
  Linking
} from 'react-native';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';

import { patientsApi } from '../utils/api';
import Button from '../components/Button.jsx';
import SecondaryText from '../components/SecondaryText.jsx';
import PatientAppintmentCard from '../components/PatientAppintmentCard.jsx';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import PlusButton from '../components/PlusButton';

const PatientScreen = ({navigation}) => {
  const patientPhone = navigation.getParam('phone');
  const [appointments, setAppointmetns] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
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

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  console.log('is', appointments);

  React.useEffect( () => {
    const patientId = navigation.getParam('id');
    patientsApi.getOne(patientId)
    .then(({data}) => {
      setAppointmetns(data.data.appointments);
      setIsLoading(false);
    })
    .catch((e) => {
      setIsLoading(false);
      alert(e);
    });
  }, []);

  return (
    <Container>
      <PatientInfoBlock>
        <FullName>{navigation.getParam('fullName')}</FullName>
        <SecondaryText style={{marginBottom: 20}}>{patientPhone}</SecondaryText>
        <FlexLineElems>
          <Button style={{marginRight: 10}}>
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
              renderItem={({ item }) => <PatientAppintmentCard {...item} />}
              keyExtractor={item => item._id}
        />}
      </PatientAppointments>
      <PlusButton navigate={() => navigation.navigate('AddAppointment', {
        navigation: navigation
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