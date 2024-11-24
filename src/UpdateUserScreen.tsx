import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import UserUpdateForm from '../components/user_profile/UserUpdateForm';

const UpdateUserScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <UserUpdateForm />
    </View>
  )
}

export default UpdateUserScreen