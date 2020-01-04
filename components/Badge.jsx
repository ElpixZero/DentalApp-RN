import styled from 'styled-components/native';

export default styled.Text`
  background: ${props => props.active ? '#2A86FF' : '#E9F5FF'}
  width: 100%;
  font-size: 14px;
  color: ${props => props.active ? '#fff' : '#4294FF'}
  text-align: center;
  text-align-vertical: center;
  font-weight: 700;
`;