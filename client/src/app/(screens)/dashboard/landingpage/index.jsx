import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

import styles from "./welcome.module.css";

const Welcome = ({ user }) => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className={styles.welcome}>
      <Head>
        <title>Welcome to PR dashboard</title>
      </Head>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.welcomeTitle}
      >
        <span className="flex items-center gap-2">
          {/* to do: need to check with next/image component  */}
          <img
            src={user.image}
            className="rounded-full"
            alt={user.name}
            width={50}
            height={50}
          />
          Welcome, {user.name}!
        </span>
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.welcomeText}
      >
        <Link
          className={`text-blue-500 link md:underline cursor:pointer`}
          href="/dashboard/reviewerslist"
        >
          Click to visit the dashboard
        </Link>
      </motion.p>
      <div className="flex flex-col items-center  mt-2 gap-2">
        <motion.h2 initial="hidden" animate="visible" variants={variants}>
          About PR dashboard
        </motion.h2>
        <motion.p initial="hidden" animate="visible" variants={variants}>
          PR dashboard is an awesome application that helps you track and manage
          your pull requests.
        </motion.p>
        <motion.p initial="hidden" animate="visible" variants={variants}>
          With PR dashboard, you can easily view statistics and analytics for
          your repositories, making it easier than ever to monitor your
          development progress.
        </motion.p>
      </div>
    </div>
  );
};

export default Welcome;
