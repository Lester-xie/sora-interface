import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_ENTRY_HEIGHT } from "./config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => (isPushed ? theme.colors.textSubtle : "transparent")};
  transition: color 0.4s;
  flex-grow: 1;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  font-size: ${({ secondary }) => (secondary ? "16px" : "16px")};
  background-color: ${({ secondary,isActive, theme }) => (isActive && secondary ? '#F9F7F8' : "transparent")};
  //color: ${({ theme }) => theme.colors.textSubtle};
  color: ${({ isActive, theme }) => (isActive ? '#E55268' : "#9E9EA5")};
  box-shadow: ${({ isActive,secondary, theme }) => (isActive && !secondary ? `inset 4px 0px 0px ${theme.colors.primary}` : "none")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
  }

  &:hover {
    //background-color: ${({ theme }) => theme.colors.tertiary};
    background-color: #F9F7F8;
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    * {
      color: rgb(37, 3, 10);
    }
    // -webkit-background-clip: text;
    // animation: ${rainbowAnimation} 3s ease-in-out infinite;
    // background: ${({ theme }) => theme.colors.gradients.bubblegum};
    // background-size: 400% 100%;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

export { MenuEntry, LinkLabel };
