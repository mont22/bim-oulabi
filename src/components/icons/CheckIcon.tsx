import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface CheckIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  width = 20,
  height = 20,
  color = '#919EAB',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 1.66667C5.40833 1.66667 1.66666 5.40833 1.66666 10C1.66666 14.5917 5.40833 18.3333 10 18.3333C14.5917 18.3333 18.3333 14.5917 18.3333 10C18.3333 5.40833 14.5917 1.66667 10 1.66667ZM8.33333 14.1667L4.16666 10L5.34166 8.825L8.33333 11.8083L14.6583 5.48333L15.8333 6.66667L8.33333 14.1667Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckIcon;
