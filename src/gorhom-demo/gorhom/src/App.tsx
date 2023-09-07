import React from 'react';
import { screens } from './screens/screens';
import { App } from '../BottomSheet/App';
import { enableScreens } from 'react-native-screens';
enableScreens(true);
export default () => <App screens={screens} />;
