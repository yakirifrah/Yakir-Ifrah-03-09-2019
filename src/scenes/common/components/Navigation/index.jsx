import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Slider from "../Slider";
import "./style.scss";
function Navigation() {
	const items = ["Home", "Favorite", "Switch Theme"];
	return (
		<Container fluid className="nav-bar">
			<Navbar collapseOnSelect expand="sm" sticky="top">
				<h5 className="style-text">Herolo Weather Task</h5>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						{items.map((item, index) => {
							return (
								<React.Fragment key={index}>
									{item === "Home" || item === "Favorite" ? (
										<Nav.Item>
											<Link
												title={item === "Home" ? "Home" : "Favorite"}
												className="style-text"
												to={item === "Home" ? "/" : `/${item}`}
											>
												{item}
											</Link>
										</Nav.Item>
									) : (
										<Nav.Item title="switch theme">
											<div className="d-flex">
												<Slider />
											</div>
										</Nav.Item>
									)}
								</React.Fragment>
							);
						})}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
}

export default Navigation;
