import { ImageSourcePropType } from 'react-native';
export type OnboardingItem = {
    title: string;
    description: string;
    image: ImageSourcePropType;
}

export const onboardingData = [
    {
        title: 'Tracking',
        description: 'Tracke ganz einfach deine Lernzeit.',
        image: require('@/assets/images/onboarding/tracking_vergleich.png'),
    },
    {
        title: 'Modulverwaltung',
        description: 'Erstelle Module und verwalte sie.',
        image: require('@/assets/images/onboarding/modulverwaltung.png'),
    },
    {
        title: 'Erfolg',
        description: 'Schaue dir deine Erfolge direkt in der App an.',
        image: require('@/assets/images/onboarding/erfolg.png'),
    },
    {
        title: 'Vergleich',
        description: 'Vergleiche die Arbeitszeit für deine Module.',
        image: require('@/assets/images/onboarding/tracking_vergleich.png'),
    },
];
