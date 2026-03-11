import { ProductList } from './Component/ProductList';
import { ProductCard } from './Component/ProductCard';
import { ProductFilter } from './Component/ProductFilter';
import styles from './App.module.css';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';

function App() {
  const products = [
    {
      id: 1,
      imageSrc: 'images/iphone.png',
      title: 'iPhone 15 Pro',
      specification: [
        'A17 Pro chip with 6-core GPU',
        '3x or 5x Telephoto camera',
        'Up to 29 hours video playback',
      ],
      stockCount: 10,
      price: 999,
    },
    {
      id: 2,
      imageSrc: 'images/airpods.png',
      title: 'AirPods Pro 2',
      specification: [
        'Noise Cancellation',
        'Dust, sweat, and water resistant',
        'Up to 6 hours of listening',
      ],
      stockCount: 0,
      price: 249,
    },
    {
      id: 3,
      imageSrc: 'images/apple-watch.png',
      title: 'Apple Watch 9',
      specification: [
        '45mm or 41mm case size',
        'Always-On Retina display',
        'Up to 18 hours normal use',
      ],
      stockCount: 4,
      price: 399,
    },
  ];

  const [favourites, setFavourites] = useState([]);

  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: 'other value',
  });

  function handleFavourite(productsId) {
    if (favourites.includes(productsId)) {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((id) => id !== productsId),
      );
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, productsId]);
    }
  }

  function handleFilter(key, value) {
    setFilters((prevFilters) => ({
      price: {
        ...prevFilters.price,
        [key]: value,
      },
    }));
  }

  function handlePurchase(products) {
    alert(
      `You Clicked on ${products.title} which cost $${products.price - 200}`,
    );
  }

  return (
    <div className={styles.App}>
      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            isFavourite={favourites.includes(product.id)}
            onPurchase={handlePurchase}
            onFavourite={handleFavourite}
          />
        ))}
      </ProductList>

      <h2>Product Filtered by Price </h2>
      <ProductFilter filters={filters} onFilter={handleFilter} />
      {products
        .filter(
          ({ price }) =>
            price >= filters.price.min && price <= filters.price.max,
        )
        .map(({ title, price }) => (
          <Fragment key={title}>
            <hr className={styles.AppListDivider} />
            <p className={styles.ListTitle}>
              {title} - ${price}
            </p>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
