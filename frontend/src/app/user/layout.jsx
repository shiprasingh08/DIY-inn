import AppSidebar from "./UserNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserLayout({ children }) {
    return (
        <div>
            <main className="min-h-screen">
                <SidebarProvider>  
                    <AppSidebar />
                {children}
                </SidebarProvider>
            </main>
        </div>
    );
}