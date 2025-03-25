// components/Loader/Loader.tsx
import React from 'react';
import * as S from './Loader.styles';

const Loader: React.FC = () => {
  return (
    <S.LoaderContainer>
      <S.Spinner />
    </S.LoaderContainer>
  );
};

export default Loader;