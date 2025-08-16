import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const TabBarBackground = () => {
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90 }}>
      <Svg width="100%" height="94" viewBox="0 0 440 94">
        <Path
          d="M0 20 Q0 0 20 0 L150 0 Q180 0 180 30 L200 30 Q220 60 240 30 L260 30 Q260 0 290 0 L420 0 Q440 0 440 20 L440 94 L0 94 Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default TabBarBackground;