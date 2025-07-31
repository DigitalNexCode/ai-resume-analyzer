import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => (
    [
        { title: "CVISSION | Auth" },
        { name: "description", content: "Login to your account" },
    ]
)

const auth = () => {
    const { isLoading, error, auth } = usePuterStore();
    const location = useLocation(); 
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-8 bg-white p-10 rounded-2xl">
                <div className="flex flex-col gap-2 items-center text-center">
                    <h1 className="text-4xl font-bold text-center">Welcome</h1>
                    <h2>Please Sign In To Continue Your Job Journey</h2>
                </div>
                <div>
                    {isLoading ? (
                        <button className="auth-button animate-pulse">
                            <p>Signing you in ...</p>
                        </button>
                    ) : (
                        <>
                            {auth.isAuthenticated ? (
                                <button className="auth-button" onClick={() => auth.signOut()}>
                                    <p>Sign Out</p>
                                </button>
                            ) : (
                                <button className="auth-button" onClick={() => auth.signIn()}>
                                    <p>Sign In</p>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    </main>
  )
}

export default auth