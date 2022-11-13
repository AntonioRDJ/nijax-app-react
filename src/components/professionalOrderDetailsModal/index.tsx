import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, useIonLoading } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useGlobal } from "../../contexts/GlobalContext";
import { useApplyInOrderMutation, useGetOrderQuery } from "../../services/order/order.service";
import { useAppSelector } from "../../store";
import { ServiceBR, StatusBR } from "../../utils/constants";
import { LoadingComponent } from "../loadingComponent";

type ProfessionalOrderDetailsModalProps = {
  orderId?: string;
  open: boolean;
  onClose: () => void;
  disableApplyButton?: boolean;
};

export const ProfessionalOrderDetailsModal = (props:  ProfessionalOrderDetailsModalProps) => {
  const { orderId, open, onClose, disableApplyButton } = props;

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
        {orderId && <Content orderId={orderId} disableApplyButton={disableApplyButton}/> }
      </IonContent>
    </IonModal>
  );
}

const Content = ({orderId, disableApplyButton}: {orderId: string, disableApplyButton?: boolean}) => {
  const { data: order, isLoading } = useGetOrderQuery(orderId);
  const user = useAppSelector(state => state.user.user);

  const [present, dismiss] = useIonLoading();
  const { presentToast } = useGlobal();
  const [applyInOrder] = useApplyInOrderMutation();

  if(isLoading) {
    return (
      <LoadingComponent />
    );
  }

  const candandacyInOrder = async () => {
    try {
      present({
        spinner: "crescent",
      });
      await applyInOrder(order!.id).unwrap();
      presentToast({message: "Candidatura feita com sucesso", color: "success"})
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao se candidatar", color: "danger"})
    } finally {
      dismiss();
    }
  }

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
          <IonLabel position="floating">Cliente</IonLabel>
          <IonInput
            type="text"
            value={order ? order.user?.name : ""}
            readonly={true}
          ></IonInput>
        </IonItem>
      </IonList>
      { !disableApplyButton && (
        <IonButton 
          style={{width: "50%", alignSelf: "center"}}
          onClick={candandacyInOrder}
        >
          Canditar-se
        </IonButton>
      )}
    </div>
  );
};
