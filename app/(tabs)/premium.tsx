
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface PremiumPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const premiumPlans: PremiumPlan[] = [
  {
    id: 'basic',
    name: 'Sky Explorer',
    price: '$19',
    period: '/month',
    color: colors.primary,
    features: [
      'Unlimited pilot searches',
      'Basic weather reports',
      'Standard booking support',
      'Flight history tracking',
      'Basic safety scores',
    ],
  },
  {
    id: 'premium',
    name: 'Cloud Navigator',
    price: '$49',
    period: '/month',
    popular: true,
    color: colors.secondary,
    features: [
      'Everything in Sky Explorer',
      'Real-time weather radar',
      'Priority booking support',
      'Advanced safety analytics',
      'Flight insurance included',
      '24/7 concierge service',
      'Premium pilot network',
    ],
  },
  {
    id: 'elite',
    name: 'Aviation Elite',
    price: '$99',
    period: '/month',
    color: colors.primary,
    features: [
      'Everything in Cloud Navigator',
      'Personal flight coordinator',
      'Luxury aircraft access',
      'VIP airport services',
      'Custom flight planning',
      'Emergency assistance',
      'Exclusive events access',
    ],
  },
];

const premiumFeatures = [
  {
    id: 'weather',
    title: 'Advanced Weather',
    description: 'Real-time radar, turbulence forecasts, and detailed aviation weather reports',
    icon: 'cloud-outline',
    color: colors.primary,
  },
  {
    id: 'safety',
    title: 'AI Safety Score',
    description: 'Machine learning powered safety analysis for every flight and pilot',
    icon: 'shield-checkmark-outline',
    color: colors.success,
  },
  {
    id: 'concierge',
    title: '24/7 Concierge',
    description: 'Personal flight assistant available around the clock for any needs',
    icon: 'person-circle-outline',
    color: colors.secondary,
  },
  {
    id: 'insurance',
    title: 'Flight Insurance',
    description: 'Comprehensive coverage for every flight with instant claims processing',
    icon: 'umbrella-outline',
    color: colors.warning,
  },
  {
    id: 'priority',
    title: 'Priority Support',
    description: 'Skip the line with dedicated premium customer support',
    icon: 'flash-outline',
    color: colors.primary,
  },
  {
    id: 'network',
    title: 'Elite Pilot Network',
    description: 'Access to our most experienced and highly-rated pilots',
    icon: 'star-outline',
    color: colors.warning,
  },
];

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const handlePlanSelect = (planId: string) => {
    console.log('Plan selected:', planId);
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    console.log('Upgrading to plan:', selectedPlan);
    // Handle upgrade logic here
  };

  const renderPlanCard = (plan: PremiumPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        commonStyles.card,
        {
          borderWidth: 2,
          borderColor: selectedPlan === plan.id ? plan.color : colors.border,
          backgroundColor: selectedPlan === plan.id ? `${plan.color}10` : colors.background,
          marginHorizontal: 10,
          minWidth: 280,
          position: 'relative',
        },
        selectedPlan === plan.id ? shadows.orange : shadows.small,
      ]}
      onPress={() => handlePlanSelect(plan.id)}
      activeOpacity={0.8}
    >
      {plan.popular && (
        <View style={{
          position: 'absolute',
          top: -10,
          left: 20,
          right: 20,
          backgroundColor: colors.primary,
          paddingVertical: 6,
          borderRadius: 12,
          alignItems: 'center',
          ...shadows.medium,
        }}>
          <Text style={[commonStyles.textMedium, {
            color: colors.textInverse,
            fontSize: 12,
            fontWeight: '700',
          }]}>
            MOST POPULAR
          </Text>
        </View>
      )}

      <View style={{ alignItems: 'center', marginTop: plan.popular ? 20 : 0 }}>
        <Text style={[commonStyles.subtitle, {
          fontSize: 24,
          fontWeight: '800',
          color: plan.color,
          marginBottom: 8,
        }]}>
          {plan.name}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 }}>
          <Text style={[commonStyles.titleLarge, {
            fontSize: 48,
            fontWeight: '900',
            color: colors.text,
          }]}>
            {plan.price}
          </Text>
          <Text style={[commonStyles.textLight, {
            fontSize: 16,
            color: colors.textMuted,
            marginLeft: 4,
          }]}>
            {plan.period}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        {plan.features.map((feature, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[commonStyles.text, {
              marginLeft: 12,
              flex: 1,
              fontSize: 14,
              color: colors.text,
            }]}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      {selectedPlan === plan.id && (
        <View style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: `${plan.color}20`,
          borderRadius: 12,
          alignItems: 'center',
        }}>
          <Icon name="checkmark-circle" size={24} color={plan.color} />
          <Text style={[commonStyles.textMedium, {
            marginTop: 8,
            color: plan.color,
            fontWeight: '700',
          }]}>
            Selected Plan
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFeatureCard = (feature: typeof premiumFeatures[0]) => (
    <View key={feature.id} style={[commonStyles.card, {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    }]}>
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: `${feature.color}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Icon name={feature.icon as any} size={28} color={feature.color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[commonStyles.subtitleMedium, {
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 4,
        }]}>
          {feature.title}
        </Text>
        <Text style={[commonStyles.textLight, {
          fontSize: 14,
          color: colors.textLight,
          lineHeight: 20,
        }]}>
          {feature.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          <View style={{ alignItems: 'center' }}>
            <Icon name="diamond" size={48} color={colors.textInverse} />
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 32,
              fontWeight: '800',
              marginTop: 16,
              marginBottom: 8,
            }]}>
              Upgrade to Premium
            </Text>
            <Text style={[commonStyles.text, {
              color: colors.textInverse,
              textAlign: 'center',
              fontSize: 16,
              opacity: 0.9,
            }]}>
              Unlock exclusive features and elevate your flying experience
            </Text>
          </View>
        </LinearGradient>

        {/* Premium Features */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 24,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 20,
            textAlign: 'center',
          }]}>
            Premium Features
          </Text>

          {premiumFeatures.map(renderFeatureCard)}
        </View>

        {/* Pricing Plans */}
        <View style={{ marginTop: 40 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 24,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 30,
            textAlign: 'center',
            paddingHorizontal: 20,
          }]}>
            Choose Your Plan
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {premiumPlans.map(renderPlanCard)}
          </ScrollView>
        </View>

        {/* Upgrade Button */}
        <View style={{ paddingHorizontal: 20, marginTop: 40, marginBottom: 100 }}>
          <Button
            text={`Upgrade to ${premiumPlans.find(p => p.id === selectedPlan)?.name || 'Premium'}`}
            onPress={handleUpgrade}
            variant="gradient"
            size="large"
            icon={<Icon name="diamond" size={20} color={colors.textInverse} />}
            iconPosition="left"
          />

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
            <Icon name="shield-checkmark" size={16} color={colors.success} />
            <Text style={[commonStyles.textLight, {
              marginLeft: 8,
              fontSize: 12,
              color: colors.textMuted,
            }]}>
              30-day money-back guarantee
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
          }}>
            <Icon name="card" size={16} color={colors.textMuted} />
            <Text style={[commonStyles.textLight, {
              marginLeft: 8,
              fontSize: 12,
              color: colors.textMuted,
            }]}>
              Cancel anytime • No hidden fees
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
