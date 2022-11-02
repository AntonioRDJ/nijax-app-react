import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useGetOrderQuery } from "../../services/order/order.service";
import { ServiceBR } from "../../utils/constants";
import { LoadingComponent } from "../loadingComponent";

type OrderDetailsModalProps = {
  orderId?: string;
  open: boolean;
  onClose: () => void;
};

export const OrderDetailsModal = (props: OrderDetailsModalProps) => {
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
    <IonList style={{padding: "0 12px", overflow: "hidden"}}>
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
        <IonInput
          type="text"
          value={order?.description}
          readonly={true}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Serviço prestado *</IonLabel>
        <IonInput
          type="text"
          value={order ? ServiceBR[order.service.name] : ""}
          readonly={true}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Endereço</IonLabel>
        <IonInput
          type="text"
          value={order?.address}
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
  );
};
