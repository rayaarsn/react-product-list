import { useState } from 'react';
import styles from './ProductCard.module.css';

export function ProductCard({
  product,
  isFavourite,
  background = 'slategray',
  onPurchase,
  onFavourite,
}) {
  const [stockCount, setStockCount] = useState(product.stockCount);
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setStockCount((prevstockCount) => prevstockCount - 1);
    onPurchase(product);
  }

  function handleTwoClick() {
    setStockCount((prevstockCount) => prevstockCount - 1);
    setStockCount((prevstockCount) => prevstockCount - 1);
  }

  return (
    <article className={styles.Container} style={{ background }}>
      <button
        className={styles.Favourite}
        onClick={() => onFavourite(product.id)}
      >
        {isFavourite ? '❤️' : '🤍'}
      </button>
      <h2> {product.title} </h2>
      <img
        src={product.imageSrc}
        alt={product.title}
        width={128}
        height={128}
      />
      <p>
        Specification:{' '}
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Hide' : 'Show'}
        </button>{' '}
      </p>
      {showMore && (
        <ul className={styles.Specification}>
          {product.specification.map((spec, index) => (
            <li key={index}> {spec} </li>
          ))}
        </ul>
      )}
      <Status stockCount={stockCount} />
      {stockCount > 0 && (
        <>
          <p>
            {' '}
            (From ${product.price} to ${product.price - 200})
          </p>
          <button onClick={handleClick}>Buy</button>
        </>
      )}
      {stockCount > 1 && <button onClick={handleTwoClick}>Buy 2</button>}
    </article>
  );
}

function Status({ stockCount }) {
  const notAvailableTemplate = (
    <p className={styles.NotAvailableStatus}>Not available</p>
  );

  const availableTemplate = (
    <p className={styles.AvailableStatus}>{stockCount} Items available</p>
  );

  return stockCount === 0 ? notAvailableTemplate : availableTemplate;
}
