import React from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";

export const Layout: React.FC = ({ children }) => {
	return (
		<>
			<div className='z-30'>
				<NavBar />
			</div>
			<div>{children}</div>
			<Footer />
		</>
	);
};
