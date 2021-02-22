import React from "react"
import styles from "../styles/ProductList.module.css"
import ProductCard from "./ProductCard"

function ProductList({ products }) {
  const isBrowser = typeof window !== "undefined"

  const Wave = () => {
    return (
      <div>
        <svg
          className={styles.wave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f9090a"
            fillOpacity="1"
            d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,96C840,107,960,85,1080,85.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>

        <svg className={styles.wave1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f9090a"
            fillOpacity="1"
            d="M0,128L40,149.3C80,171,160,213,240,213.3C320,213,400,171,480,133.3C560,96,640,64,720,85.3C800,107,880,181,960,213.3C1040,245,1120,235,1200,213.3C1280,192,1360,160,1400,144L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>

        <svg
          className={styles.wave2}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f9090a"
            fillOpacity="1"
            d="M0,224L40,192C80,160,160,96,240,64C320,32,400,32,480,69.3C560,107,640,181,720,197.3C800,213,880,171,960,138.7C1040,107,1120,85,1200,90.7C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <h2>Our Products</h2>
      <div className={styles.products}>
        <div style={{ position: "relative" }}>
          <h3>Chicken</h3>
          <ProductCard productInfo={products.chicken} />
          <div className={styles.smallScreen}>
          <Wave />
          </div>
          {/* {isBrowser && window.innerWidth < 768 && <Wave />} */}
        </div>
        <div style={{ position: "relative" }}>
          <h3>Mutton</h3>
          <ProductCard
            circleStyle={{
              background: `linear-gradient( to right, rgb(210 10 12) , rgb(76 14 16))`,
            }}
            productInfo={products.mutton}
          />
          <div className={styles.smallScreen}>
          <Wave />
          </div>
          {/* {isBrowser && window.innerWidth < 768 && <Wave />} */}
        </div>
      </div>
      <div className={styles.bigScreen}>
          <Wave />
          </div>
      {/* {isBrowser && window.innerWidth > 768 && <Wave />} */}
    </div>
  )
}

export default ProductList
