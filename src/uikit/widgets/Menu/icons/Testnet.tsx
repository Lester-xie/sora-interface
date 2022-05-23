import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="侧边栏" transform="translate(-23.000000, -476.000000)" fill="#E55268">
          <g id="编组-14备份-12" transform="translate(0.000000, 464.000000)">
            <g id="-mockplus-" transform="translate(23.000000, 12.000000)">
              <g id="sidebar_home" transform="translate(4.000000, 2.000000)">
                <rect id="矩形" x="0" y="0" width="2" height="14" rx="1"></rect>
                <rect id="矩形备份" x="5" y="3" width="2" height="17" rx="1"></rect>
                <rect id="矩形备份-2" x="10" y="3" width="2" height="17" rx="1"></rect>
                <rect id="矩形备份-3" x="15" y="3" width="2" height="9" rx="1"></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
