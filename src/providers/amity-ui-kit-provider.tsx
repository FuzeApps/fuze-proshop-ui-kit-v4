import { hslToColorString, lighten, parseToHsl } from 'polished';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme, PaperProvider, type MD3Theme } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import fallBackConfig from '../../uikit.config.json';
import { amityUIKitTokens } from '../enum';
import useValidateConfig from '../hooks/useValidateConfig';
import { BehaviourProvider } from '../providers/BehaviourProvider';
import { store } from '../redux/store';
import { IBehaviour } from '../types/behaviour.interface';
import { IConfigRaw } from '../types/config.interface';
import AuthContextProvider from './auth-provider';
import AuthStaticProvider from './auth-static-provider';
import { ConfigProvider } from './config-provider';

export type CusTomTheme = typeof DefaultTheme;
export interface IAmityUIkitProvider {
  userId: string;
  displayName?: string;
  apiKey: string;
  apiRegion?: string;
  apiEndpoint?: string;
  children: any;
  authToken?: string;
  configs?: IConfigRaw;
  behaviour?: IBehaviour;
}

export interface CustomColors {
  primary?: string;
  primaryShade1?: string;
  primaryShade2?: string;
  primaryShade3?: string;
  primaryShade4?: string;
  secondary?: string;
  secondaryShade1?: string;
  secondaryShade2?: string;
  secondaryShade3?: string;
  secondaryShade4?: string;
  base?: string;
  baseShade1?: string;
  baseShade2?: string;
  baseShade3?: string;
  baseShade4?: string;

  background?: string;
  backgroundShade1?: string;

  alert?: string;
  border?: string;
  screenBackground?: string;
  baseDivider?: string;
}
export interface MyMD3Theme extends MD3Theme {
  colors: MD3Theme['colors'] & CustomColors;
}
export default function AmityUiKitProvider({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  authToken,
  configs,
  behaviour,
}: IAmityUIkitProvider) {
  const colorScheme = useColorScheme();
  const SHADE_PERCENTAGES = [0.25, 0.4, 0.45, 0.6];

  const generateShades = (hexColor?: string): string[] => {
    if (!hexColor) return Array(SHADE_PERCENTAGES.length).fill('');
    const hslColor = parseToHsl(hexColor);
    const shades = SHADE_PERCENTAGES.map((percentage) => {
      return lighten(percentage, hslToColorString(hslColor));
    });
    return shades;
  };
  const isValidConfig = useValidateConfig(configs);
  const configData = isValidConfig ? configs : (fallBackConfig as IConfigRaw);

  // const isDarkTheme =
  //   configData?.preferred_theme === 'dark' ||
  //   (configData?.preferred_theme === 'default' && colorScheme === 'dark');
  // const themeColor = isDarkTheme
  //   ? configData.theme.dark
  //   : configData.theme.light;

  const globalTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...amityUIKitTokens.colors,
    },
  };

  return (
    <Provider store={store}>
      <MenuProvider>
        <AuthContextProvider
          userId={userId}
          displayName={displayName || userId}
          apiKey={apiKey}
          apiRegion={apiRegion}
          apiEndpoint={apiEndpoint}
          authToken={authToken}
        >
          <AuthStaticProvider
            userId={userId}
            displayName={displayName || userId}
            apiKey={apiKey}
            apiRegion={apiRegion}
            apiEndpoint={apiEndpoint}
            authToken={authToken}
          >
            <ConfigProvider configs={configData}>
              <BehaviourProvider behaviour={behaviour}>
                <PaperProvider theme={globalTheme}>
                  <SafeAreaProvider>{children}</SafeAreaProvider>
                </PaperProvider>
              </BehaviourProvider>
            </ConfigProvider>
          </AuthStaticProvider>
        </AuthContextProvider>
      </MenuProvider>
    </Provider>
  );
}
