// import React, { useState } from 'react'
// import { ScrollView, Text, TextInput, View } from 'react-native';
// import { User, Mail, Phone, MapPin, UserCircle } from 'lucide-react-native';

// const UserUpdateForm = () => {
//     // const [formData, setFormData] = useState({
//     //     username: '',
//     //     full_name: '',
//     //     email: '',
//     //     phone_number: '',
//     //     address: ''
//     //   });
    
//     //   const handleSubmit = () => {
//     //     console.log('Form submitted:', formData);
//     //   };
//     return (
//         <ScrollView style={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Update Profile</Text>
//             <Text style={styles.subtitle}>Modify your account details</Text>
//           </View>
    
//           <View style={styles.form}>
//             <View style={styles.inputContainer}>
//               <User size={20} color="#6366f1" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 value={formData.username}
//                 onChangeText={(text) => setFormData({...formData, username: text})}
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>
    
//             <View style={styles.inputContainer}>
//               <UserCircle size={20} color="#8b5cf6" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Full Name"
//                 value={formData.full_name}
//                 onChangeText={(text) => setFormData({...formData, full_name: text})}
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>
    
//             <View style={styles.inputContainer}>
//               <Mail size={20} color="#ec4899" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={formData.email}
//                 onChangeText={(text) => setFormData({...formData, email: text})}
//                 keyboardType="email-address"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>
    
//             <View style={styles.inputContainer}>
//               <Phone size={20} color="#14b8a6" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Phone Number"
//                 value={formData.phone_number}
//                 onChangeText={(text) => setFormData({...formData, phone_number: text})}
//                 keyboardType="phone-pad"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>
    
//             <View style={styles.inputContainer}>
//               <MapPin size={20} color="#f97316" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Address"
//                 value={formData.address}
//                 onChangeText={(text) => setFormData({...formData, address: text})}
//                 multiline
//                 numberOfLines={3}
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>
    
//             <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
//               <Text style={styles.buttonText}>Update Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       );
//     };
    
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//       },
//       header: {
//         padding: 20,
//         backgroundColor: '#f3f4f6',
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 30,
//         marginBottom: 20,
//         elevation: 2,
//       },
//       headerText: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#1f2937',
//         textAlign: 'center',
//       },
//       subtitle: {
//         fontSize: 16,
//         color: '#6b7280',
//         textAlign: 'center',
//         marginTop: 5,
//       },
//       form: {
//         padding: 20,
//       },
//       inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#f9fafb',
//         borderRadius: 12,
//         marginBottom: 16,
//         padding: 12,
//         borderWidth: 1,
//         borderColor: '#e5e7eb',
//         elevation: 1,
//       },
//       input: {
//         flex: 1,
//         marginLeft: 10,
//         fontSize: 16,
//         color: '#1f2937',
//       },
//       button: {
//         backgroundColor: '#6366f1',
//         padding: 16,
//         borderRadius: 12,
//         marginTop: 20,
//         elevation: 4,
//       },
//       buttonText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//       },
// });
// export default UserUpdateForm