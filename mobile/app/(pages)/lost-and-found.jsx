import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LostAndFound = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'lost', // or 'found'
    title: '',
    description: '',
    contactNumber: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6">
        <Text className="mb-6 text-2xl font-semibold text-slate-700">
          Add lost or found items
        </Text>

        {/* Name Input */}
        <Text className="mb-2 text-slate-600">Name</Text>
        <TextInput
          className="p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="John Doe"
        />

        {/* Lost/Found Radio Buttons */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            className="flex-row items-center mr-6"
            onPress={() => setFormData({ ...formData, type: 'lost' })}
          >
            <View className={`h-5 w-5 rounded-full border border-gray-300 mr-2 items-center justify-center
              ${formData.type === 'lost' ? 'bg-blue-500 border-blue-500' : 'bg-white'}`}>
              {formData.type === 'lost' && (
                <View className="w-3 h-3 bg-white rounded-full" />
              )}
            </View>
            <Text className="text-gray-700">Lost</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setFormData({ ...formData, type: 'found' })}
          >
            <View className={`h-5 w-5 rounded-full border border-gray-300 mr-2 items-center justify-center
              ${formData.type === 'found' ? 'bg-blue-500 border-blue-500' : 'bg-white'}`}>
              {formData.type === 'found' && (
                <View className="w-3 h-3 bg-white rounded-full" />
              )}
            </View>
            <Text className="text-gray-700">Found</Text>
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <Text className="mb-2 text-slate-600">Title</Text>
        <TextInput
          className="p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Lost Item: Black Laptop Bag on Ruhuna Train"
        />

        {/* Description Input */}
        <Text className="mb-2 text-slate-600">Description</Text>
        <TextInput
          className="p-3 mb-4 text-gray-700 border border-gray-300 rounded-md"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Describe the item and any relevant details"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Contact Number Input */}
        <Text className="mb-2 text-slate-600">Contact Number</Text>
        <TextInput
          className="p-3 mb-6 text-gray-700 border border-gray-300 rounded-md"
          value={formData.contactNumber}
          onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
          placeholder="0552224104"
          keyboardType="phone-pad"
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="items-center p-4 bg-blue-500 rounded-md"
          onPress={handleSubmit}
        >
          <Text className="font-semibold text-white">Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LostAndFound;