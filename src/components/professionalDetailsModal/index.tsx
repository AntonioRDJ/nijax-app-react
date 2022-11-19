import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { Experiences } from "../../pages/professionalSignUp/experiences";
import { Formations } from "../../pages/professionalSignUp/formations";
import { SocialNetworks } from "../../pages/professionalSignUp/socialNetworks";
import { CandidacyProvider } from "../../services/order/types";

type ProfessionalOrderDetailsModalProps = {
  provider?: CandidacyProvider;
  open: boolean;
  onClose: () => void;
};

export const ProfessionalDetailsModal = (props:  ProfessionalOrderDetailsModalProps) => {
  const { provider, open, onClose } = props

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Detalhes do Profissional</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {provider && <Content provider={provider} />}
      </IonContent>
    </IonModal>
  );
}

type ContentProps = {
  provider: CandidacyProvider,
};

const Content = (props: ContentProps) => {
  const { provider } = props;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      paddingBottom: "42px"
    }}>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Nome</IonLabel>
          <IonInput
            type="text"
            value={provider.fantasyName || provider.user.name}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cidade</IonLabel>
          <IonInput
            type="text"
            value={provider.city}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Bairro</IonLabel>
          <IonInput
            value={provider.district}
            readonly={true}
          ></IonInput>
        </IonItem>

        <Experiences experiences={provider.experiences} setExperiences={() => null} readonly={true} />
        <Formations formations={provider.formations} setFormations={() => null} readonly={true} />
        <SocialNetworks socialNetworks={provider.socialNetworks} setSocialNetworks={() => null} readonly={true} />

      </IonList>
    </div>
  );
};