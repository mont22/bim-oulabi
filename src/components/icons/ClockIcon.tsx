import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ClockIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({
  width = 20,
  height = 20,
  color = '#919EAB',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 1.66667C5.40833 1.66667 1.66666 5.40833 1.66666 10C1.66666 14.5917 5.40833 18.3333 10 18.3333C14.5917 18.3333 18.3333 14.5917 18.3333 10C18.3333 5.40833 14.5917 1.66667 10 1.66667ZM13.5417 13.0417L9.375 10.4583V5.41667H10.625V9.79167L14.375 12.0833L13.5417 13.0417Z"
        fill={color}
      />
    </Svg>
  );
};

export default ClockIcon;
