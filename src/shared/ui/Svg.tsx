import { ReactNode, SVGProps } from 'react';

export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  id: string;
}

const Svg = (({ id, ...rest }: SvgProps): ReactNode => {
  return (
    <svg {...rest}>
      <use className='fill-none' href={`/public/images/svg.svg#${id}`} />
    </svg>
  );
});

export default Svg;
