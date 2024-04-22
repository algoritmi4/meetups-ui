import { ReactNode, SVGProps } from 'react';

export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  id: string;
}

const Svg = (({ id, ...rest }: SvgProps): ReactNode => {
  return (
    <svg {...rest}>
      <use href={`../images/svg.svg#${id}`} />
    </svg>
  );
});

export default Svg;
