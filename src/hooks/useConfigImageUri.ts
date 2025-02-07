import { Image, ImageSourcePropType } from 'react-native';

import { useMemo } from 'react';
import useConfig from './useConfig';
import { IUIKitConfigOptions } from '../types/config.interface';
import { UiKitConfigKeys } from '../enum';
import { useDarkMode } from './useDarkMode';
import { defaultAvatarUri } from '../assets';

export const useConfigImageUri = ({
  configPath,
  configKey,
}: {
  configPath: IUIKitConfigOptions;
  configKey: keyof UiKitConfigKeys;
}): ImageSourcePropType => {
  console.log('JPN: configPath', configPath);
  console.log('JPN: configKey', configKey);

  const { getUiKitConfig } = useConfig();
  const { isDarkTheme } = useDarkMode();

  console.log('JPN: getUiKitConfig', getUiKitConfig);

  const configImageUri = useMemo(() => {
    if (!configPath || !configKey) return defaultAvatarUri;
    const fileUri = getUiKitConfig(configPath)?.[configKey] as string;

    if (!fileUri) return defaultAvatarUri;

    if (fileUri.includes('http')) return fileUri;

    console.log('JPN: fileUri', fileUri);
    console.log('JPN: configPath', configPath);
    console.log('JPN: configKey', configKey);

    let image: number | string = defaultAvatarUri;

    if (fileUri === 'mute.png') {
      image = require('../configAssets/icons/mute.png');
    }
    if (fileUri === 'unmute.png') {
      image = require('../configAssets/icons/unmute.png');
    }
    if (fileUri === 'aspect_ratio.png') {
      image = require('../configAssets/icons/aspect_ratio.png');
    }
    if (fileUri === 'hyperlink_button.png') {
      image = require('../configAssets/icons/hyperlink_button.png');
    }
    if (fileUri === 'searchButtonIcon') {
      image = require('../configAssets/icons/search.png');
    }
    if (fileUri === 'postCreationIcon') {
      image = require('../configAssets/icons/plus.png');
    }
    if (fileUri === 'search') {
      image = require('../configAssets/icons/search.png');
    }
    if (fileUri === 'clear') {
      image = require('../configAssets/icons/clear.png');
    }
    if (fileUri === 'lockIcon') {
      image = require('../configAssets/icons/lockIcon.png');
    }
    if (fileUri === 'officialBadgeIcon') {
      image = require('../configAssets/icons/officialBadgeIcon.png');
    }
    if (fileUri === 'emptyFeedIcon') {
      image = isDarkTheme
        ? require('../configAssets/icons/emptyFeedIcon_dark.png')
        : require('../configAssets/icons/emptyFeedIcon_light.png');
    }
    if (fileUri === 'exploreCommunityIcon') {
      console.log('JPN: exploreCommunityIcon is set here, image:', image);
      image = require('../configAssets/icons/exploreCommunityIcon.png');
      console.log('JPN: exploreCommunityIcon is set here, image after:', image);
    }
    if (fileUri === 'badgeIcon') {
      image = require('../configAssets/icons/badgeIcon.png');
    }
    if (fileUri === 'backButtonIcon') {
      image = require('../configAssets/icons/backButtonIcon.png');
    }
    if (fileUri === 'menuIcon') {
      image = require('../configAssets/icons/menuIcon.png');
    }
    if (fileUri === 'likeButtonIcon') {
      image = require('../configAssets/icons/likeButtonIcon.png');
    }
    if (fileUri === 'commentButtonIcon') {
      image = require('../configAssets/icons/commentButtonIcon.png');
    }
    if (fileUri === 'shareButtonIcon') {
      image = require('../configAssets/icons/shareButtonIcon.png');
    }

    if (typeof image === 'number') {
      console.log(
        'JPN: it is an image',
        image,
        Image.resolveAssetSource(image)?.uri
      );
      return Image.resolveAssetSource(image)?.uri ?? defaultAvatarUri;
    }

    console.log('JPN: fileUri', fileUri);
    console.log('JPN: image', image);

    return image;
  }, [configPath, configKey, getUiKitConfig, isDarkTheme]);
  return { uri: configImageUri };
};
