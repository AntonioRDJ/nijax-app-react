import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
}

export const OrderModal = (props: OrderModalProps) => {
  const { open, onClose } = props;

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Criar um pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <h1>Abriu Order Modal</h1>
        </IonText>
      </IonContent>
    </IonModal>
  );
};