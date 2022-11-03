import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCreateProviderMutation } from "../../services/user/user.service";
import { CreateProviderRequest, Experience, Formation, SocialNetwork } from "../../services/user/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";
import { Experiences } from "./experiences";
import { Formations } from "./formations";
import { SocialNetworks } from "./socialNetworks";
import { saveUser } from "../../store/reducers/User/slice";

export const ProfessionalSignUp = () => {
  const [fantasyName, setFantasyName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [service, setService] = useState<Service>();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  const [createProvider] = useCreateProviderMutation();

  const signup = useAppSelector(state => state.signup);
  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const handleConfirm = async () => {
    const providerToCreate = {fantasyName, address, service, experiences, formations, socialNetworks}; 
    if(!fieldsIsValid()) {
      presentToast({message: "Por favor preencha os campos obrigatórios."});
      return;
    }

    const {confirmPassword, ...user} = signup;

    try {
      const { data } = await createProvider({...user, ...providerToCreate} as CreateProviderRequest).unwrap();
      presentToast({message: "Cadastro realizado com sucesso.", color: "success"});
      dispatch(saveUser(data));
      router.push("/page/index", "root");
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    }
  };

  const fieldsIsValid = () => {
    const addressValid = Boolean(address);
    const serviceValid = Boolean(service);
    const experiencesValid = experiences.length < 1 ? true : (
      experiences.every(ex  => ex.title && ex.description)
    );
    const formationsValid = formations.length < 1 ? true : (
      formations.every(ex  => ex.course && ex.startDate && ex.endDate && ex.institution)
    );
    const socialNetworksValid = socialNetworks.length < 1 ? true : (
      socialNetworks.every(ex  => ex.type && ex.url)
    );

    return addressValid && serviceValid && experiencesValid && formationsValid && socialNetworksValid;
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/signup" />
          </IonButtons>
          <IonTitle>Cadastro Profissional</IonTitle>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
        <IonList style={{padding: "0 12px", overflow: "hidden"}}>
          <IonItem>
            <IonLabel position="floating">Nome Fantasia</IonLabel>
            <IonInput
              type="text"
              value={fantasyName}
              onIonChange={(e) => setFantasyName(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Endereço *</IonLabel>
            <IonInput
              type="text"
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Serviço prestado *</IonLabel>
            <IonSelect placeholder="Selecione" value={service} onIonChange={(e) => setService(e.detail.value)}>
              {Object.entries(ServiceBR).map(([key, value]) => (
                <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <Experiences experiences={experiences} setExperiences={setExperiences} />
          <Formations formations={formations} setFormations={setFormations} />
          <SocialNetworks socialNetworks={socialNetworks} setSocialNetworks={setSocialNetworks}/>
        
        </IonList>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons style={{justifyContent: "center"}}>
            <IonButton shape="round" onClick={handleConfirm}>Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

