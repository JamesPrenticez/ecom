import { ReactNode } from "react";
import { Path } from "../models/paths";

import { HomePage } from "../pages/home/home.page";
import { BrowsePage } from "../pages/browse/browse.page";

interface NavItemProps {
	id: string;
	title: string;
	path: Path | string;
	page: ReactNode;
}

export const General_Nav_Items: NavItemProps[] = [
	{ id: "0", title: "Home", path: Path.HOME, page: <HomePage /> },
];

export const Other_Nav_Items: NavItemProps[] = [
	{
		id: "1",
		title: "Browse",
		path: Path.BROWSE,
		page: <BrowsePage />,
	},
];
