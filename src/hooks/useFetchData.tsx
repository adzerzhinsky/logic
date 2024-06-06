import { useState, useEffect } from "react";

type Data = {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: string[];
};

const useFetchData = (url: string) => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [url]);

  return {data, isLoading};
};
export default useFetchData;