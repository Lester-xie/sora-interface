import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 20 20" {...props}>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="弹窗" transform="translate(-454.000000, -1042.000000)" fill="#E55268" fillRule="nonzero">
          <g id="钱包弹窗" transform="translate(80.000000, 870.000000)">
            <g id="-mockplus-" transform="translate(374.000000, 172.000000)">
              <g id="icon/copy" transform="translate(1.000000, 0.000000)">
                <g id="复制" transform="translate(9.000000, 9.500000) scale(-1, -1) translate(-9.000000, -9.500000) ">
                  <path d="M12.5478261,15.042029 L1.8,15.042029 C0.80588745,15.042029 1.6708268e-15,14.2361415 0,13.242029 L0,1.8 C-3.4378828e-16,0.80588745 0.80588745,-2.61473697e-16 1.8,0 L12.5478261,0 C13.5419386,-4.04660118e-16 14.3478261,0.80588745 14.3478261,1.8 L14.3478261,13.242029 C14.3478261,14.2361415 13.5419386,15.042029 12.5478261,15.042029 Z M2.4942029,13.4478261 L11.8536232,13.4478261 C12.3506795,13.4478261 12.7536232,13.0448824 12.7536232,12.5478261 L12.7536232,2.4942029 C12.7536232,1.99714662 12.3506795,1.5942029 11.8536232,1.5942029 L2.4942029,1.5942029 C1.99714662,1.5942029 1.5942029,1.99714662 1.5942029,2.4942029 L1.5942029,12.5478261 C1.5942029,13.0448824 1.99714662,13.4478261 2.4942029,13.4478261 Z" id="形状"></path>
                  <path d="M15.7362319,18.2304348 L6.18405797,18.2304348 C5.18994542,18.2304348 4.38405797,17.4245473 4.38405797,16.4304348 L4.38405797,14.2449275 L4.38405797,14.2449275 L5.97826087,14.2449275 L5.97826087,15.7362319 C5.97826087,16.2332882 6.38120459,16.6362319 6.87826087,16.6362319 L15.042029,16.6362319 C15.5390853,16.6362319 15.942029,16.2332882 15.942029,15.7362319 L15.942029,5.6826087 C15.942029,5.18555242 15.5390853,4.7826087 15.042029,4.7826087 L13.1521739,4.7826087 L13.1521739,4.7826087 L13.1521739,3.1884058 L15.7362319,3.1884058 C16.7303444,3.1884058 17.5362319,3.99429325 17.5362319,4.9884058 L17.5362319,16.4304348 C17.5362319,17.4245473 16.7303444,18.2304348 15.7362319,18.2304348 Z" id="路径"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </Svg>
  );
};

export default Icon;