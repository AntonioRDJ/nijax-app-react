import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  updateCellphone,
  updateConfirmPassword,
  updateCpfOrCnpj,
  updateEmail,
  updateIsProfessional,
  updateName,
  updatePassword,
} from "../../store/reducers/Signup/slice";

export const SignUp = () => {
  const signUp = useAppSelector(state => state.signup);
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    console.log("signUp ", signUp);
  };

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
            <IonLabel>Deseja se cadastrar como profissional?</IonLabel>
            <IonToggle
              slot="end"
              checked={signUp.isProfessional}
              onIonChange={(e) => dispatch(updateIsProfessional(e.detail.checked))}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput
              type="text"
              value={signUp.name}
              onIonChange={(e) => dispatch(updateName(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={signUp.email}
              onIonChange={(e) => dispatch(updateEmail(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Celular</IonLabel>
            <IonInput
              type="tel"
              value={signUp.cellphone}
              onIonChange={(e) => dispatch(updateCellphone(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">CPF/CNPJ</IonLabel>
            <IonInput
              type="number"
              value={signUp.cpfOrCnpj}
              onIonChange={(e) => dispatch(updateCpfOrCnpj(parseInt(e.detail.value!)))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput
              type="password"
              value={signUp.password}
              onIonChange={(e) => dispatch(updatePassword(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Confirme a senha</IonLabel>
            <IonInput
              type="password"
              value={signUp.confirmPassword}
              onIonChange={(e) => dispatch(updateConfirmPassword(e.detail.value!))}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons style={{ justifyContent: "center" }}>
            {signUp.isProfessional ? (
              <IonButton
                shape="round"
                routerLink="signup/professional"
                routerDirection="forward"
                routerOptions={{}}
              >
                Avançar
              </IonButton>
            ) : (
              <IonButton shape="round" onClick={handleConfirm}>
                Confirmar
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
