import React, {ReactNode, ElementType} from 'react';
import styles from './Text.module.scss';

type Props = {
  as?: ElementType;
  children: ReactNode;
  variant?: 'title' | 'body';
};

export default function Text({
  as: Component = 'p',
  children,
  variant = 'body'
}: Props): JSX.Element {
  return (
    <Component
      className={
        {
          title: styles.root_title,
          body: styles.root_body
        }[variant]
      }
    >
      {children}
    </Component>
  );
}
