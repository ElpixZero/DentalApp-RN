import React from 'react';
import { SectionList, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';

import { appointmentsApi } from '../utils/api';
import {Appointment, AppointmentTitle, CardButton, SpecialMessage} from '../components';

const HomeScreen = ({ navigation }) => {
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAppoinements = () => {
    setIsLoading(true);  
    appointmentsApi.get().then( (a) => {
      setData(a.data.data);
    }).catch(e => setError('Ошибка подключения. Попробуйте, пожалуйста, позже.'))
    .finally(() => setIsLoading(false));
  }

  React.useEffect( () => {
    fetchAppoinements();
  }, [navigation.getParam('updateDate')]);

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
      {
        isLoading ? <ActivityIndicator
          style={{marginTop: 50}} 
          size={24}
          color="#2A86FF"
        />
        : <> 
          {
            error ? <SpecialMessage warning>{error}</SpecialMessage>
            : <> 
              { data.length === 0 ? 
                <SpecialMessage>Нет записей.</SpecialMessage>
            : <SectionList
              sections={data}
              refreshing={isLoading}
              onRefresh={fetchAppoinements}
              keyExtractor={item => item._id}
              renderItem={({ item } ) => (
                <Swipeable key={item._id + item.time} rightButtons={
                  [
                    <CardButton style={{
                        backgroundColor: '#B4C1CB',
                      }}
                      onPress={navigation.navigate.bind(this, 'AddAppointment', {
                        type: 'edit',
                        data: item,
                      })}
                    >
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
                  <Appointment navigate={navigation.navigate} props={{...item}} />
                </Swipeable>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <AppointmentTitle title={title}/>
              )}
          />}
            </>
          }
        </>
      }
    </Container>
  );
}
HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Журнал приемов',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
  headerRight: () => (
    <TouchableOpacity onPress={navigation.navigate.bind(this, 'Patients')} style={{padding: 20}}>
      <Ionicons name="md-people" size={22} color="black" />
    </TouchableOpacity>
  ),
});
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
export default HomeScreen;