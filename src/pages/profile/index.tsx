import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { checkmark, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/loadingComponent";
import { useGlobal } from "../../contexts/GlobalContext";
import { Experience, Formation, Provider, SocialNetwork, User } from "../../services/user/types";
import { useLazyGetByUserIdQuery, useLazyVerifyByCellphoneQuery, useLazyVerifyByCpfCnpjQuery, useLazyVerifyByEmailQuery, useUpdateUserMutation } from "../../services/user/user.service";
import { useLazyGetAddressQuery } from "../../services/viacep/viacep.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUser as updateUserAction } from "../../store/reducers/User/slice";
import { ServiceBR } from "../../utils/constants";
import { validateBirthDate, validateCellphone, validateCep, validateCpfCnpj, validateEmail } from "../../utils/validations";
import { Experiences } from "../professionalSignUp/experiences";
import { Formations } from "../professionalSignUp/formations";
import { SocialNetworks } from "../professionalSignUp/socialNetworks";

type UserErrors = {
  name: boolean;
  email: boolean;
  emailExists: boolean;
  cellphone: boolean;
  cellphoneExists: boolean;
  cpfCnpj: boolean;
  cpfCnpjExists: boolean;
  birthDate: boolean;
};

type ProviderErrors = {

};

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing]  = useState(false);
  const [userEdit, setUserEdit] = useState<User>();
  const [userErrors, setUserErrors] = useState<UserErrors>();

  const userId = useAppSelector(state => state.user?.user?.id!);
  const [getUser] = useLazyGetByUserIdQuery();
  const { presentToast } = useGlobal();
  const [present, dismiss] = useIonLoading();
  const dispatch = useAppDispatch();
  const [verifyEmail] = useLazyVerifyByEmailQuery();
  const [verifyCellphone] = useLazyVerifyByCellphoneQuery();
  const [verifyCpfCnpj] = useLazyVerifyByCpfCnpjQuery();
  const [updateUser] = useUpdateUserMutation();

  useIonViewWillEnter(async () => {
    try {
      setLoading(true);
      const userData = await getUser(userId).unwrap();
      setUser(userData.data.user);
      setUserEdit(userData.data.user);
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao carregar os dados."})
    } finally {
      setLoading(false);
    }
  });

  useIonViewDidLeave(() => {
    setUser(undefined);
    setUserEdit(undefined);
    setIsEditing(false);
    setLoading(false);
  });

  const handleSaveEdit = async () => {
    if(!await validateUser()) {
      return;
    }

    if(userEdit?.isCompany && !await validateProvider()) {
      return;
    }
    
    try {
      present({
        spinner: "crescent",
      });
      const { data } = await updateUser(userEdit!).unwrap();
      presentToast({message: "Alterações realizadas com sucesso.", color: "success"});
      dispatch(updateUserAction(data.user));
      setIsEditing(false);
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    } finally {
      dismiss();
    }

  }

  const handleChangeUserEdit = (field: keyof User, value: any) => {
    setUserEdit((oldEdit) => ({
      ...oldEdit as User,
      [field]: value,
    }));
  }

  const validateUser = async () => {
    const nameValid = Boolean(userEdit?.name);
    const emailValid = validateEmail(userEdit?.email);
    const cellphoneValid = validateCellphone(userEdit?.cellphone);
    const birthDateValid = validateBirthDate(userEdit?.birthDate);
    const cpfCnpjValid = validateCpfCnpj(userEdit?.cpfCnpj);
    let emailExistsValid = true;
    let cellphoneExistsValid = true;
    let cpfCnpjExistsValid = true;

    if(emailValid && userEdit?.email != user?.email) {
      try {
        await verifyEmail(userEdit?.email!).unwrap();
        emailExistsValid = false;
      } catch (error) {}
    }

    if(cellphoneValid && userEdit?.cellphone != user?.cellphone) {
      try {
        await verifyCellphone(userEdit?.cellphone!).unwrap();
        cellphoneExistsValid = false;
      } catch (error) {}
    }

    if(cpfCnpjValid && userEdit?.cpfCnpj != user?.cpfCnpj) {
      try {
        await verifyCpfCnpj(userEdit?.cpfCnpj!).unwrap();
        cpfCnpjExistsValid = false;
      } catch (error) {}
    }

    setUserErrors({
      name: !nameValid,
      email: !emailValid,
      emailExists: !emailExistsValid,
      cellphone: !cellphoneValid,
      cellphoneExists: !cellphoneExistsValid,
      birthDate: !birthDateValid,
      cpfCnpj: !cpfCnpjValid,
      cpfCnpjExists: !cpfCnpjExistsValid,
    });
    
    return nameValid && emailValid && cellphoneValid && birthDateValid && cpfCnpjValid && emailExistsValid && cellphoneExistsValid && cpfCnpjExistsValid;
  }

  const validateProvider = () => {
    const streetValid = Boolean(userEdit?.provider?.street);
    const districtValid = Boolean(userEdit?.provider?.district);
    const cepValid = Boolean(userEdit?.provider?.cep);
    const numberValid = Boolean(userEdit?.provider?.number);
    const serviceValid = Boolean(userEdit?.provider?.service);

    const experiencesValid = userEdit?.provider?.experiences &&  userEdit.provider.experiences.length < 1 ? true : (
      userEdit?.provider?.experiences.every(ex  => ex.title && ex.description)
    );
    const formationsValid = userEdit?.provider?.formations && userEdit.provider.formations.length < 1 ? true : (
      userEdit?.provider?.formations.every(ex  => ex.course && ex.startDate && ex.endDate && ex.institution)
    );
    const socialNetworksValid = userEdit?.provider?.socialNetworks && userEdit.provider.socialNetworks.length < 1 ? true : (
      userEdit?.provider?.socialNetworks.every(ex  => ex.type && ex.url)
    );

    return streetValid && districtValid && serviceValid && cepValid && numberValid && experiencesValid && formationsValid && socialNetworksValid;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            {isEditing ? (
              <IonButton onClick={handleSaveEdit}>
                <IonIcon slot="icon-only" icon={checkmark}></IonIcon>
              </IonButton>
            ) : (
              <IonButton onClick={() => setIsEditing(true)}>
                <IonIcon slot="icon-only" icon={pencil}></IonIcon>
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="container">
            <>
              {userEdit && (
                <UserContent
                  user={userEdit}
                  isEditing={isEditing}
                  onChangeUser={handleChangeUserEdit}
                />
              )}
              {userEdit?.provider && (
                <ProviderContent
                  provider={userEdit.provider}
                  isEditing={isEditing}
                  onChangeProvider={handleChangeUserEdit}
                /> 
              )}
            </>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

type UserContentProps = {
  user: User;
  isEditing: boolean;
  onChangeUser: (field: keyof User, value: any) => void;
}

const UserContent = (props: UserContentProps) => {
  const {user, isEditing, onChangeUser} = props;

  return (
    <>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Nome</IonLabel>
          <IonInput
            type="text"
            value={user.name}
            readonly={!isEditing}
            onIonChange={(e) => onChangeUser("name", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">E-mail</IonLabel>
          <IonInput
            type="text"
            value={user.email}
            readonly={!isEditing}
            onIonChange={(e) => onChangeUser("email", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Celular</IonLabel>
          <IonInput
            type="text"
            value={user.cellphone}
            readonly={!isEditing}
            onIonChange={(e) => onChangeUser("cellphone", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Data de nascimento</IonLabel>
          <IonInput
            type="text"
            value={new Date(user.birthDate).toLocaleDateString()}
            readonly={!isEditing}
            onIonChange={(e) => onChangeUser("birthDate", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">CPF/CNPJ</IonLabel>
          <IonInput
            type="text"
            value={user.cpfCnpj}
            readonly={!isEditing}
            onIonChange={(e) => onChangeUser("cpfCnpj", e.detail.value!)}
          ></IonInput>
        </IonItem>
      </IonList>
    </>
  );
}


type ProviderContentProps = {
  provider: Provider;
  isEditing: boolean;
  onChangeProvider: (field: keyof User, value: any) => void;
}

const ProviderContent = (props: ProviderContentProps) => {
  const {provider, isEditing, onChangeProvider} = props;
  const [experiences, setExperiences] = useState<Experience[]>(provider.experiences);
  const [formations, setFormations] = useState<Formation[]>(provider.formations);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>(provider.socialNetworks);

  const { presentToast } = useGlobal();
  const [getAddress] = useLazyGetAddressQuery();

  useEffect(() => {
    if(JSON.stringify(experiences) != JSON.stringify(provider.experiences)) {
      handleChange("experiences", experiences);
    }
  }, [experiences]);

  useEffect(() => {
    if(JSON.stringify(formations) != JSON.stringify(provider.formations)) {
      handleChange("formations", formations);
    }
  }, [formations]);

  useEffect(() => {
    if(JSON.stringify(socialNetworks) != JSON.stringify(provider.socialNetworks)) {
      handleChange("socialNetworks", socialNetworks);
    }
  }, [socialNetworks]);


  const handleChange = (field: keyof Provider, value: any) => {
    const newProvider = {
      ...provider,
      [field]: value,
    }
    onChangeProvider("provider", newProvider);
  }


  const handleBlurCep = async () => {
    if(!validateCep(provider.cep)) {
      return;
    }

    try {
      const data = await getAddress(provider.cep!).unwrap();
      
      if(data.erro) {
        return presentToast({message: "Cep não encontrado.", color: "warning"});
      }

      const newProvider: Provider = {
        ...provider,
        cep: data.cep,
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      }
      onChangeProvider("provider", newProvider);
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados do cep informado.", color: "danger"});
    }
  }
  
  return (
    <>
      <IonList style={{padding: "0 12px 16px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Nome Fantasia</IonLabel>
          <IonInput
            type="text"
            value={provider.fantasyName}
            readonly={!isEditing}
            onIonChange={(e) => handleChange("fantasyName", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">CEP</IonLabel>
          <IonInput
            type="text"
            value={provider.cep}
            readonly={!isEditing}
            onIonChange={(e) => handleChange("cep", e.detail.value!)}
            onIonBlur={handleBlurCep}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Logradouro</IonLabel>
          <IonInput
            type="text"
            value={provider.street}
            readonly={!isEditing}
            onIonChange={(e) => handleChange("street", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número</IonLabel>
          <IonInput
            type="text"
            value={provider.number}
            readonly={!isEditing}
            onIonChange={(e) => handleChange("number", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Bairro</IonLabel>
          <IonInput
            type="text"
            value={provider.district}
            readonly={!isEditing}
            onIonChange={(e) => handleChange("district", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cidade</IonLabel>
          <IonInput
            type="text"
            value={provider.city}
            readonly={true}
            disabled={isEditing}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">UF</IonLabel>
          <IonInput
            type="text"
            value={provider.state}
            readonly={true}
            disabled={isEditing}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Serviço prestado</IonLabel>
          <IonSelect placeholder="Selecione" value={provider.service} onIonChange={(e) => handleChange("service", e.detail.value)} disabled={!isEditing}>
            {Object.entries(ServiceBR).map(([key, value]) => (
              <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <Experiences experiences={experiences} setExperiences={setExperiences} readonly={!isEditing}/>
        <Formations formations={formations} setFormations={setFormations} readonly={!isEditing}/>
        <SocialNetworks socialNetworks={socialNetworks} setSocialNetworks={setSocialNetworks} readonly={!isEditing}/>
      </IonList>
    </>
  );
}
