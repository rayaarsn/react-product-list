import { ProductList } from './Component/ProductList';
import { ProductCard } from './Component/ProductCard';
import './App.css';
import { Fragment } from 'react/jsx-runtime';

function App() {
  const products = [
    {
      imageSrc: 'images/iphone.png',
      title: 'iPhone 15 Pro',
      specification: [
        'A17 Pro chip with 6-core GPU',
        '3x or 5x Telephoto camera',
        'Up to 29 hours video playback',
      ],
      price: 999,
    },
    {
      imageSrc: 'images/airpods.png',
      title: 'AirPods Pro 2',
      specification: [
        'Noise Cancellation',
        'Dust, sweat, and water resistant',
        'Up to 6 hours of listening',
      ],
      price: 249,
    },
    {
      imageSrc: 'images/apple-watch.png',
      title: 'Apple Watch 9',
      specification: [
        '45mm or 41mm case size',
        'Always-On Retina display',
        'Up to 18 hours normal use',
      ],
      price: 399,
    },
  ];

  function handlePurchase(products) {
    alert(`You Clicked on ${products.title} which cost $${products.price}`);
  }

  return (
    <div className="App">
      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            onPurchase={handlePurchase}
          />
        ))}
      </ProductList>

      <h2>Product which cost up to $500</h2>
      <ul>
        {products
          .filter(({ price }) => price > 500)
          .map(({ title, price }) => (
            <Fragment key={title}>
              <hr style={{ borderColor: 'slategray' }} />
              <p>
                {title} - ${price}
              </p>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}

export default App;
