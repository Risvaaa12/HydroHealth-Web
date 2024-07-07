// import { useState, useEffect } from "react";
// import { app, database } from "../../firebaseConfig";
// import { getAuth, User } from "firebase/auth";
// import { ref, set, onDisconnect, update, get } from "firebase/database";

// interface ExtendedUser extends User {
//   role?: string;
// }

// const ADMIN_EMAILS =
//   process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAILS?.split(",") ?? [];

// export function useAuth() {
//   const [user, setUser] = useState<ExtendedUser | null>(null);

//   useEffect(() => {
//     const auth = getAuth(app);

//     const handleUserStatus = async (userData: User | null) => {
//       if (userData) {
//         const userRef = ref(database, `users/${userData.uid}`);
//         const snapshot = await get(userRef);
//         const userExists = snapshot.exists();

//         let userRole = "registered";
//         if (userExists) {
//           userRole = snapshot.val().role || "registered";
//         }
//         if (ADMIN_EMAILS.includes(userData.email ?? "")) {
//           userRole = "admin";
//         }

//         const userDataToUpdate = {
//           uid: userData.uid,
//           displayName: userData.displayName,
//           email: userData.email,
//           role: userRole,
//           isActive: true,
//         };

//         if (!userExists) {
//           set(userRef, userDataToUpdate);
//         } else {
//           update(userRef, userDataToUpdate);
//         }

//         const extendedUser = {
//           ...userData,
//           role: userRole,
//         };
//         setUser(extendedUser);

//         onDisconnect(userRef).update({
//           isActive: false,
//           loginTime: null,
//         });
//       } else {
//         setUser(null);
//       }
//     };

//     const unsubscribe = auth.onAuthStateChanged(handleUserStatus);

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return user;
// }






import { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
