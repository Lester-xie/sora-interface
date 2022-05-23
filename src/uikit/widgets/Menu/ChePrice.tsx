import React from "react";
import styled from "styled-components";
import { CherryRoundIcon } from "../../components/Svg";
import Text from "../../components/Text/Text";
import Skeleton from "../../components/Skeleton/Skeleton";

interface Props {
  chePriceUsd?: number;
}

const PriceLink = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .che {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    color: #25030a;
    line-height: 16px;
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
  .text {
    margin-left: 4px;
  }
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;





const ChePrice: React.FC<Props> = ({ chePriceUsd }) => {
  return chePriceUsd ? (
    // <PriceLink href="https://pancakeswap.info/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" target="_blank">



    // <PriceLink href="https://www.cherryswap.net/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" target="_blank">
    <PriceLink>
      <div className="che">
        <CherryRoundIcon width="24px" mr="4px" marginRight="4px"/>
         <span className="text" style={{fontWeight: 600}}>CHE</span>
      </div>

      {/*<img src='/images/coins/CHE.png' alt='CHE' />*/}

      <Text color="#25030A" fontSize="16px" bold>{`$${chePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(ChePrice);
