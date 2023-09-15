import { ReactNode } from "react";

type ShowNavBarProps = {
    children: ReactNode;
};

const ShowNavbar = ({ children }: ShowNavBarProps) => {
    return <>{children}</>;
};

export default ShowNavbar;
