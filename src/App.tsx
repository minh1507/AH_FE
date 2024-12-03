import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Suspense} from "react";
import { ToastProvider } from "./component/toast/toast";
import PortalModule from "./module/portal.module";
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';

function App() {
    React.useEffect(() => {
        ReactGA.initialize("G-ZDZKNNV4W6");
    
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
      }, []);

    return (
        <BrowserRouter>
            <Suspense>
                <ToastProvider>
                    <RecoilRoot>
                        <PortalModule/>
                    </RecoilRoot>
                </ToastProvider>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;