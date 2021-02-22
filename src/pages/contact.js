import React from "react"
import Img, { Geo, Mail, Call } from "../components/contactImages"
import Layout from "../components/layout"
import styles from "../styles/contact.module.css"

const Contact = () => (
  <Layout title="Contact">
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.headInfo}>
          <h2>Contact Us</h2>
          <p>
            Have a custom order? Rather talk to a human? Want to learn more
            about us?
          </p>
          <p>
            We not only provide mouth watering authentic biryani, but are also
            good at meeting your specific requirements!
          </p>
          <p>
            Let us provide you with a dulcet experience for all your senses!
          </p>
        </div>
        <div className={styles.bg}>
        </div>
       
      </div>
      <div className={styles.body}>
        <div>
          <Geo className={styles.icon} />
          <p style={{textAlign:"center"}}>
            Weifield Group Contracting 6950 S.<br/> Jordan Road Centennial, CO 80112
          </p>
        </div>
        <div>
          <Mail className={styles.icon} />
          <p style={{textAlign:"center"}}>Request for Proposal <br/> Info@weifieldgroup.com</p>
        </div>
        <div>
          <Call className={styles.icon} />
          <p style={{textAlign:"center"}}>
            Weifield Group Contracting <br/>303.428.2011 phone 303.202.0466 facsimile
          </p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Contact
