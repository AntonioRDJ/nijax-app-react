import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/menu';
import Page from '../pages/Page';
import { ProfessionalSignUp } from '../pages/professionalSignUp';
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
          <PrivateRoute path="/page/:name" exact={true} component={Page}/>
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>
          <PublicRoute path="/login" exact={true} component={SignIn} restricted={true}/>
          <PublicRoute path="/signup" exact={true} component={SignUp} restricted={true}/>
          <PublicRoute path="/signup/professional" exact={true} component={ProfessionalSignUp} restricted={true}/>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
    
  );
};