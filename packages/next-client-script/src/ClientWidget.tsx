import React, {ReactNode, DetailedHTMLProps, HTMLAttributes} from 'react';

type Props<T> = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data?: T;
  children: ReactNode;
};

export default function ClientWidget<T>({children, data, ...rest}: Props<T>) {
  return (
    <div {...rest}>
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
