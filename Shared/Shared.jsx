import { db } from './../Config/FirebaseConfig';
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const GetFavList = async (user) => {
    const docSnap = await getDoc(doc(db, 'SavedPost', user?.primaryEmailAddress?.emailAddress));
    if (docSnap?.exists()) {
        return docSnap.data();
    } else {
        await setDoc(doc(db, "SavedPost", user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favorite: []
        });
        return { favorite: [] };
    }
}

const UpdateFav = async (user, favorite) => {
    const docRef = doc(db, 'SavedPost', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favorite: favorite
        });
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export default {
    GetFavList,
    UpdateFav
}
