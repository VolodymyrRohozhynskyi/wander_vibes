'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/src/react/types';
import { BuiltInProviderType } from 'next-auth/src/providers';

function Navbar(props) {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  })

  return (
    <>
      <Link href='/'>LOGO!</Link>
      {session?.user ? <button type="button"
                               onClick={signOut}>signOut</button> : <>{providers && Object.values(providers).map((provider) => {
        return <button type="button" key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>
      })}</>}
    </>
  );
}

export default Navbar;
