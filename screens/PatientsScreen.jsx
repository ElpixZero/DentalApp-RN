import React from 'react';
import { FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';

import { patientsApi } from '../utils/api';
import Appointment from '../components/Appointment';
import AppointmentTitle from '../components/AppointmentTitle';
import PlusButton from '../components/PlusButton';

const PatientsScreen = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchPatients = () => {
    setIsLoading(true);  
    patientsApi.get().then( ({ data }) => {
      setData(data.data);
    }).finally(() => setIsLoading(false));
  }

  React.useEffect( () => {
    const fetchPatients = () => {
    }, []);

  const removePatients = id => {
    Alert.alert(
      'Удаление приема',
      'Вы действиетельно хотите удалить примем?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Удалить', onPress: () => {
          setIsLoading(true);
          patientsApi.remove(id).then( () => {
            fetchPatients();
          }).catch((e) => {
            setIsLoading(false);
          })
        }},
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      { data && <FlatList
          refreshing={isLoading}
          onRefresh={fetchPatients  }
          keyExtractor={item => item._id}
          renderItem={({ item } ) => (
            <Swipeable key={item._id} rightButtons={
              [<CardButton style={{
                  backgroundColor: '#B4C1CB',
                }}>
                <Ionicons 
                  name="md-create" 
                  size={22} 
                  color="#fff"
                  />
               </CardButton>, 
                <CardButton style={{
                  backgroundColor: '#F85A5A',
                 }}
                 onPress={removePatients.bind(this, item._id)}>
                <Ionicons name="ios-close" size={40} color="#fff" />
               </CardButton>
               ]
            }>
              <Appointment navigate={navigation.navigate} {...item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <AppointmentTitle title={title}/>
          )}
      />}
      <PlusButton navigate={() => navigation.navigate('AddPatient', {
        navigation: navigation
      })} />
    </Container>
  );
}

HomeScreen.navigationOptions = {
  title: 'Журнал приемов',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
};

const CardButton = styled.TouchableOpacity`
  width: 70px;
  height: 80%;
  background-color: #B4C1CB;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default PatientsScreen;