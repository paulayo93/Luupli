import {useEffect, useState} from 'react';
import {FeedItem} from '../types/types';

const useFetchContent = (url: string) => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



    useEffect(() => {
    const fetchContent = async () => {
      await fetch(url)
        .then(async res => {
          if (!res.ok) {
            return setError('Could not load feed data');
          }
          const jsonRes = await res.json();
            setFeeds(jsonRes);
        })
        .catch(e => {
          setError(e);
        });
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchContent();
  }, [url]);

  return {feeds, isLoading, error};
};

export default useFetchContent;
