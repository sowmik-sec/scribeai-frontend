"use client";

import React, { useEffect, useState } from "react";
import type { Persistor } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [persistor, setPersistor] = useState<Persistor | null>(null);

  useEffect(() => {
    const p = persistStore(store);
    setPersistor(p);
  }, []);

  if (!persistor) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
