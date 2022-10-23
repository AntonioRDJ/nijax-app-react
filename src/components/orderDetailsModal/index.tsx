import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useGetOrderQuery } from "../../services/order/order.service";
import { Order } from "../../services/order/types";
import { Service, ServiceBR, Status } from "../../utils/constants";

const mockOrder: Order = {
  id: "asdasd",
  title: "test mock",
  description: "description test mock",
  address: "rua sei la o qonde",
  service: Service.AUTOMOBILES,
  radiusDistance: 50,
  status: Status.NEGOTIATION,
  owner: {
    id: "1111",
    name: "Antonio",
    isCompany: false,
    birthDate: "25/05/2005",
    cellphone: "13988888888",
    cpfCpnj: 444444444444,
    email: "antonio@email.com"
  },
  candidates: [
    {
      id: "11112222",
      name: "Jose",
      isCompany: true,
      birthDate: "25/05/2010",
      cellphone: "13988888999",
      cpfCpnj: 444444444333,
      email: "jose@email.com",
      provider: {
        id: "sadasdas",
        fantasyName: "Empresa ponto com",
        address: "dsasdasd dasd asdsad",
        experiences: [],
        formations: [],
        socialNetworks: [],
      }
    }
  ]
}

type OrderDetailsModalProps = {
  orderId: string;
  open: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = (props: OrderDetailsModalProps) => {
  const { orderId, open, onClose } = props;
  const [order] = useState(mockOrder);
  // const { data: order, isLoading } = useGetOrderQuery(orderId);

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
              value={ServiceBR[order.service]}
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
          <IonItem>
            <IonLabel position="floating">Raio de procura (km)</IonLabel>
            <IonInput
              type="number"
              value={order?.radiusDistance}
              readonly={true}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
