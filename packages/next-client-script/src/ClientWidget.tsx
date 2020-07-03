import React, {ReactNode} from 'react';

type Props<T> = {
  className?: string;
  data?: T;
  children: ReactNode;
};

export default function ClientWidget<T>({children, className, data}: Props<T>) {
  return (
    <div className={className}>
      {data && (
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
          data-widget-data
          type="application/json"
        />
      )}
      {children}
    </div>
  );
}
