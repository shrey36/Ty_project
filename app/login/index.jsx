import { ImageBackground, Text, View, Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";




export default function LoginScreen() {


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      {/* Background Image */}
      <ImageBackground
        source={require("./../../assets/images/Login.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        {/* Content */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 30,
              textAlign: "center",
              color: Colors.Blue,
              marginBottom: 10,
            }}
          >
            Inflow
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 15,
              textAlign: "center",
              color: Colors.GRAY,
              marginBottom: 20,
            }}
          >
            Ready for a Journey to deep down and increase Your Knowledge
          </Text>
        </View>

        {/* Get Started Button */}
        <View
          style={{
            justifyContent: "flex-end", 
            paddingHorizontal: 20,
            paddingBottom:60,
          }}
        >
          <Pressable
           onPress={onPress}
            style={{
              padding: 14,
              backgroundColor: Colors.DarkBlue,
              borderRadius: 14,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 18,
                textAlign: "center",
                color: Colors.White,
              }}
            >
              Get Started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
