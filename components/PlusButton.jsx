import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export default function PlusButtonView({navigate}) {
  return (
    <PlusButton onPress={navigate}>
        <Ionicons name="ios-add" size={36} color="white" />
    </PlusButton>
  );
}

const PlusButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  background: #2A86FF90;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  bottom: 25px;
`;