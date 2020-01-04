import React from 'react';
import styled from 'styled-components/native';

const GroupTitleView = ({title}) => {
  return (
    <GroupTitle>{title}</GroupTitle>
  );
}

GroupTitleView.defaultProps = {
  title: 'untitled',
};

const GroupTitle = styled.Text`
  font-size: 22px;
  display: flex;
  align-items: flex-end;
  color: #000000;
  font-weight: 700;
  margin-top: 25px;
  padding: 0 20px;

`;

export default GroupTitleView;