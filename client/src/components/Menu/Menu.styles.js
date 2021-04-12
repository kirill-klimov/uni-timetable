import styled from 'styled-components';
import Settings from '../../assets/settings.svg';
import ArrowBack from '../../assets/back-arrow.svg';

export const SettingsIcon = styled(Settings)``;

export const ArrowBackIcon = styled(ArrowBack)``;

export const GroupList = styled.ul`
  overflow-y: ${ ({len}) => len > 13 ? "scroll" : "visible" };

  @media (max-width: 729px) {
    overflow-y: ${ ({len}) => len > 7 ? "scroll" : "visible" };
  }
`;