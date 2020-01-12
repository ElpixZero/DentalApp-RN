import React from 'react';
import { SectionList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';

import { appointmentsApi } from '../utils/api';
import Appointment from '../components/Appointment';
import AppointmentTitle from '../components/AppointmentTitle';
import PlusButton from '../components/PlusButton';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAppoinements = () => {
    setIsLoading(true);  
    appointmentsApi.get().then( ({ data }) => {
      setData(data.data);
      setIsLoading(false);
    }).catch(e => {
      setIsLoading(false)
    });
  }

  React.useEffect( () => {
    fetchAppoinements()
  }, []);

  const removeAppointment = id => {
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
          appointmentsApi.remove(id).then( () => {
            fetchAppoinements();
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
      { data && <SectionList
          sections={data}
          refreshing={isLoading}
          onRefresh={fetchAppoinements}
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
                 onPress={removeAppointment.bind(this, item._id)}>
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
  title: 'Журнал пациентов',
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

export default HomeScreen;