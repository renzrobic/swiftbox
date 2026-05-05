import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase'; // Updated path

export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const postRef = ref(db, `articles/${id}`);
    
    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setArticle({ id, ...data });
        setError(false);
      } else {
        setArticle(null);
        setError(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  return { article, loading, error };
}