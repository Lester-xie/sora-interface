import React, { AnchorHTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, target, ...otherProps }) => {
  const isHttpLink = href?.startsWith('http') || href?.startsWith('www')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = isHttpLink || target ? 'a' : NavLink
  const props = isHttpLink ? { href } : { to: href }
  return <Tag {...props} target={target} {...otherProps}/>
}

export default MenuLink
