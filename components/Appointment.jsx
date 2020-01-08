import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import SecondaryText from './SecondaryText.jsx';
import Badge from './Badge.jsx';
import getAvatarColor from '../utils/getAvatarColor';

const Group = ( { patient, diagnosis, active, time, navigate }) => {
  return (
    <GroupItem onPress={() => navigate('Patient', {
      fullName: patient.fullName, phone: patient.phone, diagnosis, time
    })}>
      <Avatar style={{backgroundColor: getAvatarColor(patient.fullName[0]).background}}>
        <Letter style={{color: getAvatarColor(patient.fullName[0]).color}}>{patient.fullName[0].toUpperCase()}</Letter>
      </Avatar>
      <View style={{flex: 1}}>
        <FullName>{patient.fullName}</FullName>
        <SecondaryText>{diagnosis}</SecondaryText>
      </View>
      <Badge active={active} style={{borderRadius: 18, height: 32, maxWidth: 70}}>{time}</Badge>
  </GroupItem>
  );
}

Group.defaultProps = {
  items: []
};

const FullName = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  padding: 20px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #F3F3F3;
`;

const Letter = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const Avatar = styled.View`
  border-radius: 30px;
  width: 50px;
  height: 50px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Group;