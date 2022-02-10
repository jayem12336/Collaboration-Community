import {
    db,
    // bucketRef, 
    auth,
    storage
} from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, arrayUnion, arrayRemove, setDoc, orderBy, query, where, deleteDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const createUser = async (email, password, data) => {
    const isUserCreated = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setDoc(doc(db, 'users', user.uid),
                {
                    displayName: data.displayName,
                    email: data.email,
                    ownerId: user.uid
                }
            );
            return user.uid
            // ...
        })
        .catch((err) => {
            return err
        });
    return isUserCreated
}
