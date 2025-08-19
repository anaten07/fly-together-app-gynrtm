
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';
import Icon from './Icon';

interface FlightLogFormProps {
  onSubmit: (logData: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export default function FlightLogForm({ onSubmit, onCancel, initialData }: FlightLogFormProps) {
  const [formData, setFormData] = useState({
    aircraft_type: initialData?.aircraft_type || '',
    aircraft_registration: initialData?.aircraft_registration || '',
    departure_airport: initialData?.departure_airport || '',
    arrival_airport: initialData?.arrival_airport || '',
    departure_time: initialData?.departure_time || '',
    arrival_time: initialData?.arrival_time || '',
    flight_duration_hours: initialData?.flight_duration_hours || '',
    flight_type: initialData?.flight_type || 'training',
    pilot_in_command: initialData?.pilot_in_command || false,
    dual_received: initialData?.dual_received || '',
    solo_time: initialData?.solo_time || '',
    cross_country_time: initialData?.cross_country_time || '',
    night_time: initialData?.night_time || '',
    instrument_time: initialData?.instrument_time || '',
    landings_day: initialData?.landings_day || '',
    landings_night: initialData?.landings_night || '',
    approaches: initialData?.approaches || '',
    holds: initialData?.holds || '',
    remarks: initialData?.remarks || '',
    instructor_name: initialData?.instructor_name || '',
    weather_conditions: initialData?.weather_conditions || '',
    route: initialData?.route || '',
    total_distance_nm: initialData?.total_distance_nm || '',
    fuel_used_gallons: initialData?.fuel_used_gallons || '',
    hobbs_start: initialData?.hobbs_start || '',
    hobbs_end: initialData?.hobbs_end || '',
  });

  const flightTypes = [
    { value: 'training', label: 'Training' },
    { value: 'cross_country', label: 'Cross Country' },
    { value: 'local', label: 'Local' },
    { value: 'instrument', label: 'Instrument' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'recreational', label: 'Recreational' },
  ];

  const handleSubmit = () => {
    // Basic validation
    if (!formData.aircraft_type || !formData.departure_airport || !formData.arrival_airport) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Convert string numbers to actual numbers
    const processedData = {
      ...formData,
      flight_duration_hours: parseFloat(formData.flight_duration_hours) || 0,
      dual_received: parseFloat(formData.dual_received) || 0,
      solo_time: parseFloat(formData.solo_time) || 0,
      cross_country_time: parseFloat(formData.cross_country_time) || 0,
      night_time: parseFloat(formData.night_time) || 0,
      instrument_time: parseFloat(formData.instrument_time) || 0,
      landings_day: parseInt(formData.landings_day) || 0,
      landings_night: parseInt(formData.landings_night) || 0,
      approaches: parseInt(formData.approaches) || 0,
      holds: parseInt(formData.holds) || 0,
      total_distance_nm: parseFloat(formData.total_distance_nm) || 0,
      fuel_used_gallons: parseFloat(formData.fuel_used_gallons) || 0,
      hobbs_start: parseFloat(formData.hobbs_start) || 0,
      hobbs_end: parseFloat(formData.hobbs_end) || 0,
    };

    onSubmit(processedData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInput = (
    label: string,
    field: string,
    placeholder?: string,
    keyboardType: 'default' | 'numeric' | 'email-address' = 'default',
    multiline = false
  ) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>{label}</Text>
      <TextInput
        style={[
          commonStyles.searchInput,
          {
            backgroundColor: colors.surface,
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.border,
            minHeight: multiline ? 80 : 44,
            textAlignVertical: multiline ? 'top' : 'center',
          }
        ]}
        value={formData[field as keyof typeof formData]?.toString()}
        onChangeText={(value) => updateField(field, value)}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );

  const renderFlightTypeSelector = () => (
    <View style={{ marginBottom: 16 }}>
      <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>Flight Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {flightTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              {
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                borderWidth: 1,
                borderColor: colors.primary,
                backgroundColor: formData.flight_type === type.value ? colors.primary : colors.background,
              }
            ]}
            onPress={() => updateField('flight_type', type.value)}
          >
            <Text style={{
              color: formData.flight_type === type.value ? colors.background : colors.primary,
              fontSize: 14,
              fontWeight: '500',
            }}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPICToggle = () => (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: colors.surface,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={() => updateField('pilot_in_command', !formData.pilot_in_command)}
      >
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colors.primary,
          backgroundColor: formData.pilot_in_command ? colors.primary : colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          {formData.pilot_in_command && (
            <Icon name="checkmark" size={12} color={colors.background} />
          )}
        </View>
        <Text style={[commonStyles.textMedium]}>Pilot in Command (PIC)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {/* Aircraft Information */}
        <Text style={[commonStyles.sectionTitle, { marginBottom: 16 }]}>Aircraft Information</Text>
        {renderInput('Aircraft Type *', 'aircraft_type', 'e.g., Cessna 172')}
        {renderInput('Registration', 'aircraft_registration', 'e.g., N12345')}

        {/* Flight Information */}
        <Text style={[commonStyles.sectionTitle, { marginBottom: 16, marginTop: 24 }]}>Flight Information</Text>
        {renderInput('Departure Airport *', 'departure_airport', 'e.g., KPAO')}
        {renderInput('Arrival Airport *', 'arrival_airport', 'e.g., KSQL')}
        {renderInput('Route', 'route', 'e.g., KPAO-KSQL')}
        {renderInput('Departure Time', 'departure_time', 'YYYY-MM-DD HH:MM')}
        {renderInput('Arrival Time', 'arrival_time', 'YYYY-MM-DD HH:MM')}
        {renderInput('Flight Duration (hours)', 'flight_duration_hours', '1.5', 'numeric')}
        {renderFlightTypeSelector()}
        {renderPICToggle()}

        {/* Time Logging */}
        <Text style={[commonStyles.sectionTitle, { marginBottom: 16, marginTop: 24 }]}>Time Logging</Text>
        {renderInput('Dual Received', 'dual_received', '0.0', 'numeric')}
        {renderInput('Solo Time', 'solo_time', '0.0', 'numeric')}
        {renderInput('Cross Country', 'cross_country_time', '0.0', 'numeric')}
        {renderInput('Night Time', 'night_time', '0.0', 'numeric')}
        {renderInput('Instrument Time', 'instrument_time', '0.0', 'numeric')}

        {/* Landings & Approaches */}
        <Text style={[commonStyles.sectionTitle, { marginBottom: 16, marginTop: 24 }]}>Landings & Approaches</Text>
        {renderInput('Day Landings', 'landings_day', '0', 'numeric')}
        {renderInput('Night Landings', 'landings_night', '0', 'numeric')}
        {renderInput('Approaches', 'approaches', '0', 'numeric')}
        {renderInput('Holds', 'holds', '0', 'numeric')}

        {/* Additional Information */}
        <Text style={[commonStyles.sectionTitle, { marginBottom: 16, marginTop: 24 }]}>Additional Information</Text>
        {renderInput('Instructor Name', 'instructor_name', 'John Smith CFI')}
        {renderInput('Weather Conditions', 'weather_conditions', 'Clear skies, light winds')}
        {renderInput('Distance (NM)', 'total_distance_nm', '25.5', 'numeric')}
        {renderInput('Fuel Used (gallons)', 'fuel_used_gallons', '12.5', 'numeric')}
        {renderInput('Hobbs Start', 'hobbs_start', '1234.5', 'numeric')}
        {renderInput('Hobbs End', 'hobbs_end', '1236.0', 'numeric')}
        {renderInput('Remarks', 'remarks', 'Additional notes...', 'default', true)}

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 40 }}>
          <Button
            text="Cancel"
            onPress={onCancel}
            variant="outline"
            size="medium"
            style={{ flex: 1 }}
          />
          <Button
            text="Save Flight Log"
            onPress={handleSubmit}
            variant="primary"
            size="medium"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
