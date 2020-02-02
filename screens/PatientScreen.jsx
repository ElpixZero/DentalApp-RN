import React from 'react';
import { ActivityIndicator, 
  Text, 
  Linking, Modal
} from 'react-native';
import { Picker } from "native-base";
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import phoneFormat from '../utils/phoneFormat';

import { patientsApi } from '../utils/api';
import Button from '../components/Button.jsx';
import SecondaryText from '../components/SecondaryText.jsx';
import PatientAppintmentCard from '../components/PatientAppintmentCard.jsx';
import { View, FlatList } from 'react-native';
import PlusButton from '../components/PlusButton';
import { Ionicons } from '@expo/vector-icons';
import {CardButton, EmptyDataMessage } from '../components';


const PatientScreen = ({ navigation }) => {
  const params = {
    during: 'during',
    finished: 'finished'
  };
  const patientPhone = navigation.getParam('phone');
  const [appointments, setAppointmetns] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedTypeOfAppoints, setselectedTypeOfAppoints] = React.useState(params.during);

  fetchAppointments = () => {
    const patientId = navigation.getParam('id');

    patientsApi.getOne(patientId, selectedTypeOfAppoints)
    .then(({data}) => {
      console.log(data);
      setAppointmetns(data.data.appointments);
    })
    .finally(() => setIsLoading(false));
  }

  const onEditAppoinments = (navigation) => {
    navigation.navigate.bind(this, 'AddAppointment', {
      type: 'edit',
      data: item,
    });

    setOpenModal.bind(this, false)
  }
  
  React.useEffect( () => {
    fetchAppointments();
  }, [selectedTypeOfAppoints]);

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

      <Modal
        visible={isOpenModal}
        animationType="fade"
        transparent={true}
        style={{position: 'relative', backgroundColor: 'black'}}
        onRequestClose={() => {
          setOpenModal(!isOpenModal);
        }}
      >
        <View style={{marginTop: 55, paddingRight: 20, widht: '100%', backgroundColor: '#ffffff99', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
          <CardButton style={{
            backgroundColor: '#F85A5A',
            marginBottom: 10
            }}
            onPress={setOpenModal.bind(this, !isOpenModal)}>
          <Ionicons name="ios-close" size={40} color="#fff" />
          </CardButton>

          <CardButton style={{
              backgroundColor: '#B4C1CB',
            }}
            onPress={onEditAppoinments.bind(this, navigation)}>
          <Ionicons 
            name="md-create" 
            size={22} 
            color="#fff"
            />
          </CardButton>
        </View>
      </Modal>

      <PatientAppointments>
        <View style={{paddingRight: 20, marginBottom: 15, paddingLeft: 20, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <PatientAppointmentsTitle style={{textAlign: 'center'}}>Приемы</PatientAppointmentsTitle>
          <Picker
            note
            mode="dropdown"
            style={{ maxWidth: 150 }}
            selectedValue={selectedTypeOfAppoints}
            onValueChange={(value) => setselectedTypeOfAppoints(value)}
          >
            <Picker.Item label="В процессе" value={params.during} />
            <Picker.Item label="Завершенные" value={params.finished} />
          </Picker>
        </View>
        {isLoading 
          ? <ActivityIndicator
              style={{marginTop: 50}} 
              size={24}
              color="#2A86FF"
            />
          : <>
              {appointments.length !== 0 ? <FlatList
                data={appointments}
                refreshing={isLoading}
                onRefresh={fetchAppointments}
                renderItem={({ item }) => <PatientAppintmentCard onPress={setOpenModal.bind(this, !isOpenModal)} {...item} />}
                keyExtractor={item => item._id}
              /> : <EmptyDataMessage>Нет записей.</EmptyDataMessage>}
            </>
        }
      </PatientAppointments>
      <PlusButton navigate={() => navigation.navigate('AddAppointment', {
        navigation: navigation, patientId: navigation.getParam('id'),
      })} />
    </Container>
  );
}

const PatientAppointmentsTitle =  styled.Text`
  font-size: 16px;
  line-height: 21px;
  font-weight: 700;
`;

const FlexLineElems = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FullName = styled.Text`
  margin-top: 10px;
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
  margin-bottom: 35px;
  background-color: #fff;
  padding: 0 25px;
  padding-bottom: 20px;
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