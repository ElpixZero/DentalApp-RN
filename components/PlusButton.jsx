import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export default function PlusButtonView({navigate}) {
  return (
    <PlusButton onPress={navigate} style={{
        shadowColor: "#2A86FF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.65,
        
        elevation: 8,
        }}>
        <Ionicons name="ios-add" size={36} color="white" />
    </PlusButton>
  );
}

const PlusButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  background: #2A86FF;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  bottom: 25px;
`;