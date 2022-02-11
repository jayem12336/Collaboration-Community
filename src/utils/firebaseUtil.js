import {
    db,
    // bucketRef, 
    auth,
} from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
