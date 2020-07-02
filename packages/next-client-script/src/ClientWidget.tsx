import React, {ReactNode} from 'react';

type Props = {
  className?: string;
  props: any;
  children: ReactNode;
};

export default function ClientWidget({children, className, props}: Props) {
  return (
    <div className={className}>
      {props && (
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(props)}}
          data-widget-props
          type="application/json"
        />
      )}
      {children}
    </div>
  );
}
