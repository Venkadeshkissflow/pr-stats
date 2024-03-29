import React from "react";

import styles from "./styles.module.css";

export function Loader() {
	return (
		<span
			className={`h-full w-full rounded flex items-center justify-center ${styles.loader}`}
		></span>
	);
}
