import Footer from "./Footer";
import Navbar from "./Navbar";

interface IRootLayout {
    children: React.ReactNode
}

/**
 * @param param0 {React.ReactNode} children
 * @returns The common layout which will be common for all the pages containing Navbar, Body & Footer 
 */

const RootLayout: React.FC<IRootLayout> = ({ children }: IRootLayout) => {
    return <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        {children}
        <Footer />
    </div>
}

export default RootLayout;