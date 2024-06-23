import React from "react";

import styles from "./styles.module.css";

export function StatsInfoCard({ title, children }) {
	return (
		<div className={styles.wrapper}>
			<div class={styles.titleWrapper}>{title}</div>
			<div class={styles.infoContainer}>{children}</div>
		</div>
	);
}
