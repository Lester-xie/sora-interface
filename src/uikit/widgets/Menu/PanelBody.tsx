import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "./types";
import useI18n from 'hooks/useI18n'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .linkInfo {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px 0px 20px 0px;
    .link {
      padding: 0 23px;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: #25030a;
      line-height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: #F9F7F8;

      }
    }
  }
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();
  const TranslateString = useI18n()

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  /**
   * 控制路由激活
   * @param a：菜单配置路由
   * @param b：当前路由
   */
  const handleIsActive = (a, b)=>{
    if ((b.indexOf('add')!== -1 || b.indexOf('find')!== -1)  && a === '/pool') {
      return true
    } else {
      return a === b
    }
  }


  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="14px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        // 如果有子导航栏
        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={TranslateString(Number(entry.stringId),entry.label)}
              initialOpenState={initialOpenState}
              className={calloutClass}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>{TranslateString(Number(item.stringId),item.label)}</MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={handleIsActive(entry.href, location.pathname)} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick} target={entry.target}>
              {iconElement}
              <LinkLabel isPushed={isPushed} style={{color: handleIsActive(entry.href, location.pathname)?'#E55268': '#25030A'}}>{TranslateString(Number(entry.stringId),entry.label)}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        );
      })}



      {isPushed &&
      <div className="linkInfo">
        <a className="link" href="https://info.cherryswap.net" target="_blank">Info</a>
        <a className="link" href="https://docs.cherryswap.net" target="_blank">Docs</a>
        <a className="link" href="https://cherryswapnet.medium.com/" target="_blank">Medium</a>
        <a className="link" href="https://twitter.com/CherryswapNet" target="_blank">Twitter</a>
        <a className="link" href="https://t.me/cherryswap_3st" target="_blank">Telegram-CN</a>
        <a className="link" href="https://t.me/cherryswap_1st" target="_blank">Telegram-EN</a>
      </div>
      }




    </Container>
  );
};

export default PanelBody;
