import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonModal } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useState } from "react";
import { OrderModal } from "../../components/orderModal";


export const Home = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const createOrder = () => {
    setModalOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Necessita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          <IonCard onClick={createOrder}>
            <IonCardHeader>
              <IonCardTitle>Abrir um chamado</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Clique aqui para criar um novo pedido.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink="orders" routerDirection="forward">
            <IonCardHeader>
              <IonCardTitle>Acesse seus pedidos</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Clique aqui para ir até seus pedidos.
            </IonCardContent>
          </IonCard>
        </div>
        <OrderModal open={modalOpen} onClose={() => setModalOpen(false)}/>
      </IonContent>
    </IonPage>
  );
};
