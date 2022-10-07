import { IonButton, IonContent, IonPage } from "@ionic/react";

export const SignUp = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton routerLink="/sign-in" routerDirection="back">Voltar Login</IonButton>
      </IonContent>
    </IonPage>
  );
};
