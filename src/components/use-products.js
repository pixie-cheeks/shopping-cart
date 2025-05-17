import { useEffect, useState } from 'react';

/**
 * @returns {{
 * products: array | undefined,
 * loading: boolean,
 * error?: string
 * }}
 */
const useProducts = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products'));
    if (localProducts) {
      setProducts(localProducts);
      setLoading(false);
      return;
    }

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('products', JSON.stringify(response));
        setProducts(response);
      })
      .catch((receivedError) => setError(receivedError))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

export { useProducts };
