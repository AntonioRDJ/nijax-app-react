/*eslint-disable no-restricted-globals*/
import { IonContent, IonInput, IonItem, IonLabel,  IonPage } from "@ionic/react";
import { Logo, SignInButton, SignUpButton, StyledContainer } from "./styles";

export const SignIn = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <StyledContainer>
          <Logo>Logo</Logo>
          <IonItem >
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={"teste@email"}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput type="password" value={"senha123"}></IonInput>
          </IonItem>
          <SignInButton shape="round">Entrar</SignInButton>
          <SignUpButton fill="clear" routerLink="/sign-up" routerDirection="forward" >Cadastre-se</SignUpButton>
        </StyledContainer>
      </IonContent>
    </IonPage>
  );
};