import React from 'react';
import styled from 'styled-components/native';

const Button = ({ children , style, onPress }) => (
    <ToothSpaceButton onPress={onPress} style={style}>
        {children}
    </ToothSpaceButton>
);

const ToothSpaceButton = styled.TouchableOpacity`
  flex: 1;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2A86FF;
  border-radius: 30px;
`;

const ToothSpaceButtonText = styled.Text`
  color: #FFF;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400; 
`;

export default Button;