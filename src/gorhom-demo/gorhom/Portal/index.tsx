import { enableLogging, PortalProvider } from "@gorhom/portal";
import { ShowcaseApp } from "@gorhom/showcase-template";
import React, { useMemo } from "react";
import { version, description } from '../../../../package.json';
import { screens } from './screens';

enableLogging();
const App = () => {
  // variables
  const author = useMemo(
    () => ({
      username: 'Mo Gorhom',
      url: 'https://gorhom.dev',
    }),
    []
  );
  return (
    <PortalProvider>
      <ShowcaseApp
        name="Portal"
        description={description}
        version={version}
        author={author}
        data={screens}
      />
    </PortalProvider>
  );
};
export default App