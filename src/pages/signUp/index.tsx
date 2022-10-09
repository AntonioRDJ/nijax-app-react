import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from "@ionic/react";

export const SignUp = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Cadastro</IonTitle>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Deseja se cadastrar como profissional?
            </IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Celular</IonLabel>
            <IonInput type="tel"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">CPF/CNPJ</IonLabel>
            <IonInput type="number"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Confirme a senha</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons>
            <IonButton shape="round" routerLink="signup/professional" routerDirection="forward">Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
