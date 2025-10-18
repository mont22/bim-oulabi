import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface MoneyIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MoneyIcon: React.FC<MoneyIconProps> = ({
  width = 14,
  height = 14,
  color = '#676767',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M12.4892 6.65591L7.33841 1.50508C7.12258 1.28925 6.82508 1.16675 6.51591 1.16675H2.33341C1.69175 1.16675 1.16675 1.69175 1.16675 2.33341V6.51591C1.16675 6.82508 1.28925 7.12258 1.51091 7.33842L6.66175 12.4892C7.11675 12.9442 7.85758 12.9442 8.31258 12.4892L12.4951 8.30675C12.9501 7.85175 12.9501 7.11675 12.4892 6.65591ZM3.79175 4.66675C3.30758 4.66675 2.91675 4.27591 2.91675 3.79175C2.91675 3.30758 3.30758 2.91675 3.79175 2.91675C4.27591 2.91675 4.66675 3.30758 4.66675 3.79175C4.66675 4.27591 4.27591 4.66675 3.79175 4.66675Z"
        fill={color}
      />
    </Svg>
  );
};

export default MoneyIcon;
