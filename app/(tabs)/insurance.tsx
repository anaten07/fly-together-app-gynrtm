
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface InsurancePlan {
  id: string;
  name: string;
  price: string;
  coverage: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

interface InsuranceClaim {
  id: string;
  type: string;
  status: 'pending' | 'approved' | 'processing' | 'completed';
  amount: string;
  date: string;
  description: string;
}

const insurancePlans: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    price: '$25',
    coverage: 'Up to $50,000',
    color: colors.primary,
    features: [
      'Flight cancellation coverage',
      'Basic medical emergency',
      'Equipment damage protection',
      'Weather delay compensation',
    ],
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    price: '$75',
    coverage: 'Up to $250,000',
    recommended: true,
    color: colors.secondary,
    features: [
      'Everything in Basic Coverage',
      'Full medical evacuation',
      'Aircraft liability coverage',
      'Personal accident insurance',
      'Trip interruption protection',
      'Emergency accommodation',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Elite',
    price: '$150',
    coverage: 'Up to $1,000,000',
    color: colors.primary,
    features: [
      'Everything in Comprehensive',
      'Worldwide coverage',
      'High-value equipment protection',
      'Business interruption coverage',
      'Legal liability protection',
      'Concierge claim service',
    ],
  },
];

const mockClaims: InsuranceClaim[] = [
  {
    id: '1',
    type: 'Weather Delay',
    status: 'completed',
    amount: '$1,250',
    date: '2024-01-10',
    description: 'Flight delayed due to severe weather conditions',
  },
  {
    id: '2',
    type: 'Equipment Damage',
    status: 'processing',
    amount: '$3,500',
    date: '2024-01-15',
    description: 'Headset damaged during turbulent flight',
  },
];

const coverageTypes = [
  {
    id: 'medical',
    title: 'Medical Emergency',
    description: 'Coverage for medical emergencies during flight',
    icon: 'medical-outline',
    color: colors.danger,
  },
  {
    id: 'cancellation',
    title: 'Flight Cancellation',
    description: 'Reimbursement for cancelled or delayed flights',
    icon: 'close-circle-outline',
    color: colors.warning,
  },
  {
    id: 'equipment',
    title: 'Equipment Protection',
    description: 'Coverage for damaged or lost aviation equipment',
    icon: 'hardware-chip-outline',
    color: colors.primary,
  },
  {
    id: 'liability',
    title: 'Liability Coverage',
    description: 'Protection against third-party liability claims',
    icon: 'shield-outline',
    color: colors.success,
  },
];

export default function InsuranceScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('comprehensive');
  const [activeTab, setActiveTab] = useState<'plans' | 'claims' | 'coverage'>('plans');

  const handlePlanSelect = (planId: string) => {
    console.log('Plan selected:', planId);
    setSelectedPlan(planId);
  };

  const handlePurchase = () => {
    console.log('Purchasing plan:', selectedPlan);
    // Handle purchase logic here
  };

  const handleFileClaim = () => {
    console.log('Filing new claim');
    // Handle claim filing logic here
  };

  const getStatusColor = (status: InsuranceClaim['status']) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'approved':
        return colors.success;
      case 'processing':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.textMuted;
    }
  };

  const getStatusIcon = (status: InsuranceClaim['status']) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'approved':
        return 'checkmark-circle-outline';
      case 'processing':
        return 'sync-outline';
      case 'completed':
        return 'checkmark-done-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderPlanCard = (plan: InsurancePlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        commonStyles.card,
        {
          borderWidth: 2,
          borderColor: selectedPlan === plan.id ? plan.color : colors.border,
          backgroundColor: selectedPlan === plan.id ? `${plan.color}10` : colors.background,
          marginBottom: 16,
          position: 'relative',
        },
        selectedPlan === plan.id ? shadows.orange : shadows.small,
      ]}
      onPress={() => handlePlanSelect(plan.id)}
      activeOpacity={0.8}
    >
      {plan.recommended && (
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
            RECOMMENDED
          </Text>
        </View>
      )}

      <View style={{ marginTop: plan.recommended ? 20 : 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View>
            <Text style={[commonStyles.subtitle, {
              fontSize: 20,
              fontWeight: '800',
              color: plan.color,
              marginBottom: 4,
            }]}>
              {plan.name}
            </Text>
            <Text style={[commonStyles.textLight, {
              fontSize: 14,
              color: colors.textMuted,
            }]}>
              Coverage: {plan.coverage}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[commonStyles.titleLarge, {
              fontSize: 32,
              fontWeight: '900',
              color: colors.text,
            }]}>
              {plan.price}
            </Text>
            <Text style={[commonStyles.textLight, {
              fontSize: 12,
              color: colors.textMuted,
            }]}>
              per flight
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          {plan.features.map((feature, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <Icon name="checkmark-circle" size={16} color={colors.success} />
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
            marginTop: 16,
            padding: 12,
            backgroundColor: `${plan.color}20`,
            borderRadius: 12,
            alignItems: 'center',
          }}>
            <Icon name="checkmark-circle" size={20} color={plan.color} />
            <Text style={[commonStyles.textMedium, {
              marginTop: 4,
              color: plan.color,
              fontWeight: '700',
            }]}>
              Selected Plan
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderClaimCard = (claim: InsuranceClaim) => (
    <View key={claim.id} style={[commonStyles.card, { marginBottom: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 4,
          }]}>
            {claim.type}
          </Text>
          
          <Text style={[commonStyles.textLight, {
            fontSize: 14,
            color: colors.textLight,
            marginBottom: 8,
            lineHeight: 20,
          }]}>
            {claim.description}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[commonStyles.textMuted, {
              fontSize: 12,
              color: colors.textMuted,
            }]}>
              Filed: {new Date(claim.date).toLocaleDateString()}
            </Text>
            <Text style={[commonStyles.subtitleMedium, {
              fontSize: 16,
              fontWeight: '700',
              color: colors.primary,
            }]}>
              {claim.amount}
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${getStatusColor(claim.status)}20`,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          marginLeft: 12,
        }}>
          <Icon name={getStatusIcon(claim.status) as any} size={16} color={getStatusColor(claim.status)} />
          <Text style={[commonStyles.textMuted, {
            marginLeft: 6,
            fontSize: 12,
            fontWeight: '600',
            color: getStatusColor(claim.status),
            textTransform: 'capitalize',
          }]}>
            {claim.status}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderCoverageCard = (coverage: typeof coverageTypes[0]) => (
    <View key={coverage.id} style={[commonStyles.card, { marginBottom: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: `${coverage.color}20`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
          <Icon name={coverage.icon as any} size={24} color={coverage.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 16,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 4,
          }]}>
            {coverage.title}
          </Text>
          <Text style={[commonStyles.textLight, {
            fontSize: 14,
            color: colors.textLight,
            lineHeight: 18,
          }]}>
            {coverage.description}
          </Text>
        </View>
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
            <Icon name="umbrella" size={48} color={colors.textInverse} />
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 32,
              fontWeight: '800',
              marginTop: 16,
              marginBottom: 8,
            }]}>
              Flight Insurance
            </Text>
            <Text style={[commonStyles.text, {
              color: colors.textInverse,
              textAlign: 'center',
              fontSize: 16,
              opacity: 0.9,
            }]}>
              Comprehensive protection for every flight
            </Text>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: colors.surfaceAlt,
            borderRadius: 16,
            padding: 4,
            marginBottom: 30,
          }}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'plans' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('plans')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'plans' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Plans
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'claims' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('claims')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'claims' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Claims
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'coverage' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('coverage')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'coverage' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Coverage
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {activeTab === 'plans' && (
            <>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Choose Your Coverage
              </Text>

              {insurancePlans.map(renderPlanCard)}

              <Button
                text={`Purchase ${insurancePlans.find(p => p.id === selectedPlan)?.name || 'Plan'}`}
                onPress={handlePurchase}
                variant="gradient"
                size="large"
                icon={<Icon name="shield-checkmark" size={20} color={colors.textInverse} />}
                iconPosition="left"
                style={{ marginTop: 20 }}
              />

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}>
                <Icon name="information-circle" size={16} color={colors.textMuted} />
                <Text style={[commonStyles.textLight, {
                  marginLeft: 8,
                  fontSize: 12,
                  color: colors.textMuted,
                  textAlign: 'center',
                }]}>
                  Coverage begins immediately after purchase
                </Text>
              </View>
            </>
          )}

          {activeTab === 'claims' && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={[commonStyles.subtitle, {
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.text,
                }]}>
                  Your Claims ({mockClaims.length})
                </Text>

                <Button
                  text="File Claim"
                  onPress={handleFileClaim}
                  variant="primary"
                  size="small"
                  icon={<Icon name="add" size={16} color={colors.textInverse} />}
                  iconPosition="left"
                />
              </View>

              {mockClaims.map(renderClaimCard)}

              {mockClaims.length === 0 && (
                <View style={[commonStyles.card, {
                  alignItems: 'center',
                  paddingVertical: 40,
                  backgroundColor: colors.backgroundAlt,
                }]}>
                  <Icon name="document-text-outline" size={48} color={colors.textMuted} />
                  <Text style={[commonStyles.subtitle, {
                    marginTop: 16,
                    color: colors.textMuted,
                    fontSize: 18,
                  }]}>
                    No claims filed
                  </Text>
                  <Text style={[commonStyles.textLight, {
                    textAlign: 'center',
                    marginTop: 8,
                    color: colors.textLight,
                  }]}>
                    File a claim if you need to use your insurance coverage
                  </Text>
                </View>
              )}
            </>
          )}

          {activeTab === 'coverage' && (
            <>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Coverage Types
              </Text>

              {coverageTypes.map(renderCoverageCard)}

              <View style={[commonStyles.card, {
                backgroundColor: colors.primary,
                alignItems: 'center',
                marginTop: 20,
                ...shadows.orange,
              }]}>
                <Icon name="call" size={32} color={colors.textInverse} />
                <Text style={[commonStyles.subtitleMedium, {
                  color: colors.textInverse,
                  marginTop: 12,
                  fontSize: 18,
                  fontWeight: '700',
                }]}>
                  24/7 Claims Support
                </Text>
                <Text style={[commonStyles.textLight, {
                  color: colors.textInverse,
                  textAlign: 'center',
                  opacity: 0.9,
                  marginTop: 4,
                }]}>
                  Call us anytime for immediate assistance
                </Text>
                <Text style={[commonStyles.subtitle, {
                  color: colors.textInverse,
                  marginTop: 12,
                  fontSize: 20,
                  fontWeight: '800',
                }]}>
                  1-800-FLY-SAFE
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
