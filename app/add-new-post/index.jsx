// database collection name is more than enough to navigate the content to the screens

import { View, Text, Image,TextInput ,StyleSheet, ScrollView, TouchableOpacity, Pressable,onPress, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { useEffect,useState } from 'react'
import { router, useNavigation, useRouter } from 'expo-router'
import Colors from './../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { doc, refEqual, setDoc } from 'firebase/firestore';
import { storage } from '../../Config/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function addNewPost() {
    const navigation=useNavigation();
    const [formData,setFormData]=useState({});
    const [image,setImage]=useState();
    const [loader,setLoader]=useState(false);
    const route=useRouter();

    useEffect(()=>{
      navigation.setOptions({
        headerTitle:'Add New Post'
      })
    },[])

  // use to pick images and video from gallery
    const imagePicker=async()=>{
        let result = await  ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        
    }

    const handleInputChange=(fieldName,fieldValue)=>{
         setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
         }))
    }

    const onSubmit=()=>{
        //reuire field check in single line 
        if(Object.keys(formData).length!=3)
        {
            ToastAndroid.show('Enter All Details',ToastAndroid.SHORT)
            return;
        }
        UploadImage();
    }


    // used to upload post images to firebase storage server
    const UploadImage=async()=>{
        setLoader(true)
        const resp=await fetch(image);
        const blobImage=await resp.blob();
        const storageRef=ref(storage,'/PostUpload/'+Date.now()+'.jpg');

        uploadBytes(storageRef,blobImage).then((snapshot)=>{
            console.log('file uploaded')
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                SaveFormData(downloadUrl)
            })
        }) 


    }

     const SaveFormData=async(imageUrl)=>{
     const docId=Date.now().toString();
     await setDoc(doc(db,'Post',docId),{
      ...formData,
      imageUrl:imageUrl,
      username:user?.fullName,
      eamil:user?.primaryEmailAddress?.eamilAddress,
      userImage:user?.imageUrl,
      id:docId

     })

     setLoader(false);
     router.replace('/(tabs)/home')

     }
    

  return (
    <ScrollView style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Add New Post</Text>

   <Pressable onPress={imagePicker}>
        {!image? <Image source={require('./../../assets/images/placeholder.jpg')}
            style={{
                width:100,
                height:100,
                borderRadius:15,
                borderWidth:1,
                borderColor:Colors.GRAY
            }}/>:
            <Image source={{uri:image}} 
            style={{
                width:100,
                height:100,
                borderRadius:15,
              
                borderColor:Colors.GRAY
            }}/>   }
    </Pressable>

     <View style={styles.inputContainer}>
        <Text style={styles.label}>Caption </Text>
        <TextInput style={styles.input} 
        onChangeText={(value)=>handleInputChange('Caption',value)}/>
     </View>

     <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}  
          keyboardType="numeric" // accepting only number
        onChangeText={(value)=>handleInputChange('Date',value)}/>
     </View>

     <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} 
        numberOfLines={5}
        multiline={true}
        onChangeText={(value)=>handleInputChange('about',value)}/>
     </View>
 
      <TouchableOpacity style={styles.button} 
        disabled={loader}
        onPress={onSubmit}>
          {/* {loader?<ActivityIndicator size={'large'}/>:
          <Text style={{
              fontFamily:'outfit',
              textAlign:'center',
          }}>Upload</Text>} */}
            <Text style={{
              fontFamily:'outfit',
              textAlign:'center',
          }}>Upload</Text>

         
      </TouchableOpacity>


    </ScrollView>
  )
} 

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:5
    },
    input:{
        padding:15,
        backgroundColor:'#fff',
        borderRadius:7,
        fontFamily:'outfit'

    },
    label:{
       marginVertical:5,
       fontFamily:'outfit',
    },

    button:{
        padding:15,
        backgroundColor:Colors.Blue,
        borderRadius:7,
        marginVertical:10,
        marginBottom:50,

    }

}) 