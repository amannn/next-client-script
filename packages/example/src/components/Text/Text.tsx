import React, {ReactNode} from 'react';
import styles from './Text.module.scss';

type Props = {
  as?: string;
  children: ReactNode;
  variant?: 'title' | 'body';
};

export default function Text({as = 'p', children, variant = 'body'}: Props) {
  return React.createElement(
    as,
    {
      className: {
        title: styles.root_title,
        body: styles.root_body
      }[variant]
    },
    children
  );
}
