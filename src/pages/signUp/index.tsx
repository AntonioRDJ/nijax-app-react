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
  IonNote,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { CreateUserRequest } from "../../services/user/types";
import { useCreateUserMutation, useLazyVerifyByCellphoneQuery, useLazyVerifyByCpfCnpjQuery, useLazyVerifyByEmailQuery } from "../../services/user/user.service";
import { useAppDispatch } from "../../store";
import {
  updateFields,
} from "../../store/reducers/Signup/slice";
import { saveUser } from "../../store/reducers/User/slice";
import { validateBirthDate, validateCellphone, validateCpfCnpj, validateEmail, validatePassword } from "../../utils/validations";

type Errors = {
  name: boolean;
  email: boolean;
  emailExists: boolean;
  cellphone: boolean;
  cellphoneExists: boolean;
  cpfCnpj: boolean;
  cpfCnpjExists: boolean;
  password: boolean;
  passwordEqual: boolean;
  birthDate: boolean;
};

export const SignUp = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [cellphone, setCellphone] = useState<string>();
  const [cpfCnpj, setCpfCnpj] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [birthDate, setBirthDate] = useState<Date | string>();
  const [errors, setErrors] = useState<Errors>();

  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const [createUser] = useCreateUserMutation();
  const [verifyEmail] = useLazyVerifyByEmailQuery();
  const [verifyCellphone] = useLazyVerifyByCellphoneQuery();
  const [verifyCpfCnpj] = useLazyVerifyByCpfCnpjQuery();

  const goToNextPage = () => {
    dispatch(updateFields({
      isCompany,
      name: name!,
      email: email!,
      cellphone: cellphone!,
      birthDate: birthDate!,
      cpfCnpj,
      password: password!,
      confirmPassword: confirmPassword!,
    }));
    router.push("signup/professional", "forward");
  };

  const handleConfirm = async (toNextPage: boolean) => {
    if(!await fieldsIsValid()) {
      return;
    }

    const userToCreate: CreateUserRequest = {
      isCompany,
      name: name!,
      email: email!,
      cellphone: cellphone!,
      birthDate: birthDate!,
      cpfCnpj: cpfCnpj!,
      password: password!,
    };

    if(toNextPage) {
      goToNextPage();
      return;
    }

    try {
      const { data } = await createUser(userToCreate).unwrap();
      presentToast({message: "Cadastro realizado com sucesso.", color: "success"});
      dispatch(saveUser(data));
      router.push("/page/index", "root");
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    }
  };

  const fieldsIsValid = async () => {
    const nameValid = Boolean(name);
    const emailValid = validateEmail(email);
    const cellphoneValid = validateCellphone(cellphone);
    const birthDateValid = validateBirthDate(birthDate);
    const cpfCnpjValid = validateCpfCnpj(cpfCnpj);
    const passwordValid = validatePassword(password);
    const passwordEqualValid = password === confirmPassword;
    let emailExistsValid = true;
    let cellphoneExistsValid = true;
    let cpfCnpjExistsValid = true;

    if(emailValid) {
      try {
        await verifyEmail(email!).unwrap();
        emailExistsValid = false;
      } catch (error) {}
    }

    if(cellphoneValid) {
      try {
        await verifyCellphone(cellphone!).unwrap();
        cellphoneExistsValid = false;
      } catch (error) {}
    }

    if(cpfCnpjValid) {
      try {
        await verifyCpfCnpj(cpfCnpj!).unwrap();
        cpfCnpjExistsValid = false;
      } catch (error) {}
    }

    setErrors({
      name: !nameValid,
      email: !emailValid,
      emailExists: !emailExistsValid,
      cellphone: !cellphoneValid,
      cellphoneExists: !cellphoneExistsValid,
      birthDate: !birthDateValid,
      cpfCnpj: !cpfCnpjValid,
      cpfCnpjExists: !cpfCnpjExistsValid,
      password: !passwordValid,
      passwordEqual: !passwordEqualValid,
    });
    
    return nameValid && emailValid && cellphoneValid && birthDateValid && cpfCnpjValid && passwordValid && passwordEqualValid && emailExistsValid && cellphoneExistsValid && cpfCnpjExistsValid;
  }

  const resetError = (field: keyof Errors) => {
    setErrors(oldErrors => oldErrors ? ({
      ...oldErrors,
      [field]: false,
    }) : undefined);
  } 

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

          <IonItem className={`${errors?.name && 'ion-invalid'}`}>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput
              type="text"
              value={name}
              onIonChange={(e) => {setName(e.detail.value!)}}
              onIonInput={() => resetError("name")}
            ></IonInput>
            <IonNote slot="error">Digite um nome válido</IonNote>
          </IonItem>

          <IonItem className={`${(errors?.email || errors?.emailExists) && 'ion-invalid'}`}>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              onIonInput={() => resetError("email")}
            ></IonInput>
            <IonNote slot="error">
              { errors?.email ? (
                "E-mail inválido"
              ) : (
                "E-mail já cadastrado no sistema"
              )}
            </IonNote>
          </IonItem>

          <IonItem className={`${(errors?.cellphone || errors?.cellphoneExists) && 'ion-invalid'}`}>
            <IonLabel position="floating">Celular</IonLabel>
            <IonInput
              type="tel"
              value={cellphone}
              onIonChange={(e) => setCellphone(e.detail.value!)}
              onIonInput={() => resetError("cellphone")}
            ></IonInput>
            <IonNote slot="error">
              { errors?.cellphone ? (
                "Número de celular inválido"
              ) : (
                "Número de celular já cadastrado no sistema"
              )}
            </IonNote>
          </IonItem>

          <IonItem className={`${errors?.birthDate && 'ion-invalid'}`}>
            <IonLabel>Data de nascimento</IonLabel>
            <IonInput
              type="date"
              value={birthDate?.toString()}
              onIonChange={(e) => setBirthDate(e.detail.value!)}
              onIonInput={() => resetError("birthDate")}
            ></IonInput>
            <IonNote slot="error">Data de nascimento inválida</IonNote>
          </IonItem>

          <IonItem className={`${(errors?.cpfCnpj || errors?.cpfCnpjExists) && 'ion-invalid'}`}>
            <IonLabel position="floating">CPF/CNPJ</IonLabel>
            <IonInput
              type="number"
              value={cpfCnpj}
              onIonChange={(e) => setCpfCnpj(parseInt(e.detail.value!))}
              onIonInput={() => resetError("cpfCnpj")}
            ></IonInput>
            <IonNote slot="error">
              { errors?.cpfCnpj ? (
                "CPF ou CNPJ inválido"
              ) : (
                "CPF ou CNPJ já cadastrado no sistema"
              )}
            </IonNote>
          </IonItem>

          <IonItem className={`${(errors?.password || errors?.passwordEqual) && 'ion-invalid'}`}>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              onIonInput={() => {resetError("password"); resetError("passwordEqual")}}
            ></IonInput>
            <IonNote slot="error">
              {errors?.passwordEqual ? (
                "Senhas não coincidem."
              ): (
                "A senha deve ter no mínimo 8 caracteres"
              )}
            </IonNote>
            <IonNote slot="helper">Mínimo de 8 caracteres</IonNote>
          </IonItem>

          <IonItem className={`${errors?.passwordEqual && 'ion-invalid'}`}>
            <IonLabel position="floating">Confirme a senha</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              onIonInput={() => resetError("passwordEqual")}
            ></IonInput>
            <IonNote slot="error">Senhas não coincidem</IonNote>
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
