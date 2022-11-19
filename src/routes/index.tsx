import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/menu';
import { AppliedOrders } from '../pages/appliedOrders';
import { FindOrders } from '../pages/findOrders';
import { Home } from '../pages/home';
import { MyOrders } from '../pages/myOrders';
import { ProfessionalSignUp } from '../pages/professionalSignUp';
import { Profile } from '../pages/profile';
import { SignIn } from '../pages/signIn';
import { SignUp } from '../pages/signUp';
import { useAppSelector } from '../store';
import { PrivateRoute } from './privateRoute';

export const Routes = () => {
  
  return (
    <IonReactRouter>
      <Route path="/">
        <PrivateRoutes>
          <>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <PrivateRoute path="/app/home" exact={true} component={Home}/>
                <PrivateRoute path="/app/profile" exact={true} component={Profile}/>
                <PrivateRoute path="/app/orders" exact={true} component={MyOrders}/>
                <PrivateRoute path="/app/find-orders" exact={true} component={FindOrders} onlyProvider={true}/>
                <PrivateRoute path="/app/applied-orders" exact={true} component={AppliedOrders} onlyProvider={true}/>
              </IonRouterOutlet>
            </IonSplitPane>
          </>
        </PrivateRoutes>
      </Route>

      <Route path="/*">
        <PublicRoutes restricted={true}>
          <IonRouterOutlet>
            <Route path="/login" exact={true} component={SignIn}/>
            <Route path="/signup" exact={true} component={SignUp}/>
            <Route path="/signup/professional" exact={true} component={ProfessionalSignUp}/>
            <Redirect from="/" to="/login" exact={true} />
          </IonRouterOutlet>
        </PublicRoutes>
      </Route>
    </IonReactRouter>
    
  );
};

const PrivateRoutes = ({ children }: {children: React.ReactElement}) => {
  const loggedIn = useAppSelector(state => state.user.loggedIn);

  if(loggedIn) {
    return (
      children
    );
  }
  
  return (
    <Redirect to="/login" />
  );
};

const PublicRoutes = ({ children, restricted }: {children: React.ReactElement, restricted: boolean}) => {
  const loggedIn = useAppSelector(state => state.user.loggedIn);

  if(loggedIn && restricted) {
    return (
      <Redirect to="/app/home" />
    );
  }
  
  return (
    children
  );
};