import { db } from '@/firebase';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';
import { Users } from '../models/user';

export const createUser = async (user) => {
    await addDoc(collection(db, 'users'), user);
  }
  
  export const getUser = async (id) => {
    const userDoc = await getDoc(doc(db, 'users', id)); 
    const result = await userDoc.exists() ? userDoc.data() : null; 
    console.log(result) 
    console.log(userDoc.id)
    console.log("userDoc.data()")
    const user: Users = {
        id: userDoc.id,
        name: result.name,
        email: result.email,
        numero: result.numero
        }        
    return user
  }
  
  export const updateUser = (id, user) => {
    return updateDoc(doc(db, 'users', id), user);
  }
  
  export const deleteUser = (id) => {
    return deleteDoc(doc(db, 'users', id));
  }
  
  
export const useLoadUsers = () => {
    const users = ref<Users[]>([]); // Utilizo ref<Users[]>
    const close = onSnapshot(collection(db, 'users'), (snapshot) => {
      users.value = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          numero: data.numero
          // Agrega otras propiedades de la interfaz Users según tus necesidades
        };
      });
    });
    onUnmounted(close);
    return users;
  };
  
  export const createTicket = async (ticket) => {
    const ticketsCollection = collection(db, 'tickets');
    const docRef = await addDoc(ticketsCollection, ticket);
    return docRef.id; // Devuelve el ID del nuevo documento
}