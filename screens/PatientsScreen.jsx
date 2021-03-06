import React from 'react';
import { FlatList, Alert, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import {Item, Input} from 'native-base';

import { patientsApi } from '../utils/api';
import {Appointment, PlusButton, SpecialMessage} from '../components';
import phoneFormat from '../utils/phoneFormat';

const PatientsScreen = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchPatients = () => {
    setIsLoading(true);  
    patientsApi.get().then( ({ data }) => {
      setData(data.data);
    }).catch(e => setError('Ошибка подключения. Попробуйте, пожалуйста, позже.'))
    .finally(() => setIsLoading(false));
  }

  const removePatients = id => {
    Alert.alert(
      'Удаление приема',
      'Вы действиетельно хотите удалить пациента?',
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

  const onSearch = e => {
    setFilter(e.nativeEvent.text)
  }

  
  React.useEffect( () => {
    fetchPatients();
  }, [navigation.getParam('updateDate')]);

  return (
    <Container>
      <View style={{padding: 20,}}>
        <Item regular style={{paddingLeft: 15, borderRadius: 30}}>
          <Input onChange={onSearch } placeholder="Поиск..." />
        </Item>
      </View>
      { isLoading  
        ? <ActivityIndicator
              style={{marginTop: 50}} 
              size={24}
              color="#2A86FF"
            />
        : <> 
          {
            error ? <SpecialMessage warning>{error}</SpecialMessage>
            :   <>
            {
              data.length === 0 ? <SpecialMessage>Нет контактов.</SpecialMessage>
              : <FlatList
              data={data.filter( item => item.fullName.toLowerCase().indexOf(filter.toLowerCase()) >= 0)} 
              refreshing={isLoading}
              onRefresh={fetchPatients}
              keyExtractor={item => item._id + item.phone + item.fullName}
              renderItem={({ item } ) => (
                <Swipeable key={item._id} rightButtons={
                  [<CardButton style={{
                      backgroundColor: '#B4C1CB',
                    }}
                    onPress={navigation.navigate.bind(this, 'AddPatient', {
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
                    onPress={removePatients.bind(this, item._id)}>
                    <Ionicons name="ios-close" size={40} color="#fff" />
                  </CardButton>
                  ]
                }>
                  <Appointment navigate={navigation.navigate} props={{
                    patient: {...item},
                    diagnosis: phoneFormat(item.phone),
                  }} />
                </Swipeable>
              )}
              />
            }
          </>
          }
        </>
      }
      <PlusButton navigate={() => navigation.navigate('AddPatient', {
        navigation: navigation
      })} />
    </Container>
  );
}

PatientsScreen.navigationOptions = {
  title: 'Cписок пациентов',
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