import { doc, getDoc, collection, getDocs, query, where, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { message } from 'antd';
import { generateRandom } from './Utils';

export const checkAdminPassword = async (password) => {
  try {
    const docRef = doc(db, "setting", "admin");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const listAdmins = docSnap.data().listAdmins;
      const admin = listAdmins.find(admin => admin.password === password);
      if (admin) {
        return { status: true, data: admin }; // Password found, return status true
      }
    }
    return { status: false, message: "Mot de passe incorrect" }; // Password not found
  } catch (error) {
    return { status: false, message: "Erreur lors de la vérification du mot de passe administrateur : " + error.message };
  }
};

export const getAdminData = async () => {
  try {
    const docRef = doc(db, "setting", "admin");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      message.error("Le document n'existe pas");
      return null;
    }
  } catch (error) {
    message.error("Erreur lors de la récupération des données de l'administrateur : " + error.message);
    return null;
  }
};

export const updateAdminData = async (adminData) => {
  try {
    const docRef = doc(db, "setting", "admin");
    await updateDoc(docRef, adminData);
    message.success("Données de l'administrateur mises à jour avec succès");
  } catch (error) {
    message.error("Erreur lors de la mise à jour des données de l'administrateur : " + error.message);
  }
};

export const authenticateUser = async (login, password) => {
  try {
    const userQuery = query(collection(db, "users"), where("login", "==", login));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      if (userData.password === password) {
        return {
          isAuthenticated: true,
          userData,
        };
      } else {
        message.error("Mot de passe incorrect !");
        return {
          isAuthenticated: false,
          userData: null,
        };
      }
    } else {
      message.error("Compte inconnu !");
      return {
        isAuthenticated: false,
        userData: null,
      };
    }
  } catch (error) {
    message.error(error.message);
    throw new Error(error.message);
  }
};

export const isLoginTaken = async (login) => {
  const userQuery = query(collection(db, "users"), where("login", "==", login));
  const querySnapshot = await getDocs(userQuery);
  return !querySnapshot.empty;
};

const isUserIdTaken = async (id) => {
  const userQuery = query(collection(db, "users"), where("id", "==", id));
  const querySnapshot = await getDocs(userQuery);
  return !querySnapshot.empty;
};

export const signupUser = async (newUser) => {
  try {
    // Validate newUser object
    const { login, nomprenom, datenais, service, email } = newUser;
    if (!login || !nomprenom || !datenais || !service || !email) {
      message.error("Tous les champs sont obligatoires !");
      return;
    }

    const isTaken = await isLoginTaken(login);
    if (isTaken) {
      message.error("Login déjà pris !");
      return;
    }

    let id = generateRandom(10);
    let idTaken = await isUserIdTaken(id);
    while (idTaken) {
      id = generateRandom(10);
      idTaken = await isUserIdTaken(id);
    }
    newUser.id = id;

    await setDoc(doc(collection(db, "users")), newUser);
    message.success(`Utilisateur créé avec succès ! ID: ${newUser.id}`);
  } catch (error) {
    message.error("Erreur lors de la création de l'utilisateur : " + error.message);
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const usersQuerySnapshot = await getDocs(collection(db, "users"));
    const users = usersQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, updatedUser);
    message.success("Utilisateur mis à jour avec succès !");
  } catch (error) {
    message.error("Erreur lors de la mise à jour de l'utilisateur : " + error.message);
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
    message.success("Utilisateur supprimé avec succès !");
  } catch (error) {
    message.error("Erreur lors de la suppression de l'utilisateur : " + error.message);
    throw new Error(error.message);
  }
};
