import styled from 'styled-components/native';

export default styled.Text`
  color: ${props => props.warning ? 'red' : 'black'};
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
`;
