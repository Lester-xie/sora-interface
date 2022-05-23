import { ButtonProps, Sizes, variants } from "../Button/types";

export type ButtonMenuItemProps = {
  bg?:string;
  isActive?: boolean;
  size?: Sizes;
} & ButtonProps;

export interface ButtonMenuProps {
  bg?:string;
  variant?: typeof variants.PRIMARY | typeof variants.SUBTLE;
  activeIndex?: number;
  onClick?: (index: number) => void;
  size?: Sizes;
  children: React.ReactElement[];
}
