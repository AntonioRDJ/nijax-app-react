/*eslint-disable no-restricted-globals*/
import { IonContent, IonInput, IonItem, IonLabel,  IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { authenticate } from "../../services/auth/auth.service";
import { Logo, SignInButton, SignUpButton, StyledContainer } from "./styles";

export const SignIn = () => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const handleLogin = async () => {
    if(!login || !password) {
      presentToast({message: "Por favor preencha os campos.", color: "warning"});
      return;
    }

    const success = await authenticate(login, password);
    if(!success) { 
      presentToast({message: "Falha ao logar, tente novamente."});
      return;
    }

    router.push("/page/Index");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <StyledContainer>
          <Logo>Logo</Logo>
          <IonItem >
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="text"
              value={login}
              onIonChange={(e) => setLogin(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <SignInButton shape="round" onClick={handleLogin}>Entrar</SignInButton>
          <SignUpButton fill="clear" routerLink="/signup" routerDirection="forward" >Cadastre-se</SignUpButton>
        </StyledContainer>
      </IonContent>
    </IonPage>
  );
};