import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toggle } from "../components/Toggle/Toggle.tsx";
import rootStyles from "./root.module.scss";

export const Route = createRootRoute({
	component: () => (
		<>
			<nav className={rootStyles.Root}>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>
			<div>
				<Toggle />
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
});
