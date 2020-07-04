import {DetailedHTMLProps, ButtonHTMLAttributes} from 'react';
import styles from './Button.module.scss';

export default function Button({
  className,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <button className={[className, styles.button].join(' ')} {...rest} />;
}
