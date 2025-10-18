import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ActiveIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ActiveIcon: React.FC<ActiveIconProps> = ({
  width = 20,
  height = 20,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M14 4L16.29 6.29L11.41 11.17L7.41 7.17L0 14.59L1.41 16L7.41 10L11.41 14L17.71 7.71L20 10V4H14Z"
        fill={color}
      />
    </Svg>
  );
};

export default ActiveIcon;
