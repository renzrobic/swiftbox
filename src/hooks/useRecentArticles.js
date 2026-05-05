import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { db } from '../config/firebase'; // Ensure this path matches your firebase setup

export function useRecentArticles(limit = 3) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const recentQuery = query(
      articlesRef,
      orderByChild('status'),
      equalTo('Live'),
      limitToLast(limit)
    );

    const unsubscribe = onValue(
      recentQuery,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map to array and reverse to get newest first
          const formatted = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .reverse();
          setArticles(formatted);
        } else {
          setArticles([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firebase sync error:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [limit]);

  return { articles, loading, error };
}