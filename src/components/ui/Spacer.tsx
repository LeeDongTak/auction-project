type Props = {
  y: number;
};
export const Spacer = ({ y }: Props) => {
  return <div style={{ height: `${y}px` }}></div>;
};
