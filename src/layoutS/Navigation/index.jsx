import { NavLink } from "react-router";
import styles from "./Navigation.module.scss";
import clsx from "clsx";

const navItems = [
    {
        to: "/",
        title: "Home",
    },
    {
        to: "/DemoReduxReact",
        title: "Demo React Redux",
    },
];

function Navigation() {
    const renderNavItem = () => {
        return navItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
                <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                        clsx(styles.navLink, { [styles.active]: isActive })
                    }
                    end={item.to === "/"} // Giúp link "Home" chỉ active khi ở đúng trang chủ
                >
                    {item.title}
                </NavLink>
            </li>
        ));
    };
    return (
        <nav className={styles.wrapper}>
            <ul className={styles.navList}>
                {renderNavItem()}
                <li>
                    <a
                        href="./redux.html"
                        className={styles.navLink}
                        target="_blank"
                    >
                        Demo Redux Core
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
