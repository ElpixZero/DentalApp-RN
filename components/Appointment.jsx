import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import SecondaryText from './SecondaryText.jsx'

const Group = ( { user, diagnosis, active, time, navigate }) => {
  return (
    <GroupItem onPress={() => navigate('Patient')}>
      <Avatar 
        source={{
          uri: user.avatar
        }} 
      />
      <View style={{flex: 1}}>
        <FullName>{user.fullName}</FullName>
        <SecondaryText>{diagnosis}</SecondaryText>
      </View>
      <GroupDate active={active}>{time}</GroupDate>
  </GroupItem>
  );
}

Group.defaultProps = {
  items: []
};

const GroupDate = styled.Text`
  background: ${props => props.active ? '#2A86FF' : '#E9F5FF'}
  border-radius: 18px;
  height: 32px;
  width: 70px;
  font-size: 14px;
  color: ${props => props.active ? '#fff' : '#4294FF'}
  text-align: center;
  font-weight: 700;
  line-height: 30px;
`;

const FullName = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  padding: 20px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #F3F3F3;
`;

const Avatar = styled.Image`
  border-radius: 30px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

export default Group;