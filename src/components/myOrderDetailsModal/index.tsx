import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useGetOrderQuery } from "../../services/order/order.service";
import { Candidacy } from "../../services/order/types";
import { ServiceBR, StatusBR } from "../../utils/constants";
import { LoadingComponent } from "../loadingComponent";

type MyOrderDetailsModalProps = {
  orderId?: string;
  open: boolean;
  onClose: () => void;
};

export const MyOrderDetailsModal = (props: MyOrderDetailsModalProps) => {
  const { orderId, open, onClose } = props;

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Detalhes do Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {orderId && <Content orderId={orderId}/> }
      </IonContent>
    </IonModal>
  );
}

const Content = ({orderId}: {orderId: string}) => {
  const { data: order, isLoading } = useGetOrderQuery(orderId);

  if(isLoading) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Status</IonLabel>
          <IonInput
            type="text"
            value={StatusBR[order!.status]}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            type="text"
            value={order?.title}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descrição</IonLabel>
          <IonTextarea
            value={order?.description}
            readonly={true}
            autoGrow={true}
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tipo de serviço</IonLabel>
          <IonInput
            type="text"
            value={order ? ServiceBR[order.service] : ""}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
              <IonLabel position="floating">CEP</IonLabel>
              <IonInput
                type="text"
                value={order?.cep}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Logradouro</IonLabel>
              <IonInput
                type="text"
                value={order?.street}
                readonly={true}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Bairro</IonLabel>
              <IonInput
                type="text"
                value={order?.district}
                readonly={true}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cidade</IonLabel>
              <IonInput
                type="text"
                value={order?.city}
                readonly={true}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">UF</IonLabel>
              <IonInput
                type="text"
                value={order?.state}
                readonly={true}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número</IonLabel>
              <IonInput
                type="text"
                value={order?.number}
                readonly={true}
              ></IonInput>
            </IonItem>
        {/* <IonItem>
          <IonLabel position="floating">Raio de procura (km)</IonLabel>
          <IonInput
            type="number"
            value={order?.radiusDistance}
            readonly={true}
          ></IonInput>
        </IonItem> */}
      </IonList>

      <CandidateList candidates={order!.candidacy ?? []}/>
    </>
  );
};

type CandidateListProps = {
  candidates: Candidacy[];
}

export const CandidateList = (props: CandidateListProps) => {
  const { candidates } = props;

  return (
    <div style={{padding: "0 12px", marginTop: "24px"}}>
      <h4>Candidados ao pedido</h4>
      <div style={{display: "flex", flexDirection: "column"}}>
        {candidates.map(candidate => (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{candidate.provider.fantasyName || candidate.provider.user?.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}
      </div>
    </div>
  );
}
