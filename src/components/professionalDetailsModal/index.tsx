import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
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

        {(Array.isArray(provider.experiences) && provider.experiences?.length) && (
          <IonItem>
            <h3>Experiências: </h3>
            {provider.experiences.map(ex => (
              <div>
                <p><strong>Titulo: </strong>{ex.title}</p>
                <p><strong>Descrição: </strong>{ex.description}</p>
              </div>
            ))}
          </IonItem>
        )}

        {(Array.isArray(provider.formations) && provider.formations?.length)  && (
          <IonItem>
            <h3>Formações: </h3>
            {provider.formations.map(fo => (
              <div>
                <p><strong>Curso: </strong>{fo.course}</p>
                <p><strong>Instituição: </strong>{fo.institution}</p>
                <p>
                  <>
                    <strong>Início: </strong>{fo.startDate}
                  </>
                </p>
                <p>
                  <>
                    <strong>Término: </strong>{fo.endDate}
                  </>
                </p>
              </div>
            ))}
          </IonItem>
        )}

        {(Array.isArray(provider.socialNetworks) && provider.socialNetworks?.length) && (
          <IonItem>
            <h3>Redes Sociais: </h3>
            {provider.socialNetworks.map(sn => (
              <div>
                <p><strong>{sn.type}</strong>{sn.url}</p>
              </div>
            ))}
          </IonItem>
        )}

      </IonList>
    </div>
  );
};