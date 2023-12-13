import styled from 'styled-components';

export const Switch = styled.div`
  font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--secondary-color);
  border-radius: 5px;
`;

export const SwitchRadio = styled.input`
  display: none;
`;

export const SwitchSelection = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 33.33333333333333%;
  height: 100%;
  background: var(--border-color);
  border-radius: 3px;
  transition: left 0.25s ease-out;
`;

export const SwitchLabel = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: 33.33333333333333%;
  line-height: 235%;
  font-family: "Inter";
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;
  border-left: 1px solid blac

  ${SwitchRadio}:checked + &{
    transition: 0.15s ease-out;
    color: #fff;
  }
  
`;
