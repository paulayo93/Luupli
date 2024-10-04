import React, {ReactNode} from 'react';
import {View, StatusBar, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {White} from './Colors';

interface ContainerProps {
  useSafeArea?: boolean;
  backgroundColor?: string;
  padded: boolean;
  // scroll: boolean;
  light?: boolean;
  children: ReactNode;
  statusBarBgColor?: string;
  containerStyle?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({
  children,
  backgroundColor,
  padded = true,
  light,
  statusBarBgColor, containerStyle,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{
        flex: 1,
        paddingTop: padded ? insets.top : 0,
        paddingLeft: padded ? insets.left + 16 : 0,
        paddingRight: padded ? insets.right + 16 : 0,
        paddingBottom: padded ? insets.bottom + 6 : 0,
        backgroundColor: backgroundColor || White,
      },containerStyle]}>
      <StatusBar
        hidden={false}
        // translucent={true}
        barStyle={light ? 'light-content' : 'dark-content'}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        backgroundColor={statusBarBgColor || White}
      />
      {children}
    </View>
  );
};

export default Container;
