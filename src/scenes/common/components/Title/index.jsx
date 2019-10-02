import React from "react";
import "./style.scss";

export default function({ name, title, styleText }) {
	return (
		<h2
			className={
				styleText
					? "text-capitalize font-weight-bold text-title springy-text"
					: "text-capitalize font-weight-bold text-title"
			}
		>
			{name}
			<strong> {title}</strong>
		</h2>
	);
}
