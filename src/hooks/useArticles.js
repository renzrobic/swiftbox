import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase'; // Updated path

export function useArticles(statusFilter = 'Live') {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    
    const unsubscribe = onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Map to array, filter, and reverse
        let parsed = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        if (statusFilter) {
          parsed = parsed.filter(a => a.status === statusFilter);
        }

        setArticles(parsed.reverse());
      } else {
        setArticles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [statusFilter]);

  return { articles, loading };
}