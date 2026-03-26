export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  category: 'General' | 'Therapy';
  features: string[];
  benefits: string[];
  duration: string;
  schedule: string;
  mode: 'Online' | 'Offline' | 'Both';
  price: number;
  image: string;
  tiers: PricingTier[];
}

export const programs: Program[] = [
  {
    id: 'beginner-yoga',
    title: 'Beginner Yoga',
    description: 'Perfect for those starting their yoga journey. Focus on basic asanas, alignment, and breathing.',
    category: 'General',
    features: ['Foundation asanas', 'Guided breathing', 'Flexibility focus'],
    benefits: ['Improved posture', 'Stress reduction', 'Better sleep'],
    duration: '30 Days',
    schedule: 'Mon–Fri (6:00 AM - 7:00 AM)',
    mode: 'Both',
    price: 499,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 499,
        description: 'Standard group sessions',
        features: ['Group classes', 'Basic asanas', 'Community access']
      },
      {
        name: 'Standard',
        price: 999,
        description: 'Enhanced support & materials',
        features: ['Group classes', 'Recorded sessions', 'Diet guide', 'Q&A access']
      },
      {
        name: 'Premium',
        price: 1999,
        description: 'Personalized experience',
        features: ['1-on-1 sessions (2/mo)', 'Personalized diet plan', 'Direct instructor access', 'Progress tracking']
      }
    ]
  },
  {
    id: 'advanced-yoga',
    title: 'Advanced Yoga',
    description: 'Deepen your practice with complex asanas, inversions, and advanced pranayama techniques.',
    category: 'General',
    features: ['Inversions', 'Arm balances', 'Deep meditation'],
    benefits: ['Core strength', 'Mental clarity', 'Spiritual growth'],
    duration: '45 Days',
    schedule: 'Mon–Fri (7:30 AM - 8:30 AM)',
    mode: 'Offline',
    price: 999,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 999,
        description: 'Standard advanced training',
        features: ['Advanced asanas', 'Group practice', 'Pranayama basics']
      },
      {
        name: 'Standard',
        price: 1499,
        description: 'Deep dive into theory',
        features: ['Advanced asanas', 'Yoga philosophy', 'Advanced pranayama', 'Workshop access']
      },
      {
        name: 'Premium',
        price: 2499,
        description: 'Mastery level coaching',
        features: ['Personalized feedback', 'Advanced inversions', 'Spiritual coaching', 'Priority workshop booking']
      }
    ]
  },
  {
    id: 'pranayama',
    title: 'Pranayama Program',
    description: 'Master the art of breathing to enhance your vital energy and calm the mind.',
    category: 'General',
    features: ['Breathing techniques', 'Oxygen improvement', 'Lung capacity focus'],
    benefits: ['Better lung health', 'Reduced anxiety', 'Enhanced focus'],
    duration: '21 Days',
    schedule: 'Mon–Fri (5:30 AM - 6:00 AM)',
    mode: 'Online',
    price: 499,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 499,
        description: 'Essential breathing',
        features: ['Daily group sessions', 'Basic techniques']
      },
      {
        name: 'Standard',
        price: 799,
        description: 'Advanced techniques',
        features: ['Daily group sessions', 'Advanced techniques', 'Recorded breathing guides']
      },
      {
        name: 'Premium',
        price: 1299,
        description: 'Vitality coaching',
        features: ['Daily group sessions', '1-on-1 check-ins', 'Customized routine', 'Breath monitoring']
      }
    ]
  },
  {
    id: 'meditation',
    title: 'Meditation Program',
    description: 'Cultivate mindfulness and inner peace through guided meditation sessions.',
    category: 'General',
    features: ['Mindfulness', 'Stress relief', 'Better sleep'],
    benefits: ['Emotional balance', 'Mental resilience', 'Inner peace'],
    duration: '21 Days',
    schedule: 'Mon–Fri (8:30 PM - 9:00 PM)',
    mode: 'Online',
    price: 499,
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 499,
        description: 'Guided mindfulness',
        features: ['Daily group sessions', 'Basic mindfulness']
      },
      {
        name: 'Standard',
        price: 899,
        description: 'Deep focus',
        features: ['Daily group sessions', 'Sleep meditation recordings', 'Stress management tools']
      },
      {
        name: 'Premium',
        price: 1499,
        description: 'Spiritual retreat (Online)',
        features: ['Daily group sessions', '1-on-1 guidance', 'Advanced visualization', 'Personalized mantra']
      }
    ]
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss Program',
    description: 'A holistic approach to weight management combining dynamic yoga and diet planning.',
    category: 'Therapy',
    features: ['Yoga + workout', 'Fat reduction', 'Diet plan', 'Weekly monitoring'],
    benefits: ['Healthy weight loss', 'Metabolism boost', 'Toned body'],
    duration: '45 Days',
    schedule: 'Mon–Fri (6:30 AM - 7:30 AM)',
    mode: 'Both',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1518611012118-2969c6360227?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 2000,
        description: 'Standard therapy',
        features: ['Group yoga therapy', 'Standard diet chart', 'Monthly check-up']
      },
      {
        name: 'Standard',
        price: 3500,
        description: 'Intensive therapy',
        features: ['Group yoga therapy', 'Personalized diet chart', 'Weekly monitoring', 'Supplement guide']
      },
      {
        name: 'Premium',
        price: 5500,
        description: 'Transformation package',
        features: ['Group yoga therapy', 'Personalized diet chart', 'Bi-weekly 1-on-1', 'Daily food tracking', 'Lifestyle coaching']
      }
    ]
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain Program',
    description: 'Build muscle and strength through specific asanas and a nutrition-rich diet.',
    category: 'Therapy',
    features: ['Muscle building', 'Strength training', 'Diet plan'],
    benefits: ['Healthy weight gain', 'Increased stamina', 'Better digestion'],
    duration: '45 Days',
    schedule: 'Mon–Fri (7:00 AM - 8:00 AM)',
    mode: 'Both',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 2000,
        description: 'Standard gain',
        features: ['Strength yoga', 'Standard nutrition plan']
      },
      {
        name: 'Standard',
        price: 3500,
        description: 'Muscle focus',
        features: ['Strength yoga', 'High-protein diet plan', 'Weekly strength check']
      },
      {
        name: 'Premium',
        price: 5500,
        description: 'Elite gain',
        features: ['Strength yoga', 'Customized nutrition', '1-on-1 strength coaching', 'Supplementation advice']
      }
    ]
  },
  {
    id: 'pcod-pcos',
    title: 'PCOD / PCOS Program',
    description: 'Manage hormonal imbalances and improve reproductive health through therapeutic yoga.',
    category: 'Therapy',
    features: ['Hormone balance', 'Yoga + diet', 'Lifestyle coaching'],
    benefits: ['Regular cycles', 'Reduced symptoms', 'Stress management'],
    duration: '45 Days',
    schedule: 'Mon–Fri (5:00 PM - 6:00 PM)',
    mode: 'Both',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 2000,
        description: 'Standard care',
        features: ['Therapeutic yoga', 'Hormonal diet basics']
      },
      {
        name: 'Standard',
        price: 3500,
        description: 'Holistic care',
        features: ['Therapeutic yoga', 'Personalized hormonal diet', 'Stress management workshop']
      },
      {
        name: 'Premium',
        price: 5500,
        description: 'Complete wellness',
        features: ['Therapeutic yoga', 'Personalized hormonal diet', '1-on-1 health coaching', 'Cycle tracking support']
      }
    ]
  },
  {
    id: 'diabetes-control',
    title: 'Diabetes Control Program',
    description: 'Regulate blood sugar levels and improve insulin sensitivity with targeted yoga practices.',
    category: 'Therapy',
    features: ['Sugar control', 'Insulin sensitivity', 'Daily yoga'],
    benefits: ['Stable blood sugar', 'Better energy levels', 'Reduced medication dependency'],
    duration: '45 Days',
    schedule: 'Mon–Fri (6:00 AM - 7:00 AM)',
    mode: 'Both',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 2000,
        description: 'Standard control',
        features: ['Daily yoga', 'Standard diabetic diet']
      },
      {
        name: 'Standard',
        price: 3500,
        description: 'Advanced management',
        features: ['Daily yoga', 'Customized diabetic diet', 'Weekly sugar monitoring']
      },
      {
        name: 'Premium',
        price: 5500,
        description: 'Reversal support',
        features: ['Daily yoga', 'Customized diabetic diet', '1-on-1 metabolic coaching', 'Continuous support']
      }
    ]
  },
  {
    id: 'face-yoga',
    title: 'Face Yoga Program',
    description: 'Natural facial exercises to tighten skin and improve your natural glow.',
    category: 'Therapy',
    features: ['Skin tightening', 'Glow improvement', 'Facial exercises'],
    benefits: ['Youthful appearance', 'Reduced wrinkles', 'Improved circulation'],
    duration: '21 Days',
    schedule: 'Mon–Fri (7:00 PM - 7:30 PM)',
    mode: 'Online',
    price: 999,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    tiers: [
      {
        name: 'Basic',
        price: 999,
        description: 'Essential glow',
        features: ['Daily exercises', 'Basic skincare tips']
      },
      {
        name: 'Standard',
        price: 1499,
        description: 'Anti-aging focus',
        features: ['Daily exercises', 'Advanced techniques', 'Natural skincare guide']
      },
      {
        name: 'Premium',
        price: 2499,
        description: 'Sculpt & Lift',
        features: ['Daily exercises', '1-on-1 facial analysis', 'Personalized routine', 'Gua Sha techniques']
      }
    ]
  },
];
