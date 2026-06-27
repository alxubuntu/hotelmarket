'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Audience } from '@/components/layout/audience-toggle';

type AudienceContextType = {
  audience: Audience;
  setAudience: (a: Audience) => void;
};

const AudienceContext = createContext<AudienceContextType>({
  audience: 'buyers',
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('buyers');

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
