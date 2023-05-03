import {ExpoConfig} from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
    name: 'RN-Stripe-Test',
    slug: 'RN-Stripe-Test',
    extra: {API: "https://europe-west3-stavx-dev.cloudfunctions.net/fetchStripe"}
};

export default config;