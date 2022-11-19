import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useCreateProviderMutation, useLazyGetAddressByLocationQuery } from "../../services/user/user.service";
import { CreateProviderRequest, Experience, Formation, SocialNetwork } from "../../services/user/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";
import { Experiences } from "./experiences";
import { Formations } from "./formations";
import { SocialNetworks } from "./socialNetworks";
import { saveUser } from "../../store/reducers/User/slice";
import { Address } from "../../services/viacep/types";
import { validateCep } from "../../utils/validations";
import { useLazyGetAddressQuery } from "../../services/viacep/viacep.service";
import { GeolocationButton } from "../../components/geolocationButton";

export const ProfessionalSignUp = () => {
  const [fantasyName, setFantasyName] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [address, setAddress] = useState<Address>();
  const [service, setService] = useState<Service>();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  const [createProvider] = useCreateProviderMutation();
  const [getAddress] = useLazyGetAddressQuery();
  const [getAddressByLocation] = useLazyGetAddressByLocationQuery();

  const signup = useAppSelector(state => state.signup);
  const dispatch = useAppDispatch();
  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const handleConfirm = async () => {
    const providerToCreate = {fantasyName, ...address, service, number, experiences, formations, socialNetworks}; 
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
    const cepValid = Boolean(cep);
    const numberValid = Boolean(number);

    const experiencesValid = experiences.length < 1 ? true : (
      experiences.every(ex  => ex.title && ex.description)
    );
    const formationsValid = formations.length < 1 ? true : (
      formations.every(ex  => ex.course && ex.startDate && ex.endDate && ex.institution)
    );
    const socialNetworksValid = socialNetworks.length < 1 ? true : (
      socialNetworks.every(ex  => ex.type && ex.url)
    );

    return addressValid && serviceValid && cepValid && numberValid && experiencesValid && formationsValid && socialNetworksValid;
  }

  const handleBlurCep = async (cep?: string) => {
    if(!validateCep(cep)) {
      return;
    }

    try {
      const data = await getAddress(cep!).unwrap();

      if(data.erro) {
        return presentToast({message: "Cep não encontrado.", color: "warning"});
      }

      setAddress({
        cep: data.cep,
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
      
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados do cep informado.", color: "danger"});
    }
  }

  const handleCaptureLocation = async (lat: number, lng: number) => {
    try {
      const {data: {address}} = await getAddressByLocation({lat, lng}).unwrap();
      setCep(address.cep);
      handleBlurCep(address.cep);
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados da localização.", color: "danger"});
    }
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
            <IonLabel>Utilizar localização</IonLabel>
            <GeolocationButton onCapture={handleCaptureLocation}/>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">CEP</IonLabel>
            <IonInput
              type="text"
              value={cep}
              onIonChange={(e) => setCep(e.detail.value!)}
              onIonBlur={() => handleBlurCep(cep)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Logradouro</IonLabel>
            <IonInput
              type="text"
              value={address?.street}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Bairro</IonLabel>
            <IonInput
              type="text"
              value={address?.district}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Cidade</IonLabel>
            <IonInput
              type="text"
              value={address?.city}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">UF</IonLabel>
            <IonInput
              type="text"
              value={address?.state}
              disabled={true}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Número</IonLabel>
            <IonInput
              type="text"
              value={number}
              onIonChange={(e) => setNumber(e.detail.value!)}
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

