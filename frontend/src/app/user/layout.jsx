import UserNavbar from "./UserNavbar";

export default function UserLayout({ children }) {
    return (
        <div>
            <UserNavbar />
            <main className="min-h-screen">
                {children}
            </main>
        </div>
    );
}