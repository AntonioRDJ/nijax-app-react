import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { createProvider } from "../../services/user/user.service";
import { CreateProvider, Experience, Formation, SocialNetwork } from "../../services/user/types";
import { useAppSelector } from "../../store";
import { Service, ServiceBR } from "../../utils/constants";
import { Experiences } from "./experiences";
import { Formations } from "./formations";
import { SocialNetworks } from "./socialNetworks";

const requiredFields = ["address", "service"];

export const ProfessionalSignUp = () => {
  const [fantasyName, setFantasyName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [service, setService] = useState<Service>();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  const signup = useAppSelector(state => state.signup);
  const { presentToast } = useGlobal();
  const router = useIonRouter();

  const handleConfirm = async () => {
    const providerToCreate = {fantasyName, address, service, experiences, formations, socialNetworks}; 
    if(requiredFields.some(key => !providerToCreate[key as keyof typeof providerToCreate])) {
      presentToast({message: "Por favor preencha os campos obrigatórios."});
      return;
    }

    const success = await createProvider({...signup, ...providerToCreate} as CreateProvider);

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

