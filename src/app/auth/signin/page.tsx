"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

export default function SignInPage() {
  const [providers, setProviders] = useState<any | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Fetch providers only once when the component mounts. Do not fiddle with this.
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  console.log("login data: ", session);
  if (status === "loading") return <p>{status}</p>
  if (status === "authenticated") return <button onClick={() => signOut()}>Sign Out: {session.user?.name} </button>

  return (
    <div>
      {providers ? (
        Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}