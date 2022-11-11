import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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
import { PrivateRoute } from './privateRoute';
import { PublicRoute } from './publicRoute';

export const Routes = () => {
  
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <PrivateRoute path="/app/home" exact={true} component={Home}/>
          <PrivateRoute path="/app/profile" exact={true} component={Profile}/>
          <PrivateRoute path="/app/orders" exact={true} component={MyOrders}/>
          <PrivateRoute path="/app/find-orders" exact={true} component={FindOrders} onlyProvider={true}/>
          <PrivateRoute path="/app/applied-orders" exact={true} component={AppliedOrders} onlyProvider={true}/>
          <PublicRoute path="/login" exact={true} component={SignIn} restricted={true}/>
          <PublicRoute path="/signup" exact={true} component={SignUp} restricted={true}/>
          <PublicRoute path="/signup/professional" exact={true} component={ProfessionalSignUp} restricted={true}/>
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
    
  );
};