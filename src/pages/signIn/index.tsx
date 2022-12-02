/*eslint-disable no-restricted-globals*/
import { IonContent, IonImg, IonInput, IonItem, IonLabel,  IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useLoginMutation } from "../../services/auth/auth.service";
import { useAppDispatch } from "../../store";
import { saveUser } from "../../store/reducers/User/slice";
import { SignInButton, SignUpButton, StyledContainer, StyledIonThumbnail } from "./styles";

export const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { presentToast } = useGlobal();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const [loginEndpoint] = useLoginMutation();

  const handleLogin = async () => {
    if(!email || !password) {
      presentToast({message: "Por favor preencha os campos.", color: "warning"});
      return;
    }

    try {
      const { data } = await loginEndpoint({email, password}).unwrap();
      dispatch(saveUser(data));
    } catch (error) {
      presentToast({message: "Falha ao logar, tente novamente."});
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <StyledContainer>
          <StyledIonThumbnail>
            <IonImg src="/assets/images/logo.png" />
          </StyledIonThumbnail>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="text"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
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