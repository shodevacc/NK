import React from "react"
import styles from "../styles/intro.module.css"
import Cauldron from "./Cauldron"
import Cauldron1 from "./Cauldron1"
import Washing from "./Washing"
import SVGmorph from "./SVGmorph"

function Intro() {
  return (
    <div className={styles.container}>
      <div className={styles.bg}>
        {/* <Cauldron /> */}
        <Cauldron1 />
      </div>

      <div className={styles.info}>
        <h3>Where Tradition meets Sophistication</h3>
        <p>
          We pride ourselves in providing you with the most authentic
          traditional flavour, for which biryani is know around the world, while
          also maintaining modern standards of sanitisation and consistency.
        </p>
        <p>
          Originating with the mughals, this deluctable dish of rice, flavoured
          with fragnant indian spices, and meat is well know around the world as
          Biryani. This celebration of flavour is something that has inspired
          our specialised menu of authentic Dum Biryani.
        </p>
        <p>
          Mouth watering flavour and aroma requires First-Class ingredients.
          This is where we use our 30 years of experience in the field to our
          advantage by carefully selecting each ingredient that goes into our
          biryani. From the best rice, to absorb the strong flavours of our
          aromatic spices, to careful selection of the best cuts of meat to
          complement our traditional dish, you can be sure that we spare no
          expense to deliver an exquisite experience befitting a King.
        </p>
        <p>
          So join us, to indulge your senses, in our specialised royal biryani.
          Add a dash of flamboyance and savour the mughal delicacy.
        </p>
        <p>Welcome to the good times.</p>
      </div>
      {/* <Cauldron /> */}
      {/* <Washing/> */}
    </div>
  )
}

export default Intro
