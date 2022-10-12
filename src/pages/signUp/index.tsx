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
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { CreateUser } from "../../services/user/types";
import { createUser } from "../../services/user/user.service";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  updateFields,
} from "../../store/reducers/Signup/slice";

const requiredFields = ["name", "email", "cellphone", "cpfCnpj", "password", "confirmPassword"];

export const SignUp = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [cellphone, setCellphone] = useState<string>();
  const [cpfCnpj, setCpfCnpj] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const goToNextPage = () => {
    dispatch(updateFields({
      isCompany,
      name: name!,
      email: email!,
      cellphone: cellphone!,
      cpfCnpj,
      password: password!,
      confirmPassword: confirmPassword!,
    }));
    router.push("signup/professional", "forward");
  };

  const handleConfirm = async (toNextPage: boolean) => {
    const userToCreate = {isCompany, name, email, cellphone, cpfCnpj, password, confirmPassword}; 
    if(requiredFields.some(key => !userToCreate[key as keyof typeof userToCreate])) {
      presentToast({message: "Por favor preencha todos os campos."});
      return;
    }

    if(toNextPage) {
      goToNextPage();
      return;
    }

    const success = await createUser(userToCreate as CreateUser);

    if(!success) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
      return;
    }
    presentToast({message: "Cadastro realizado com sucesso.", color: "success"});
    router.push("/login", "root");
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
        <IonList style={{padding: "0 12px", overflow: "hidden"}}>
          <IonItem>
            <IonLabel>Deseja se cadastrar como profissional?</IonLabel>
            <IonToggle
              slot="end"
              checked={isCompany}
              onIonChange={(e) => setIsCompany(e.detail.checked)}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput
              type="text"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Celular</IonLabel>
            <IonInput
              type="tel"
              value={cellphone}
              onIonChange={(e) => setCellphone(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">CPF/CNPJ</IonLabel>
            <IonInput
              type="number"
              value={cpfCnpj}
              onIonChange={(e) => setCpfCnpj(parseInt(e.detail.value!))}
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

          <IonItem>
            <IonLabel position="floating">Confirme a senha</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons style={{ justifyContent: "center" }}>
            <IonButton shape="round" onClick={() => handleConfirm(isCompany)}>
              {isCompany ? "Avançar" : "Confirmar"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
