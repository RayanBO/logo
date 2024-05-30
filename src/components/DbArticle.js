import { doc, collection, getDocs, query, where, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

// Fonction pour vérifier si l'ID de l'article est pris
export const isIdTaken = async (id) => {
  const articleQuery = query(
    collection(db, "dossiers"),
    where("id", "==", id)
  );
  const querySnapshot = await getDocs(articleQuery);
  return !querySnapshot.empty;
};

// Fonction pour créer un nouvel article
export const signupArticle = async (newArticle, showToastMessage) => {
  try {
    const isTaken = await isIdTaken(newArticle.id);
    if (isTaken) {
      showToastMessage("error", "ID déjà pris !");
      return;
    }
    console.log(newArticle.id);
    await setDoc(doc(collection(db, "dossiers")), newArticle);
    showToastMessage("success", "Article créé avec succès !");
  } catch (error) {
    showToastMessage("error", "Erreur lors de la création de l'article: " + error.message);
    throw new Error(error.message);
  }
};

// Fonction pour récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const articlesQuerySnapshot = await getDocs(collection(db, "dossiers"));
    const articles = articlesQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Fonction pour mettre à jour un article existant
export const updateArticle = async (articleId, updatedArticle, showToastMessage) => {
  try {
    const articlesCollectionRef = collection(db, "dossiers");
    const q = query(articlesCollectionRef, where("id", "==", articleId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const articleDocRef = querySnapshot.docs[0].ref;
      await updateDoc(articleDocRef, updatedArticle);
      showToastMessage("success", "Article mis à jour avec succès !");
    } else {
      showToastMessage("error", "Aucun article trouvé avec l'ID fourni.");
    }
  } catch (error) {
    showToastMessage("error", "Erreur lors de la mise à jour de l'article: " + error.message);
    throw new Error(error.message);
  }
};

// Fonction pour supprimer un article
export const deleteArticle = async (articleId, showToastMessage) => {
  try {
    const articlesCollectionRef = collection(db, "dossiers");
    const q = query(articlesCollectionRef, where("id", "==", articleId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const articleDocRef = querySnapshot.docs[0].ref;  
      await deleteDoc(articleDocRef);
      showToastMessage("success", "Article supprimé avec succès !");
    } else {
      showToastMessage("error", "Aucun article trouvé avec l'ID fourni.");
    }
  } catch (error) {
    showToastMessage("error", "Erreur lors de la suppression de l'article: " + error.message);
    throw new Error(error.message);
  }
};
