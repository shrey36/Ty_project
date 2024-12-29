import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ reels }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        if (user) GetFav();
    }, [user]);

    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        console.log(result);
        setFavList(result?.favorite ? result?.favorite : []);
    };

    const AddToFav = async () => {
        const favResult = [...favList, reels.id];
        await Shared.UpdateFav(user, favResult);
        GetFav();
    };

    const removeFromFav = async () => {
        const favResult = favList.filter(item => item !== reels.id);
        await Shared.UpdateFav(user, favResult);
        GetFav();
    };

    return (
        <View>
            {favList.includes(reels.id) ?
                <Pressable onPress={removeFromFav}>
                    <Ionicons name="bookmark" size={26} color="black" />
                </Pressable> :
                <Pressable onPress={AddToFav}>
                    <Ionicons name="bookmark-outline" size={26} color="black" />
                </Pressable>}
        </View>
    );
}
